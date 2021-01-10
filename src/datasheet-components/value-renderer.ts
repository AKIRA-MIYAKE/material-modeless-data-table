import { DataSheetValueRenderer } from '../interfaces'

const valueRenderer: DataSheetValueRenderer = ({ value, valueType }) => {
  switch (valueType) {
    case 'string':
      return value as string | null
    case 'number':
      return value as number | null
    case 'boolean':
      if (value === null) {
        return '━'
      } else {
        return value ? '✔︎' : null
      }
  }
}

export default valueRenderer
