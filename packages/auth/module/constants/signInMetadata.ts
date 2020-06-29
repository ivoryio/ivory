import { DynamicButtonProps } from 'app/components'

interface SignInLayoutLabelsProps {
  email: string
  password: string
}

interface SignInActionsLabelsProps {
  signIn: string
}

export const signInLayout = (labels: SignInLayoutLabelsProps) => [
  {
    rowId: 'username',
    fields: [
      {
        width: 1,
        id: 'username',
        dataTestId: 'sign-in-username-input',
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
        dataTestId: 'sign-in-password-input',
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

export const signInActions = (actionsLabels: SignInActionsLabelsProps): DynamicButtonProps[] => [
  {
    key: 'sign-in-submit-button',
    dataTestId: 'sign-in-btn',
    type: 'submit',
    label: actionsLabels.signIn,
    fullWidth: true,
  },
]
