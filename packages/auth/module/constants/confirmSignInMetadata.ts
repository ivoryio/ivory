import { DynamicButtonProps } from 'app/components'

interface ConfirmSignInLayoutLabelsProps {
  confirmationCode: string
}

interface ConfirmSignInActionsLabelsProps {
  confirm: string
}

export const confirmSignInLayout = (labels: ConfirmSignInLayoutLabelsProps) => [
  {
    rowId: 'verification-code',
    fields: [
      {
        width: 1,
        id: 'verification-code',
        dataTestId: 'confirm-sign-in-code-input',
        name: 'code',
        label: labels.confirmationCode,
        rules: {
          required: true,
        },
      },
    ],
  },
]

export const confirmSignInActions = (
  actionsLabels: ConfirmSignInActionsLabelsProps
): DynamicButtonProps[] => [
  {
    key: 'confirm-sign-in-submit-button',
    dataTestId: 'confirm-sign-in-btn',
    type: 'submit',
    label: actionsLabels.confirm,
    fullWidth: true,
  },
]
