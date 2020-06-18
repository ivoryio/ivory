export const create = ({
  gitPush,
  gitConfig,
  initAmplify,
  amplifyPush,
  gitCommitAll,
  configureApp,
  createReactApp,
  amplifyAddAuth,
  inquireAwsProfile,
  inquireProjectName,
  configureAwsSdkEnv,
  retrieveAmplifyAppId,
  deployInfrastructure,
  inquireRepositoryInfo,
  retrieveRepositoryUrl,
}: CreateCommandActions) => async (projectNameParam: string, params: any): Promise<void> => {
  console.log(projectNameParam, params)
  const projectName = projectNameParam ?? await inquireProjectName()
  const awsProfile = params.awsProfile ?? await inquireAwsProfile()
  const repositoryInfo = params.repo ?? await inquireRepositoryInfo()

  createReactApp(projectName)
  configureApp({ projectName, awsProfile, repositoryInfo })
  deployInfrastructure({ projectName, awsProfile, repositoryInfo })

  configureAwsSdkEnv(awsProfile)
  const amplifyAppId = await retrieveAmplifyAppId(projectName)
  initAmplify({ projectName, awsProfile, amplifyAppId })

  await amplifyAddAuth()
  amplifyPush()

  await gitCommitAll('[Ivory auto-commit] initilized AWS Amplify')
  if (repositoryInfo.platform === 'codecommit') {
    const repoUrl = await retrieveRepositoryUrl(projectName)
    await gitConfig(awsProfile, repoUrl)
    await gitPush()
  }
}
