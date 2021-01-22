import React, { PropsWithChildren, useMemo, useCallback } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core/styles'

import { Item, RowRendererProps } from '../interfaces'

import ReorderActionCell from '../components/ReorderActionCell'
import DeleteActionCell from '../components/DeleteActionCell'

const uesRowStyles = makeStyles((theme) => ({
  root: {
    '&$selected, &$selected:hover': {
      display: 'table',
      tableLayout: 'auto',
      backgroundColor: theme.palette.action.hover,
    },
  },
  selected: {},
}))

const RowRenderer: <T extends Item>(
  props: PropsWithChildren<RowRendererProps<T>>
) => JSX.Element = ({ tableProps, onDelete, row, children }) => {
  const {
    id,
    isReadOnly,
    isTemporaryReadOnly,
    isReorderDisabled,
    isDeleteDisabled,
  } = tableProps

  const rowClasses = uesRowStyles()

  const draggableId = useMemo(() => {
    return `${id}_${row}`
  }, [id, row])

  const onDeleteActionCellDelete = useCallback(() => {
    onDelete(row)
  }, [onDelete, row])

  if (isReadOnly || isReorderDisabled) {
    return (
      <TableRow classes={rowClasses}>
        {children}
        {!isReadOnly && !isDeleteDisabled && (
          <DeleteActionCell
            onDelete={onDeleteActionCellDelete}
            isDisabled={isTemporaryReadOnly}
          />
        )}
      </TableRow>
    )
  }

  return (
    <Draggable
      draggableId={draggableId}
      index={row}
      isDragDisabled={isReorderDisabled || isTemporaryReadOnly}
    >
      {(provided, snapshot) => (
        <TableRow
          classes={rowClasses}
          selected={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <ReorderActionCell {...provided.dragHandleProps} />
          {children}
          {!isDeleteDisabled && (
            <DeleteActionCell
              onDelete={onDeleteActionCellDelete}
              isDisabled={isTemporaryReadOnly}
            />
          )}
        </TableRow>
      )}
    </Draggable>
  )
}

export default RowRenderer
