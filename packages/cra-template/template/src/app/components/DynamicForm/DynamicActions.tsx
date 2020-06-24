import React from 'react'
import { Box } from '@material-ui/core'

import { t, i18nKeys } from 'locales/i18n'

import { DynamicActionsProps } from '.'
import { Button } from '../'

export const DynamicActions = ({ align = 'center', layout = [] }: DynamicActionsProps) => (
  <Box display='flex' justifyContent={align} maxWidth='xs'>
    {layout.map(button => (
      <Button
        key={button.key}
        data-testid={button.dataTestId}
        fullWidth={button.fullWidth || false}
        type={button.type ?? (button.handler ? 'button' : 'submit')}
        variant={button.variant}
        onClick={button.handler}
      >
        {button.label || t(i18nKeys.global.save)}
      </Button>
    ))}
  </Box>
)
