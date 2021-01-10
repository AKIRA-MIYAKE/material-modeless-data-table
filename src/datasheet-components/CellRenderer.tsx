import React, { PropsWithChildren, useState, useMemo, useEffect } from 'react'
import TableCell from '@material-ui/core/TableCell'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import { CSSProperties } from '@material-ui/core/styles/withStyles'

import { Item, CellRendererProps } from '../interfaces'

const useCellStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    cursor: 'cell',
    '&:hover': {
      backgroundColor: lighten(theme.palette.action.hover, 0.5),
    },
  },
}))

const useRendererStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: theme.palette.action.hover,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  editing: {
    backgroundColor: theme.palette.action.hover,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  readOnly: {
    cursor: 'default',
    color: lighten(theme.palette.text.primary, 0.25),
  },
  error: {
    '&:before': {
      content: '""',
      position: 'absolute',
      display: 'block',
      top: 0,
      right: 0,
      borderTop: `.5rem solid ${theme.palette.error.main}`,
      borderLeft: '.5rem solid transparent',
    },
  },
}))

const CellRenderer: <T extends Item>(
  props: PropsWithChildren<CellRendererProps<T>>
) => JSX.Element = ({
  tableProps,
  cell,
  row,
  col,
  selected,
  editing,
  onMouseDown,
  onMouseOver,
  onContextMenu,
  onDoubleClick,
  children,
}) => {
  const { items, columns } = tableProps

  const cellClasses = useCellStyles()
  const rendererClasses = useRendererStyles()

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const item = useMemo(() => {
    return items[row]
  }, [items, row])

  const column = useMemo(() => {
    return columns[col]
  }, [columns, col])

  const rendererClassName = useMemo(() => {
    const classes = []

    if (editing) {
      classes.push(rendererClasses.editing)
    } else if (selected) {
      classes.push(rendererClasses.selected)
    }

    if (!!errorMessage && !editing) {
      classes.push(rendererClasses.error)
    }

    if (column.isReadOnly) {
      classes.push(rendererClasses.readOnly)
    }

    return classes.join(' ')
  }, [selected, editing, rendererClasses, errorMessage, column.isReadOnly])

  const cellStyle = useMemo(() => {
    const { width, minWidth, maxWidth, textAlign } = column.style || {}

    let style: CSSProperties = {
      width,
      minWidth,
      maxWidth,
      textAlign,
    }

    switch (column.overflow || 'wrap') {
      case 'wrap':
        style = {
          ...style,
          whiteSpace: 'normal',
          overflowWrap: 'anywhere',
        }
        break
      case 'nowrap':
        style = {
          ...style,
          whiteSpace: 'nowrap',
          overflowX: 'visible',
        }
        break
      case 'clip':
        style = {
          ...style,
          whiteSpace: 'nowrap',
          overflowX: 'hidden',
          textOverflow: 'clip',
        }
        break
      case 'ellipsis':
        style = {
          ...style,
          whiteSpace: 'nowrap',
          overflowX: 'hidden',
          textOverflow: 'ellipsis',
        }
        break
    }

    return style
  }, [column.style, column.overflow])

  const padding = useMemo(() => {
    return column.valueType === 'boolean' ? 'checkbox' : 'default'
  }, [column.valueType])

  const CellElement = useMemo(() => {
    return (
      <TableCell
        classes={cellClasses}
        className={rendererClassName}
        style={cellStyle}
        padding={padding}
        onMouseDown={onMouseDown}
        onMouseOver={onMouseOver}
        onContextMenu={onContextMenu}
        onDoubleClick={onDoubleClick}
      >
        {children}
      </TableCell>
    )
  }, [
    onMouseDown,
    onMouseOver,
    onContextMenu,
    onDoubleClick,
    children,
    cellClasses,
    rendererClassName,
    cellStyle,
    padding,
  ])

  useEffect(() => {
    const errorMessage =
      column.validate && column.validate(cell.value, item, items)
    setErrorMessage(errorMessage)
  }, [items, cell.value, item, column])

  if (editing || typeof errorMessage === 'undefined') {
    return CellElement
  }

  return (
    <Tooltip title={errorMessage} placement='top-end'>
      {CellElement}
    </Tooltip>
  )
}

export default CellRenderer
