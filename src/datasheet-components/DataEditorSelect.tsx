import React, {
  MouseEventHandler,
  KeyboardEventHandler,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'

import { Item, ItemValue, ItemValueType, DataEditorProps } from '../interfaces'

const useRootStyles = makeStyles(() => ({
  root: {
    marginTop: '-4px',
    marginBottom: '-8px',
  },
}))

const useSelectStyles = makeStyles(() => ({
  root: {
    fontSize: '0.875rem',
    marginTop: '-2px',
    marginBottom: '-1px',
  },
}))

const parseTargetValue: (
  value: string,
  valueType: ItemValueType
) => ItemValue = (value, valueType) => {
  switch (valueType) {
    case 'string':
      return value !== '__EMPTY__' ? value : null
    case 'number':
      return value !== '__EMPTY__' ? Number(value) : null
    default:
      return null
  }
}

const DataEditorSelect: <T extends Item>(
  props: DataEditorProps<T>
) => JSX.Element = ({ tableProps, cell, row, col, onCommit, onRevert }) => {
  const { columns, onBeginEditing, onEndEditing } = tableProps

  const rootClasses = useRootStyles()
  const selectClasses = useSelectStyles()

  const [isOpen, setIsOpen] = useState(false)

  const column = useMemo(() => {
    return columns.filter((column) => !column.isHidden)[col]
  }, [columns, col])

  const onMenuItemMouseDown = useCallback<MouseEventHandler<HTMLLIElement>>(
    (event) => {
      event.stopPropagation()

      const targetValue = (event.target as HTMLLIElement).dataset.value

      if (typeof targetValue === 'undefined') {
        return
      }

      const parsedValue = parseTargetValue(targetValue, cell.valueType)

      let value
      if (!column.isRequired) {
        if (cell.value !== parsedValue) {
          value = parsedValue
        } else {
          value = null
        }
      } else {
        value = parsedValue
      }

      onCommit(value)
      setIsOpen(false)
    },
    [cell.value, cell.valueType, onCommit, column.isRequired]
  )

  const onMenuItemKeyDown = useCallback<KeyboardEventHandler<HTMLLIElement>>(
    (event) => {
      switch (event.key) {
        case 'Enter':
          {
            event.stopPropagation()

            const targetValue = (event.target as HTMLLIElement).dataset.value

            if (typeof targetValue === 'undefined') {
              return
            }

            const parsedValue = parseTargetValue(targetValue, cell.valueType)

            let value
            if (!column.isRequired) {
              if (cell.value !== parsedValue) {
                value = parsedValue
              } else {
                value = null
              }
            } else {
              value = parsedValue
            }

            onCommit(value)
            setIsOpen(false)
          }
          break
        case 'Escape':
          event.stopPropagation()
          onRevert()
          setIsOpen(false)
          break
      }
    },
    [cell.value, cell.valueType, onCommit, onRevert, column.isRequired]
  )

  useEffect(() => {
    setIsOpen(true)
  }, [])

  useEffect(() => {
    onBeginEditing && onBeginEditing({ index: row })

    return () => {
      onEndEditing && onEndEditing({ index: row })
    }
  }, [row, onBeginEditing, onEndEditing])

  if (!column.enum) {
    throw new Error('Never')
  }

  return (
    <div className={rootClasses.root}>
      <Select
        classes={selectClasses}
        value={cell.value !== null ? cell.value : '__EMPTY__'}
        open={isOpen}
      >
        {!column.isRequired && (
          <MenuItem
            value='__EMPTY__'
            onMouseDown={onMenuItemMouseDown}
            onKeyDown={onMenuItemKeyDown}
          >
            &nbsp;
          </MenuItem>
        )}
        {column.enum.map((e) => (
          <MenuItem
            value={e}
            key={e}
            onMouseDown={onMenuItemMouseDown}
            onKeyDown={onMenuItemKeyDown}
          >
            {e}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default DataEditorSelect
