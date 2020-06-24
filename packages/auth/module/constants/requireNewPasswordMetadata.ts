import { DynamicButtonProps } from 'app/components'

interface RequireNewPasswordLayoutLabelsProps {
    newPassword: string
}

interface RequireNewPasswordActionsLabelsProps {
    change: string
}

export const requireNewPasswordLayout = (labels: RequireNewPasswordLayoutLabelsProps) => [
  {
    rowId: 'new-password',
    fields: [
      {
        width: 1,
        id: 'new-password',
        dataTestId: 'require-password-input',
        name: 'password',
        label: labels.newPassword,
        rules: {
          required: true,
        },
      },
    ],
  },
]

export const requireNewPasswordActions = (
  actionsLabels: RequireNewPasswordActionsLabelsProps
): DynamicButtonProps[] => [
  {
    key: 'require-new-password-submit-button',
    dataTestId: 'require-new-password-btn',
    type: 'submit',
    label: actionsLabels.change,
    fullWidth: true,
  },
]
