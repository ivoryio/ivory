import React from 'react'
import { Input } from 'app/components'

import { DynamicFieldProps } from '.'

export const DynamicField = ({
  control,
  label,
  name,
  type = 'text',
  rules,
  ...props
}: DynamicFieldProps) => {
  switch (type) {
    default:
      return (
        <Input control={control} name={name} label={label} rules={rules} type={type} {...props} />
      )
  }
}
