import { log } from '../../actions/logger'
import { add as addCommand } from '../add/builder'
import { create as buildCreateCommand } from './command'
import { gitPush, gitCommitAll, gitConfig } from '../../actions/git'
import { configureApp, createReactApp, deployInfrastructure } from './actions'
import { initAmplify, amplifyAddAuth, amplifyPush } from '../../actions/amplify'
import { configureAwsSdkEnv, retrieveAmplifyAppId, retrieveRepositoryUrl } from '../../actions/aws'
import { inquireAwsProfile, inquireProjectName, inquireRepositoryInfo } from '../../actions/inquire'

export const create = buildCreateCommand({
  log,
  gitPush,
  gitConfig,
  addCommand,
  initAmplify,
  amplifyPush,
  gitCommitAll,
  configureApp,
  createReactApp,
  amplifyAddAuth,
  inquireAwsProfile,
  inquireProjectName,
  configureAwsSdkEnv,
  deployInfrastructure,
  retrieveAmplifyAppId,
  retrieveRepositoryUrl,
  inquireRepositoryInfo,
})
