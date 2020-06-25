import { green, blue } from "chalk"

export const create = ({
  gitPush,
  gitConfig,
  initAmplify,
  amplifyPush,
  gitCommitAll,
  configureApp,
  createReactApp,
  amplifyAddAuth,
  addCommand: add,
  inquireAwsProfile,
  inquireProjectName,
  configureAwsSdkEnv,
  retrieveAmplifyAppId,
  deployInfrastructure,
  inquireRepositoryInfo,
  retrieveRepositoryUrl,
}: CreateCommandActions) => async (
  params: Record<string, string>,
  args: string[]
): Promise<void> => {
  const projectName = args?.length ? args[0] : await inquireProjectName()
  const awsProfile = params.awsProfile ?? (await inquireAwsProfile())
  const repositoryInfo = await inquireRepositoryInfo(params.repo)

  createReactApp(projectName)
  configureApp({ projectName, awsProfile, repositoryInfo })
  deployInfrastructure({ projectName, awsProfile, repositoryInfo })
  console.info('Adding ivory components');
  add('components')

  configureAwsSdkEnv(awsProfile)
  const amplifyAppId = await retrieveAmplifyAppId(projectName)
  initAmplify({ projectName, awsProfile, amplifyAppId })

  if (!params.feOnly) {
    await amplifyAddAuth()
    add('auth')
    amplifyPush()
  }

  await gitCommitAll('[Ivory auto-commit] initilized AWS Amplify')
  if (repositoryInfo.platform === 'codecommit') {
    const repoUrl = await retrieveRepositoryUrl(projectName)
    await gitConfig(awsProfile, repoUrl)
    await gitPush()
  }

  console.info();
  console.info(green(`We're done, now it's up to you,`));
  console.info('we suggest that you begin by typing:');
  console.info();
  console.info(blue(`  cd`), projectName);
  console.info(blue(`  yarn start`));
}
