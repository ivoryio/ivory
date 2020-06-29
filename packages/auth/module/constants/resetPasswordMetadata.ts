import { DynamicButtonProps } from 'app/components'

interface ResetPasswordLayoutLabelsProps {
    code: string
    newPassword: string
}

interface ResetPasswordActionsLabelsProps {
    submit: string
}

export const resetPasswordLayout = (labels: ResetPasswordLayoutLabelsProps) => [
  {
    rowId: 'verification-code',
    fields: [
      {
        width: 1,
        id: 'code-input',
        dataTestId: 'reset-password-code-input',
        name: 'code',
        label: labels.code,
        rules: {
          required: true,
        },
      }
    ],
  },
  {
    rowId: 'new-password',
    fields: [
      {
        width: 1,
        id: 'new-password',
        dataTestId: 'reset-password-new-password-input',
        name: 'password',
        type: 'password',
        label: labels.newPassword,
        rules: {
          required: true,
        },
      },
    ],
  },
]

export const resetPasswordActions = (
  actionsLabels: ResetPasswordActionsLabelsProps
): DynamicButtonProps[] => [
  {
    key: 'reset-password-submit-button',
    dataTestId: 'reset-password-btn',
    type: 'submit',
    label: actionsLabels.submit,
    fullWidth: true,
  },
]
