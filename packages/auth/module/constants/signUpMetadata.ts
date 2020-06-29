import { DynamicButtonProps } from 'app/components'

interface SignUpLayoutLabelsProps {
  email: string
  password: string
}

interface SignUpActionsLabelsProps {
  signUp: string
}

export const signUpLayout = (labels: SignUpLayoutLabelsProps) => [
  {
    rowId: 'username',
    fields: [
      {
        width: 1,
        id: 'username',
        dataTestId: 'sign-up-username-input',
        name: 'email',
        type: 'email',
        label: labels.email,
        rules: {
          required: true,
        },
      },
    ],
  },
  {
    rowId: 'password',
    fields: [
      {
        width: 1,
        id: 'password',
        dataTestId: 'sign-up-password-input',
        name: 'password',
        type: 'password',
        label: labels.password,
        rules: {
          required: true,
        },
      },
    ],
  },
]

export const signUpActions = (actionsLabels: SignUpActionsLabelsProps): DynamicButtonProps[] => [
  {
    key: 'sign-in-submit-button',
    type: 'submit',
    label: actionsLabels.signUp,
    fullWidth: true,
  },
]
