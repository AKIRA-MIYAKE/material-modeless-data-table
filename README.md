# material-modeless-data-table

> Modeless data table with material UI components

[![NPM](https://img.shields.io/npm/v/material-modeless-data-table.svg)](https://www.npmjs.com/package/material-modeless-data-table)

## Install

```bash
npm install --save material-modeless-data-table
```

## Usage

```tsx
import React, { useState, useMemo, useCallback } from 'react'

import ModelessDataTable, {
  NullableItem,
  Column,
  ReorderHandler,
  ChangeAtIndexHandler,
  DeleteAtIndexHandler,
  InsertAtLastHandler,
} from 'material-modeless-data-table'
import 'material-modeless-data-table/dist/index.css'

type ExampleItem = {
  a: string
  b: number
  c: boolean
}

const App = () => {
  const [items, setItems] = useState<NullableItem<ExampleItem>[]>(() => {
    return [{ a: 'a0', b: 0, c: true }]
  })

  const columns = useMemo<Column<ExampleItem>[]>(() => {
    return [
      {
        keyProp: 'a',
        valueType: 'string',
        label: 'A',
      },
      {
        keyProp: 'b',
        valueType: 'number',
        label: 'B',
      },
      {
        keyProp: 'c',
        valueType: 'boolean',
        label: 'C',
      },
    ]
  }, [])

  const onReorder = useCallback<ReorderHandler<ExampleItem>>(
    ({ items }) => {
      setItems(items)
    },
    []
  )

  const onChangeAtIndex = useCallback<ChangeAtIndexHandler<ExampleItem>>(
    ({ newItem, index }) => {
      const updatedItems = items.map((item, i) => {
        if (i !== index) {
          return item
        }

        return newItem
      })

      setItems(updatedItems)
    },
    [items]
  )

  const onDeleteAtIndex = useCallback<DeleteAtIndexHandler<ExampleItem>>(
    ({ index }) => {
      const updatedItems = items.filter((_, i) => i !== index)

      setItems(updatedItems)
    },
    [items]
  )

  const onInsertAtLast = useCallback<InsertAtLastHandler<ExampleItem>>(
    ({ newItem }) => {
      const updatedItems = [...items, newItem]

      setItems(updatedItems)
    },
    [items]
  )

  return (
    <ModelessDataTable<ExampleItem>
      id="example"
      items={items}
      columns={columns}
      onReorder={onReorder}
      onChangeAtIndex={onChangeAtIndex}
      onDeleteAtIndex={onDeleteAtIndex}
      onInsertAtLast={onInsertAtLast}
    />
  )
}
```

### interfaces

```tsx
export type ModelessDataTableProps<T extends Item> = {
  id: string
  items: NullableItem<T>[]
  columns: Column<T>[]
  tableSize?: 'small' | 'medium'
  isReadOnly?: boolean
  isTableHeaderHidden?: boolean
  isReorderDisabled?: boolean
  isDeleteDisabled?: boolean
  isInsertDisabled?: boolean
  onReorder?: ReorderHandler<T>
  onChangeAtIndex?: ChangeAtIndexHandler<T>
  onDeleteAtIndex?: DeleteAtIndexHandler<T>
  onInsertAtLast?: InsertAtLastHandler<T>
}

export type NullableItem<T extends Item> = { [P in keyof T]: T[P] | null }

export type Item = { [key: string]: ItemValue }
export type ItemValue = string | number | boolean | null
export type ItemValueType = 'string' | 'number' | 'boolean'

export type Column<T extends Item> = {
  keyProp: string
  valueType: ItemValueType
  inputType?: string
  enum?: Exclude<ItemValue, boolean | null>[]
  validate?: (
    value: ItemValue,
    item: NullableItem<T>,
    items: NullableItem<T>[]
  ) => string | undefined
  formatViewerValue?: (value: ItemValue) => string
  formatEditedValue?: (value: ItemValue) => ItemValue
  defualtValue?: ItemValue | (() => ItemValue)
  label?: string
  isRequired?: boolean
  isReadOnly?: boolean
  isHidden?: boolean
  style?: {
    width?: number | string
    minWidth?: number | string
    maxWidth?: number | string
    textAlign?: 'left' | 'center' | 'right'
  }
  overflow?: 'wrap' | 'nowrap' | 'clip' | 'ellipsis'
  cell?: {
    component?: JSX.Element
    forceComponent?: boolean
    disableEvents?: boolean
    valueViewer?: DataSheetValueViewer
    dataEditor?: DataSheetDataEditor
  }
}

export type ReorderHandler<T extends Item> = (event: {
  items: NullableItem<T>[]
}) => void

export type ChangeAtIndexHandler<T extends Item> = (event: {
  newItem: NullableItem<T>
  oldItem: NullableItem<T>
  index: number
}) => void

export type DeleteAtIndexHandler<T extends Item> = (event: {
  oldItem: NullableItem<T>
  index: number
}) => void

export type InsertAtLastHandler<T extends Item> = (event: {
  newItem: NullableItem<T>
  index: number
}) => void
```

## License

MIT © [AKIRA-MIYAKE](https://github.com/AKIRA-MIYAKE)
