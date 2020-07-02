type GitPlatform = 'codecommit' | 'github' | 'other'
type SupportedModule = 'auth' | 'entity' | 'components'
type LogAction = (message: string, level?: 'info' | 'error') => void
type CopyModuleTemplateAction = (moduleName: string, destinationName?: string) => void

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
  log: LogAction
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

interface EntityName {
  singular: string
  plural: string
}

interface EntityNameWithLower extends EntityName {
  lower: EntityName
}

interface EntityParams {
  name: EntityNameWithLower
  attributes: string[]
}


interface AddAuthCommandActions {
  injectAuthCode: () => void
  copyModuleTemplate: CopyModuleTemplateAction
}

interface AddComponentsCommandActions {
  copyModuleTemplate: CopyModuleTemplateAction
}

interface AddEntityCommandActions {
  amplifyPush: () => void
  checkAmplifyApiExists: () => boolean
  inquireEntityParams: () => Promise<EntityParams>
  transformEntityTemplate(params: EntityParams)
  addEntityToGraphQLSchema(params: EntityParams)
  copyModuleTemplate: CopyModuleTemplateAction
}

interface AddSubcommands {
  addEntity: () => Promise<void>
  addAuth: () => void
  addComponents: () => void
}
