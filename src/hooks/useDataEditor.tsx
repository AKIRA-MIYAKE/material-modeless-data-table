import React from 'react'

import { Item, DataEditorProps, DataSheetDataEditor } from '../interfaces'

import DataEditor from '../datasheet-components/DataEditor'

const useDataEditor = <T extends Item>(
  params: Pick<DataEditorProps<T>, 'tableProps'>
): DataSheetDataEditor => (props) => {
  return <DataEditor {...params} {...props} />
}

export default useDataEditor
