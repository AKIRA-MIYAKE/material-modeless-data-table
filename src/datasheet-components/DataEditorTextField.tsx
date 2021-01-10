import React, {
  ChangeEventHandler,
  FocusEventHandler,
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

import { Item, ItemValue, ItemValueType, DataEditorProps } from '../interfaces'

const useTextFieldStyles = makeStyles(() => ({
  root: {
    width: '100%',
    marginTop: '-4px',
    marginBottom: '-8px',
  },
}))

const useInputPropsStyles = makeStyles((theme) => ({
  root: {
    fontSize: theme.typography.fontSize,
  },
}))

const parseInputValue: (
  value: string,
  valueType: ItemValueType
) => ItemValue = (value, valueType) => {
  switch (valueType) {
    case 'string':
      return value.length > 0 ? value : null
    case 'number':
      return value.length > 0 ? Number(value) : null
    default:
      return null
  }
}

const DataEditorTextField: <T extends Item>(
  props: DataEditorProps<T>
) => JSX.Element = ({
  tableProps,
  cell,
  row,
  col,
  onChange,
  onRevert,
  onKeyDown,
}) => {
  const { items, columns } = tableProps

  const textFieldClasses = useTextFieldStyles()
  const inputPropsClasses = useInputPropsStyles()

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const item = useMemo(() => {
    return items[row]
  }, [items, row])

  const column = useMemo(() => {
    return columns[col]
  }, [columns, col])

  const defaultValue = useMemo(() => cell.value, [cell.value])

  const inputType = useMemo(() => {
    return cell.valueType === 'number' ? 'number' : column.inputType
  }, [cell.valueType, column.inputType])

  const inputPropsRef = useRef<HTMLInputElement>()

  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const value = parseInputValue(event.target.value, cell.valueType)

      const errorMessage =
        column.validate && column.validate(value, item, items)
      setErrorMessage(errorMessage)

      if (!errorMessage) {
        onChange(value)
      }
    },
    [items, cell.valueType, onChange, item, column.validate]
  )

  const onInputPropsBlur = useCallback<
    FocusEventHandler<HTMLInputElement>
  >(() => {
    onRevert()
  }, [onRevert])

  useEffect(() => {
    const errorMessage =
      column.validate && column.validate(cell.value, item, items)
    setErrorMessage(errorMessage)
  }, [items, cell.value, item, column.validate])

  useEffect(() => {
    inputPropsRef.current && inputPropsRef.current.focus()
  }, [inputPropsRef])

  return (
    <TextField
      classes={textFieldClasses}
      defaultValue={defaultValue}
      type={inputType}
      error={!!errorMessage}
      helperText={errorMessage}
      onChange={onInputChange}
      onKeyDown={onKeyDown}
      inputProps={{
        ref: inputPropsRef,
        className: inputPropsClasses.root,
        onBlur: onInputPropsBlur,
      }}
    />
  )
}

export default DataEditorTextField
