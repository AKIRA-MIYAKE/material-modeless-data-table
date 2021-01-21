import React, { useMemo } from 'react'
import { CSSProperties } from '@material-ui/core/styles/withStyles'

import { Item, ValueViewerProps } from '../interfaces'

const ValueViewer: <T extends Item>(
  props: ValueViewerProps<T>
) => JSX.Element = ({ tableProps, cell, value, col }) => {
  const { columns } = tableProps

  const column = useMemo(() => {
    return columns.filter((column) => !column.isHidden)[col]
  }, [columns, col])

  const viewerStyle = useMemo(() => {
    let style: CSSProperties = {
      display: 'inline-block',
    }

    if (cell.valueType === 'boolean') {
      style = {
        ...style,
        width: '24px',
        textAlign: 'center',
      }
    }

    return style
  }, [cell.valueType])

  const formatedValue = useMemo(() => {
    if (!column.formatViewerValue) {
      return value
    }

    return column.formatViewerValue(cell.value)
  }, [cell.value, value, column.formatViewerValue])

  return <span style={viewerStyle}>{formatedValue}</span>
}

export default ValueViewer
