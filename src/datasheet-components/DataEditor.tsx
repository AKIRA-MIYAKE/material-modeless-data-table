import React, { useMemo } from 'react'

import { Item, DataEditorProps } from '../interfaces'

import DataEditorTextField from './DataEditorTextField'
import DataEditorSelect from './DataEditorSelect'
import DataEditorCheckbox from './DataEditorCheckbox'

const DataEditor: <T extends Item>(props: DataEditorProps<T>) => JSX.Element = (
  props
) => {
  const { columns } = props.tableProps

  const column = useMemo(() => {
    return columns.filter((column) => !column.isHidden)[props.col]
  }, [columns, props.col])

  if (column.valueType === 'boolean') {
    return <DataEditorCheckbox {...props} />
  } else if (column.enum) {
    return <DataEditorSelect {...props} />
  } else {
    return <DataEditorTextField {...props} />
  }
}

export default DataEditor
