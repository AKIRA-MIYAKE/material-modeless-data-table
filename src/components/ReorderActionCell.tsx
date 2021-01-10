import React, { FC } from 'react'
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

  return (
    <TableCell classes={cellClasses} padding='checkbox'>
      <IconButton {...props}>
        <ReorderIcon />
      </IconButton>
    </TableCell>
  )
}

export default ReorderActionCell
