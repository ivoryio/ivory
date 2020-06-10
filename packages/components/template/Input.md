```jsx
import React from 'react'
import { useForm } from 'react-hook-form'

const FormExample = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: { standard: '', outlined: '' },
  })

  return (
    <>
      <Input rules={{ required: true }} name='standard' label='Standard' control={control} variant='standard' />
      <Input
        rules={{ required: true }}
        name='outlined'
        label='Outlined'
        control={control}
      />
    </>
  )
}
;<FormExample />
```
