import React from 'react'

import { Item, RowRendererProps, DataSheetRowRenderer } from '../interfaces'

import RowRenderer from '../datasheet-components/RowRenderer'

const useRowRenderer = <T extends Item>(
  params: Pick<RowRendererProps<T>, 'tableProps' | 'onDelete'>
): DataSheetRowRenderer => (props) => {
  return <RowRenderer {...params} {...props} />
}

export default useRowRenderer
