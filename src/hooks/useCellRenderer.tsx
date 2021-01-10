import React from 'react'

import { Item, CellRendererProps, DataSheetCellRenderer } from '../interfaces'

import CellRenderer from '../datasheet-components/CellRenderer'

const useCellRenderer = <T extends Item>(
  params: Pick<CellRendererProps<T>, 'tableProps'>
): DataSheetCellRenderer => (props) => {
  return <CellRenderer {...params} {...props} />
}

export default useCellRenderer
