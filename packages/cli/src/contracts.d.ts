type GitPlatform = 'codecommit' | 'github' | 'other'
type SupportedModule = 'auth' | 'entity' | 'components'

interface RepositoryInfo {
  platform: GitPlatform
  repoOwner?: string
  repoName?: string
  repoSecret?: string
}

interface AppConfiguration {
  awsProfile: string
  projectName: string
  repositoryInfo: RepositoryInfo
}

interface AmplifyInitParams {
  projectName: string
  amplifyAppId: string
  awsProfile: string
}

interface CreateCommandActions {
  amplifyPush: () => void
  gitPush: () => Promise<void>
  amplifyAddAuth: () => Promise<void>
  inquireAwsProfile: () => Promise<string>
  inquireProjectName: () => Promise<string>
  addCommand: (module: SupportedModule) => void
  createReactApp: (projectName: string) => void
  initAmplify: (config: AmplifyInitParams) => void
  configureApp: (config: AppConfiguration) => void
  configureAwsSdkEnv: (awsProfile: string) => void
  gitCommitAll: (commitMessage: string) => Promise
  deployInfrastructure: (config: AppConfiguration) => void
  gitConfig: (profileName: string, repoUrl: string) => Promise
  retrieveAmplifyAppId: (projectName: string) => Promise<string>
  retrieveRepositoryUrl: (projectName: string) => Promise<string>
  inquireRepositoryInfo: (defaultValue: string) => Promise<RepositoryInfo>
}

interface AddEntityCommandActions {
  copyModuleTemplate: (moduleName: string) => void
  injectAuthCode: () => void
}
