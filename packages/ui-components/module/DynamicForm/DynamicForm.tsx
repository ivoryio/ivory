import React from 'react'
import styled from 'styled-components'

import { Box, Container } from '@material-ui/core'

import { DynamicActions } from './DynamicActions'
import { DynamicField } from './DynamicField'
import { DynamicStatus } from './DynamicStatus'
import { StyledCellProps, DynamicFormProps } from '.'

const DynamicForm = ({
  control,
  dataTestId,
  name,
  FormHeader,
  FormFooter,
  grid = 1,
  gutter = 0,
  vSpacing,
  errorDisplay,
  layout,
  actions,
  handleSubmit,
  onSubmit,
  status,
}: DynamicFormProps) => (
  <form data-testid={dataTestId} onSubmit={handleSubmit(onSubmit)}>
    <Container maxWidth='xs'>
      {errorDisplay === 'top' ? <DynamicStatus title={status} mb={4} /> : null}
      {FormHeader ? <FormHeader /> : null}
      {layout.map(row => (
        <Box display='flex' mx={-gutter} key={`dyn-${name}-${row.rowId}`}>
          {row.fields.map(field => (
            <StyledCell
              key={`dyn-${name}-${row.rowId}-${field.id}`}
              mx={gutter}
              mb={vSpacing}
              layout={field.width / grid}
            >
              <DynamicField control={control} {...field} />
            </StyledCell>
          ))}
        </Box>
      ))}
      {errorDisplay === 'bottom' ? <DynamicStatus title={status} mb={4} /> : null}
      <DynamicActions layout={actions} />
      {FormFooter ? <FormFooter /> : null}
    </Container>
  </form>
)

const StyledCell = styled(Box)`
  flex: 0 1 ${({ layout }: StyledCellProps) => `${layout * 100}%`};
`

export default DynamicForm
