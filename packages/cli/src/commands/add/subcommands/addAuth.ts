export const addAuth = ({ copyModuleTemplate, injectAuthCode }: AddAuthCommandActions) => (): void => {
  copyModuleTemplate('auth')
  injectAuthCode()
}
