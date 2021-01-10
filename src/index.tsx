import React from 'react'

import { ModelessDataTableProps, Item } from './interfaces'

import DataSheet from './datasheet-components/DataSheet'
import valueRenderer from './datasheet-components/value-renderer'

import useData from './hooks/useData'
import useSheetRenderer from './hooks/useSheetRenderer'
import useRowRenderer from './hooks/useRowRenderer'
import useCellRenderer from './hooks/useCellRenderer'
import useValueViewer from './hooks/useValueViewer'
import useDataEditor from './hooks/useDataEditor'

import './index.css'

export * from './interfaces'

const ModelessDataTable = <T extends Item>(
  props: ModelessDataTableProps<T>
): JSX.Element => {
  const { data, onCellsChanged, onDragEnd, onDelete, onInsert } = useData(props)

  const sheetRenderer = useSheetRenderer({
    tableProps: props,
    onDragEnd,
    onInsert,
  })

  const rowRenderer = useRowRenderer({
    tableProps: props,
    onDelete,
  })

  const cellRenderer = useCellRenderer({
    tableProps: props,
  })

  const valueViewer = useValueViewer({
    tableProps: props,
  })

  const dataEditor = useDataEditor({
    tableProps: props,
  })

  return (
    <DataSheet
      data={data}
      valueRenderer={valueRenderer}
      onCellsChanged={onCellsChanged}
      sheetRenderer={sheetRenderer}
      rowRenderer={rowRenderer}
      cellRenderer={cellRenderer}
      valueViewer={valueViewer}
      dataEditor={dataEditor}
    />
  )
}

export default ModelessDataTable
