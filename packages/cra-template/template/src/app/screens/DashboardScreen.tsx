import React from 'react'

import { signOut } from '@auth'
import { Button } from 'app/components'
import { t, i18nKeys } from 'locales/i18n'

export const DashboardScreen: React.FC = () => {
  return (
    <>
      <div>{t(i18nKeys.dashboard.loggedIn)}</div>
      <Button data-testid='sign-out-btn' onClick={() => signOut()}>{t(i18nKeys.global.signOut)}</Button>
    </>
  )
}
