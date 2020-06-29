import React from 'react'
import { TextField } from '@material-ui/core'
import { Controller, Control } from 'react-hook-form'
export interface InputProps {
  align?: string
  autoComplete?: string
  autoFocus?: boolean
  dataTestId?: string
  label?: string
  name?: string
  rules?: object
  type?: string
  as?: JSX.Element
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  variant?: 'outlined' | 'standard' | 'filled' | undefined
}

export const Input: React.FC<InputProps> = ({
  autoComplete,
  autoFocus = true,
  control,
  name = 'text',
  dataTestId = `${name}-data-test-input`,
  label = 'Label',
  rules = {},
  type = 'text',
  variant = 'outlined',
}: InputProps) => (
  <Controller
    autoComplete={autoComplete}
    autoFocus={autoFocus}
    data-testid={dataTestId}
    variant={variant}
    margin='normal'
    rules={rules}
    fullWidth
    name={name}
    label={label}
    type={type}
    id={`${name}-input`}
    as={TextField}
    control={control}
  />
)
