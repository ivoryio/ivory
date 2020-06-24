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
  add('components')
  configureApp({ projectName, awsProfile, repositoryInfo })
  deployInfrastructure({ projectName, awsProfile, repositoryInfo })

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
}
