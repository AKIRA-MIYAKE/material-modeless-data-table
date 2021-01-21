import type { DragDropContextProps } from 'react-beautiful-dnd'
import type ReactDataSheet from 'react-datasheet'

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
  srcIndex: number
  destIndex: number
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

export type ValueRenderer<T extends Item> = DataSheetValueRenderer & {
  tableProps: ModelessDataTableProps<T>
}

export type SheetRendererProps<T extends Item> = DataSheetSheetRendererProps & {
  tableProps: ModelessDataTableProps<T>
  onInsert: () => void
} & Pick<DragDropContextProps, 'onDragEnd'>

export type RowRendererProps<T extends Item> = DataSheetRowRendererProps & {
  tableProps: ModelessDataTableProps<T>
  onDelete: (row: number) => void
}

export type CellRendererProps<T extends Item> = DataSheetCellRendererProps & {
  tableProps: ModelessDataTableProps<T>
}

export type ValueViewerProps<T extends Item> = DataSheetValueViewerProps & {
  tableProps: ModelessDataTableProps<T>
}

export type DataEditorProps<T extends Item> = DataSheetDataEditorProps & {
  tableProps: ModelessDataTableProps<T>
}

// react-datasheet

export type DataSheetCell = ReactDataSheet.Cell<DataSheetCell, ItemValue> & {
  value: ItemValue
  valueType: ItemValueType
}

export type DataSheetValueRenderer = ReactDataSheet.ValueRenderer<
  DataSheetCell,
  ItemValue
>

export type DataSheetCellsChangedHandler = ReactDataSheet.CellsChangedHandler<
  DataSheetCell,
  ItemValue
>

export type DataSheetSheetRenderer = ReactDataSheet.SheetRenderer<
  DataSheetCell,
  ItemValue
>
export type DataSheetSheetRendererProps = ReactDataSheet.SheetRendererProps<
  DataSheetCell,
  ItemValue
>

export type DataSheetRowRenderer = ReactDataSheet.RowRenderer<
  DataSheetCell,
  ItemValue
>
export type DataSheetRowRendererProps = ReactDataSheet.RowRendererProps<
  DataSheetCell,
  ItemValue
>

export type DataSheetCellRenderer = ReactDataSheet.CellRenderer<
  DataSheetCell,
  ItemValue
>
export type DataSheetCellRendererProps = ReactDataSheet.CellRendererProps<
  DataSheetCell,
  ItemValue
>

export type DataSheetValueViewer = ReactDataSheet.ValueViewer<
  DataSheetCell,
  ItemValue
>
export type DataSheetValueViewerProps = ReactDataSheet.ValueViewerProps<
  DataSheetCell,
  ItemValue
>

export type DataSheetDataEditor = ReactDataSheet.DataEditor<
  DataSheetCell,
  ItemValue
>
export type DataSheetDataEditorProps = ReactDataSheet.DataEditorProps<
  DataSheetCell,
  ItemValue
>
