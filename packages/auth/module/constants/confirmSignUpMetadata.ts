import { DynamicButtonProps } from 'app/components'

interface ConfirmSignUpLayoutLabelsProps {
  confirmationCode: string
}

interface ConfirmSignUpActionsLabelsProps {
  confirm: string
}

export const confirmSignUpLayout = (labels: ConfirmSignUpLayoutLabelsProps) => [
  {
    rowId: 'verification-code',
    fields: [
      {
        width: 1,
        id: 'verification-code',
        dataTestId: 'confirm-sign-up-code-input',
        name: 'code',
        label: labels.confirmationCode,
        rules: {
          required: true,
        },
      },
    ],
  },
]

export const confirmSignUpActions = (
  actionsLabels: ConfirmSignUpActionsLabelsProps
): DynamicButtonProps[] => [
  {
    key: 'confirm-sign-up-submit-button',
    dataTestId: 'confirm-sign-up-btn',
    type: 'submit',
    label: actionsLabels.confirm,
    fullWidth: true,
  },
]
