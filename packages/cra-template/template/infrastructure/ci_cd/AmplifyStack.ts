import { BuildSpec } from '@aws-cdk/aws-codebuild'
import { Repository } from '@aws-cdk/aws-codecommit'
import { Stack, StackProps, Construct, SecretValue, CfnOutput } from '@aws-cdk/core'
import { Role, ServicePrincipal, PolicyDocument, PolicyStatement, Effect } from '@aws-cdk/aws-iam'
import {
  App as AmplifyApp,
  CustomRule,
  ISourceCodeProvider,
  GitHubSourceCodeProvider,
  CodeCommitSourceCodeProvider,
} from '@aws-cdk/aws-amplify'

type GitPlatform = 'codecommit' | 'github' | 'other'

export interface AmplifyStackProps extends StackProps {
  projectName: string
  tags: {
    [key: string]: string
  }
}

export class AmplifyStack extends Stack {
  constructor(scope: Construct, id: string, props: AmplifyStackProps) {
    super(scope, id, props)

    const { projectName } = props

    const provider = this.makeSourceCodeProvider(projectName)
    const app = this.createAmplifyApp(projectName, provider)

    new CfnOutput(this, `${id}-output`, {
      value: app.appId,
      exportName: `${projectName}-amplify-app-id`,
    })
  }

  private makeSourceCodeProvider(projectName: string) {
    switch (this.gitPlatform) {
      case 'codecommit':
        return new CodeCommitSourceCodeProvider({
          repository: this.createCodeRepository(projectName),
        })
      case 'github':
        return new GitHubSourceCodeProvider({
          owner: 'GITHUB_OWNER',
          repository: 'GITHUB_REPO',
          oauthToken: SecretValue.plainText(process.env.GITHUB_SECRET || ''),
        })
      default:
        return
    }
  }

  private createCodeRepository(projectName: string) {
    const repositoryName = `${projectName}-web-spa-repo`.toLowerCase()

    const props = {
      repositoryName,
      description: `The Web SPA source code for ${projectName}.`,
    }

    const repo = new Repository(this, repositoryName, props)
    new CfnOutput(this, `${this.stackName}-repo-output`, {
      value: repo.repositoryCloneUrlHttp,
      exportName: `${projectName}-repo-url`,
    })

    return repo
  }

  private createAmplifyApp(projectName: string, sourceCodeProvider?: ISourceCodeProvider) {
    const app = new AmplifyApp(this, `${projectName}-spa`, {
      sourceCodeProvider,
      environmentVariables: {
        USER_DISABLE_TESTS: 'false',
        _LIVE_UPDATES: '[{"pkg":"@aws-amplify/cli","type":"npm","version":"latest"}]',
      },
      role: this.createRole(projectName),
      buildSpec: this.createBuildSpec(),
    })
    if (this.gitPlatform !== 'other') {
      app.addBranch('master')
    }
    app.addCustomRule(CustomRule.SINGLE_PAGE_APPLICATION_REDIRECT)

    return app
  }

  private createRole(projectName: string) {
    return new Role(this, `${projectName}-amplify-role`, {
      assumedBy: new ServicePrincipal('amplify.amazonaws.com'),
      description: 'Allows Amplify Backend Deployment to access AWS resources on your behalf.',
      inlinePolicies: {
        amplify: new PolicyDocument({
          statements: [
            new PolicyStatement({
              effect: Effect.ALLOW,
              actions: ['cloudformation:*'],
              resources: [
                `arn:aws:cloudformation:${this.region}:${this.account}:stackset/*:*`,
                `arn:aws:cloudformation:${this.region}:${this.account}:stack/*/*`,
              ],
            }),
            new PolicyStatement({
              effect: Effect.ALLOW,
              actions: ['iam:*'],
              resources: [`arn:aws:iam::${this.account}:role/*`],
            }),
            new PolicyStatement({
              effect: Effect.ALLOW,
              actions: ['cognito-idp:CreateUserPool'],
              resources: ['*'],
            }),
            new PolicyStatement({
              effect: Effect.ALLOW,
              actions: ['cognito-idp:*', 'cognito-identity:*'],
              resources: [
                `arn:aws:cognito-identity:${this.region}:${this.account}:identitypool/*`,
                `arn:aws:cognito-idp:${this.region}:${this.account}:userpool/*`,
              ],
            }),
            new PolicyStatement({
              effect: Effect.ALLOW,
              actions: ['s3:*', 'appsync:*', 'lambda:*', 'dynamodb:*', 'kms:*', 'cloudwatch:*'],
              resources: ['*'],
            }),
          ],
        }),
      },
    })
  }

  private createBuildSpec() {
    return BuildSpec.fromObject({
      note: 'this config is needed by the Amplify console, but it is not used by the build system',
      action:
        'please replace this with the contents of amplify.yml to tell amplify about the tests',
    })
  }

  private readonly gitPlatform: GitPlatform = 'GIT_PROVIDER'
}
