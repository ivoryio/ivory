import { DynamicButtonProps } from 'app/components'

interface RequestPasswordResetLayoutLabelsProps {
  email: string
}

interface RequestPasswordResetActionsLabelsProps {
  sendCode: string
}

export const requestPasswordResetLayout = (labels: RequestPasswordResetLayoutLabelsProps) => [
  {
    rowId: 'email',
    fields: [
      {
        width: 1,
        id: 'reset-email',
        dataTestId: 'request-new-password-email-input',
        name: 'email',
        type: 'email',
        label: labels.email,
        rules: {
          required: true,
        },
      },
    ],
  },
]

export const requestPasswordResetActions = (
  actionsLabels: RequestPasswordResetActionsLabelsProps
): DynamicButtonProps[] => [
  {
    key: 'request-password-reset-submit-button',
    dataTestId: 'request-password-reset-code-btn',
    type: 'submit',
    label: actionsLabels.sendCode,
    fullWidth: true,
  },
]
