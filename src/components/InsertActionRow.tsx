import React, { FC, useCallback } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useCellStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}))

export interface InsertActionRowProps {
  colspan: number
  onInsert: () => void
  isDisabled?: boolean
}

const InsertActionRow: FC<InsertActionRowProps> = ({
  colspan,
  onInsert,
  isDisabled,
}) => {
  const cellClasses = useCellStyles()

  const onButtoNClick = useCallback(() => {
    if (isDisabled) {
      return
    }

    onInsert()
  }, [isDisabled, onInsert])

  return (
    <TableRow>
      <TableCell classes={cellClasses} colSpan={colspan}>
        <Button
          variant='outlined'
          color='primary'
          size='small'
          disabled={isDisabled}
          onClick={onButtoNClick}
        >
          Add
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default InsertActionRow
