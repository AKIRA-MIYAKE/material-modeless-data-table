import React, {
  RefObject,
  MouseEventHandler,
  KeyboardEventHandler,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react'
import Checkbox from '@material-ui/core/Checkbox'

import { Item, DataEditorProps } from '../interfaces'

const DataEditorCheckbox: <T extends Item>(
  props: DataEditorProps<T>
) => JSX.Element = ({ cell, onCommit, onRevert }) => {
  const [isIndeterminate, setIsIndeterminate] = useState(cell.value === null)

  const checkboxInputRef = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>

  const onCheckboxMouseDown = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.stopPropagation()

      if (cell.value === null) {
        onCommit(true)
        return
      }

      onCommit(!cell.value)
    },
    [cell.value, onCommit]
  )

  const onCheckboxKeyDown = useCallback<
    KeyboardEventHandler<HTMLButtonElement>
  >(
    (event) => {
      if (!checkboxInputRef.current) {
        return
      }

      switch (event.key) {
        case 'Enter':
          {
            event.preventDefault()
            const value = checkboxInputRef.current.checked
            onCommit(value)
          }
          break
        case 'Escape':
          onRevert()
          break
        case 'Tab':
          event.preventDefault()
          break
      }
    },
    [onCommit, onRevert, checkboxInputRef]
  )

  const onCheckboxChange = useCallback(() => {
    setIsIndeterminate(false)
  }, [])

  useEffect(() => {
    checkboxInputRef.current && checkboxInputRef.current.focus()
  }, [checkboxInputRef])

  return (
    <Checkbox
      defaultChecked={typeof cell.value === 'boolean' && cell.value}
      indeterminate={isIndeterminate}
      inputRef={checkboxInputRef}
      onMouseDown={onCheckboxMouseDown}
      onKeyDown={onCheckboxKeyDown}
      onChange={onCheckboxChange}
    />
  )
}

export default DataEditorCheckbox
