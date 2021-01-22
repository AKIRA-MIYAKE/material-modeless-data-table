import React, { PropsWithChildren, useMemo, useCallback } from 'react'
import {
  DragDropContextProps,
  DragDropContext,
  Droppable,
} from 'react-beautiful-dnd'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableFooter from '@material-ui/core/TableFooter'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import { Item, SheetRendererProps } from '../interfaces'

import ActionColumnHeaderCell from '../components/ActionColumnHeaderCell'
import InsertActionRow from '../components/InsertActionRow'

const SheetRenderer: <T extends Item>(
  props: PropsWithChildren<SheetRendererProps<T>>
) => JSX.Element = ({ tableProps, onInsert, onDragEnd, children }) => {
  const {
    id,
    columns,
    tableSize,
    isReadOnly,
    isTemporaryReadOnly,
    isTableHeaderHidden,
    isReorderDisabled,
    isDeleteDisabled,
    isInsertDisabled,
  } = tableProps

  const insertActionRowColspan = useMemo(() => {
    const visibleColumns = columns.filter((col) => !col.isHidden)
    let colspan = visibleColumns.length

    if (isReadOnly) {
      return colspan
    }

    if (!isReorderDisabled) {
      colspan++
    }

    if (!isDeleteDisabled) {
      colspan++
    }

    return colspan
  }, [columns, isReadOnly, isReorderDisabled, isDeleteDisabled])

  const onDragStart = useCallback<
    NonNullable<DragDropContextProps['onDragEnd']>
  >(() => {
    const activeElement = document.activeElement
    if (activeElement && activeElement instanceof HTMLElement) {
      activeElement.blur()
    }
  }, [])

  const TableHeaderElement = useMemo(() => {
    if (isTableHeaderHidden) {
      return null
    }

    return (
      <TableHead>
        <TableRow>
          {!isReadOnly && !isReorderDisabled && <ActionColumnHeaderCell />}
          {columns
            .filter((col) => !col.isHidden)
            .map((col, index) => (
              <TableCell style={col.style} key={index}>
                {col.label}
              </TableCell>
            ))}
          {!isReadOnly && !isDeleteDisabled && <ActionColumnHeaderCell />}
        </TableRow>
      </TableHead>
    )
  }, [
    columns,
    isReadOnly,
    isTableHeaderHidden,
    isReorderDisabled,
    isDeleteDisabled,
  ])

  const TableBodyElement = useMemo(() => {
    if (isReadOnly || isReorderDisabled) {
      return <TableBody>{children}</TableBody>
    }

    return (
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Droppable droppableId={id}>
          {(provided) => (
            <TableBody ref={provided.innerRef} {...provided.droppableProps}>
              {children}
              {provided.placeholder}
            </TableBody>
          )}
        </Droppable>
      </DragDropContext>
    )
  }, [id, isReadOnly, isReorderDisabled, onDragEnd, onDragStart, children])

  const TableFooterElement = useMemo(() => {
    if (isReadOnly || isInsertDisabled) {
      return null
    }

    return (
      <TableFooter>
        <InsertActionRow
          isDisabled={isTemporaryReadOnly}
          onInsert={onInsert}
          colspan={insertActionRowColspan}
        />
      </TableFooter>
    )
  }, [isReadOnly, isInsertDisabled, onInsert, insertActionRowColspan])

  return (
    <Table size={tableSize}>
      {TableHeaderElement}
      {TableBodyElement}
      {TableFooterElement}
    </Table>
  )
}

export default SheetRenderer
