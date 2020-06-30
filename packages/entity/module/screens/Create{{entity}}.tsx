import React from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps } from '@reach/router'

import { DynamicForm } from '@ui-components'
import { Create{{entity.singular}}Input } from '../contracts'
import { useCreate{{entity.singular}} } from '../hooks/useCreate{{entity.singular}}'

export const Create{{entity.singular}}: React.FC<RouteComponentProps> = () => {
  const { control, handleSubmit } = useForm<Create{{entity.singular}}Input>()
  const create{{entity.singular}} = useCreate{{entity.singular}}()

  const _create{{entity.singular}} = ({ name, description }: Create{{entity.singular}}Input) => {
    console.log('submit', name, description)
    create{{entity.singular}}({ name, description })
  }
  return (
    <>
      <DynamicForm
        name='create-{{entity.lower.singular}}-form'
        onSubmit={_create{{entity.singular}}}
        control={control}
        handleSubmit={handleSubmit}
        layout={[<% _.forEach(attributes, attr => { %>
          {
            rowId: '<%- attr %>-row',
            fields: [
              {
                id: '<%- attr %>',
                dataTestId: '<%- attr %>-field',
                label: '{{entity.singular}} <%- attr %>',
                name: '<%- attr %>',
                rules: {},
                width: 1,
              },
            ],
          },<% }) %>
        ]}
        actions={[{ key: 'save', fullWidth: true }]}
      />
    </>
  )
}
