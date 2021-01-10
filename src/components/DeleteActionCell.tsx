import React, { FC, useCallback } from 'react'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'

const useCellStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
  },
}))

export interface DeleteActionCellProps {
  onDelete: () => void
}

const DeleteActionCell: FC<DeleteActionCellProps> = ({ onDelete }) => {
  const cellClasses = useCellStyles()

  const onButtonClick = useCallback(() => {
    onDelete()
  }, [onDelete])

  return (
    <TableCell classes={cellClasses} padding='checkbox'>
      <IconButton onClick={onButtonClick}>
        <DeleteIcon />
      </IconButton>
    </TableCell>
  )
}

export default DeleteActionCell
