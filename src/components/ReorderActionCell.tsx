import React, { FC, useMemo } from 'react'
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import ReorderIcon from '@material-ui/icons/Reorder'
import { makeStyles } from '@material-ui/core/styles'

const useCellStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
  },
}))

export type ReorderActionCellProps = Partial<DraggableProvidedDragHandleProps>

const ReorderActionCell: FC<ReorderActionCellProps> = (props) => {
  const cellClasses = useCellStyles()

  const isDisabled = useMemo(() => {
    return Object.keys(props).length === 0
  }, [props])

  return (
    <TableCell classes={cellClasses} padding='checkbox'>
      <IconButton {...props} disabled={isDisabled}>
        <ReorderIcon />
      </IconButton>
    </TableCell>
  )
}

export default ReorderActionCell
