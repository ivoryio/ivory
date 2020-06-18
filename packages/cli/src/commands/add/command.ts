export const add = ({ copyModuleTemplate }: AddEntityCommandActions) => (input_data: any) => {
  // console.log('Ivory add', input_data)
  copyModuleTemplate('ui-components')
}
