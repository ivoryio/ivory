import { prompt } from 'inquirer'

interface PromptParams {
  singular: string
  plural: string
  attributes: string
}

export const inquireEntityParams = async (): Promise<EntityParams> => {
  const { singular, plural, attributes } = await prompt<PromptParams>([
    {
      type: 'input',
      name: 'singular',
      message: 'Enter the name of the new entity (CamelCase)',
    },
    {
      type: 'input',
      name: 'plural',
      message: 'Plural?',
      default: ({ singular }: PromptParams) => singular + 's'
    },
    {
      type: 'input',
      name: 'attributes',
      message: 'Enter the attributes (comma separated)',
    },
  ])

  const name = { singular, plural }
  return {
    name: {
      ...changeFirstLetterCase(name, 'upper'),
      lower: changeFirstLetterCase(name, 'lower'),
    },
    attributes: attributes.split(',').map(a => a.trim()).filter(a => a.toLowerCase() !== 'id'),
  }
}

function changeFirstLetterCase(
  { singular, plural }: EntityName,
  target: 'lower' | 'upper'
): EntityName {
  let firstLetter = singular.slice(0, 1).toLowerCase()
  if (target === 'upper') {
    firstLetter = firstLetter.toUpperCase()
  }

  return {
    singular: `${firstLetter}${singular.slice(1)}`,
    plural: `${firstLetter}${plural.slice(1)}`,
  }
}
