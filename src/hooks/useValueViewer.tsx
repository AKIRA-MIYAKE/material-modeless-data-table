import React from 'react'

import { Item, ValueViewerProps, DataSheetValueViewer } from '../interfaces'

import ValueViewer from '../datasheet-components/ValueViewer'

const useValueViewer = <T extends Item>(
  params: Pick<ValueViewerProps<T>, 'tableProps'>
): DataSheetValueViewer => (props) => {
  return <ValueViewer {...params} {...props} />
}

export default useValueViewer
