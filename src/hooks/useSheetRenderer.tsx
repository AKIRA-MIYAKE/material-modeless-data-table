import React from 'react'

import { Item, SheetRendererProps, DataSheetSheetRenderer } from '../interfaces'

import SheetRenderer from '../datasheet-components/SheetRenderer'

const useSheetRenderer = <T extends Item>(
  params: Pick<SheetRendererProps<T>, 'tableProps' | 'onDragEnd' | 'onInsert'>
): DataSheetSheetRenderer => (props) => {
  return <SheetRenderer {...params} {...props} />
}

export default useSheetRenderer
