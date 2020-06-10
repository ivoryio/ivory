import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps, Link } from '@reach/router'

import { Button } from 'app/components'
import { useToast } from 'hooks/useToast'
import { t, i18nKeys } from 'locales/i18n'

export const HomeScreen: React.FC<RouteComponentProps> = () => {
  const project = 'Ivory template'

  const { showToast, Toast } = useToast()

  return (
    <Container>
      <strong>{t(i18nKeys.home.hello)}</strong>
      <div>{t(i18nKeys.home.introduction, { replace: { project } })}</div>
      <div>{t(i18nKeys.home.topFeature, { count: 3 })}</div>
      <ul>
        <li>{t(i18nKeys.features.ui)}</li>
        <li>{t(i18nKeys.features.i18n)}</li>
        <li>{t(i18nKeys.features.codeQuality)}</li>
        <li>
          {t(i18nKeys.features.auth)} -{' '}
          <Link to='/auth'>{t(i18nKeys.auth.signIn.actions.signIn)}</Link>
        </li>
      </ul>
      <Button onClick={() => showToast(t(i18nKeys.global.infoToast))}>
        {t(i18nKeys.global.showToast)}
      </Button>
      <Toast />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
