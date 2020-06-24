import { Control } from 'react-hook-form'
import { TypographyStyle } from '@material-ui/core'
import { InputProps } from 'app/components'

export interface DynamicButtonProps {
  handler?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  label?: string
  key: string
  dataTestId?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  variant?: 'text' | 'outlined' | 'contained' | undefined
  fullWidth?: boolean
}

export interface DynamicActionsProps {
  align?: 'left' | 'center' | 'right'
  layout?: DynamicButtonProps[]
}

export interface DynamicFieldProps extends InputProps {
  type?: string
}

export interface StyledCellProps {
  layout: number
}

export interface DynamicFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  actions?: DynamicButtonProps[]
  dataTestId?: string
  onSubmit: Function
  vSpacing?: number
  name: string
  gutter?: number
  grid?: number
  errorDisplay?: string
  status?: string
  FormHeader?: React.FC
  FormFooter?: React.FC
  handleSubmit: Function
  layout: Array<{
    rowId: string
    fields: Array<{
      width: number
      dataTestId: string
      id: string
      name: string
      type?: string
      label: string
      rules: Record<string, boolean>
    }>
  }>
}

export interface DynamicStatusProps extends TypographyStyle {
  title: string | undefined
}
