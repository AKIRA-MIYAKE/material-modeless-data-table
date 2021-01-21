import { useMemo, useCallback } from 'react'

import {
  ModelessDataTableProps,
  NullableItem,
  Item,
  ItemValue,
  Column,
  SheetRendererProps,
  RowRendererProps,
  DataSheetCell,
  DataSheetCellsChangedHandler,
} from '../interfaces'

export const itemToRowCells = <T extends Item>(params: {
  item: NullableItem<T>
  index: number
  id: string
  columns: Column<T>[]
  isReadOnly?: boolean
}): DataSheetCell[] => {
  const { item, index, id, columns, isReadOnly } = params

  return columns
    .filter((column) => !column.isHidden)
    .map((column) => {
      let value: ItemValue

      if (typeof item[column.keyProp] === 'undefined') {
        value = null
      } else {
        value = item[column.keyProp]
      }

      const key = `${id}_${column.keyProp}_${index}`

      return {
        value,
        valueType: column.valueType,
        key,
        readOnly: isReadOnly || column.isReadOnly,
        ...column.cell,
      }
    })
}

export const createItem = <T extends Item>(params: {
  columns: Column<T>[]
}): NullableItem<T> => {
  const { columns } = params

  return columns.reduce((acc, current) => {
    let value: ItemValue = null

    if (current.defualtValue) {
      if (typeof current.defualtValue === 'function') {
        value = current.defualtValue()
      } else {
        value = current.defualtValue
      }
    }

    return {
      ...acc,
      [current.keyProp]: value,
    }
  }, {} as NullableItem<T>)
}

const useData = <T extends Item>(
  params: ModelessDataTableProps<T>
): {
  data: DataSheetCell[][]
  onCellsChanged: DataSheetCellsChangedHandler
  onDragEnd: SheetRendererProps<T>['onDragEnd']
  onDelete: RowRendererProps<T>['onDelete']
  onInsert: SheetRendererProps<T>['onInsert']
} => {
  const {
    id,
    items,
    columns,
    isReadOnly,
    onReorder,
    onChangeAtIndex,
    onDeleteAtIndex,
    onInsertAtLast,
  } = params

  const data = useMemo(() => {
    return items.map((item, index) =>
      itemToRowCells({
        item,
        index,
        id,
        columns,
        isReadOnly,
      })
    )
  }, [id, items, columns, isReadOnly])

  const onCellsChanged = useCallback<DataSheetCellsChangedHandler>(
    (changes) => {
      if (!onChangeAtIndex) {
        return
      }

      changes.forEach((change) => {
        const { row, col, value } = change

        const index = row
        const oldItem = items[index]
        const column = columns.filter((column) => !column.isHidden)[col]

        let updatedValue = value
        if (typeof updatedValue === 'string' && updatedValue.length === 0) {
          updatedValue = null
        }

        if (column.isRequired && updatedValue === null) {
          return
        }

        if (column.validate && column.validate(updatedValue, oldItem, items)) {
          return
        }

        if (column.formatEditedValue) {
          updatedValue = column.formatEditedValue(updatedValue)
        }

        const newItem = {
          ...oldItem,
          [column.keyProp]: updatedValue,
        }

        onChangeAtIndex({
          newItem,
          oldItem,
          index,
        })
      })
    },
    [items, columns, data, onChangeAtIndex]
  )

  const onDragEnd = useCallback<SheetRendererProps<T>['onDragEnd']>(
    (event) => {
      if (!onReorder) {
        return
      }

      if (event.reason === 'CANCEL') {
        return
      }

      const destIndex = event.destination && event.destination.index
      if (typeof destIndex === 'undefined') {
        return
      }

      const srcIndex = event.source.index

      if (srcIndex === destIndex) {
        return
      }

      const targetItem = items[srcIndex]
      const updatedItems = items.filter((_, index) => index !== srcIndex)
      updatedItems.splice(destIndex, 0, targetItem)

      onReorder({ items: updatedItems, srcIndex, destIndex })
    },
    [items, onReorder]
  )

  const onDelete = useCallback<RowRendererProps<T>['onDelete']>(
    (row) => {
      if (!onDeleteAtIndex) {
        return
      }

      const index = row
      const oldItem = items[index]

      onDeleteAtIndex({
        oldItem,
        index,
      })
    },
    [items, onDeleteAtIndex]
  )

  const onInsert = useCallback<SheetRendererProps<T>['onInsert']>(() => {
    if (!onInsertAtLast) {
      return
    }

    const newItem = createItem({ columns })
    const index = items.length

    onInsertAtLast({
      newItem,
      index,
    })
  }, [items, columns, onInsertAtLast])

  return {
    data,
    onCellsChanged,
    onDragEnd,
    onDelete,
    onInsert,
  }
}

export default useData
