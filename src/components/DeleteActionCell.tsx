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
  isDisabled?: boolean
}

const DeleteActionCell: FC<DeleteActionCellProps> = ({
  onDelete,
  isDisabled,
}) => {
  const cellClasses = useCellStyles()

  const onButtonClick = useCallback(() => {
    if (isDisabled) {
      return
    }

    onDelete()
  }, [isDisabled, onDelete])

  return (
    <TableCell classes={cellClasses} padding='checkbox'>
      <IconButton disabled={isDisabled} onClick={onButtonClick}>
        <DeleteIcon />
      </IconButton>
    </TableCell>
  )
}

export default DeleteActionCell
