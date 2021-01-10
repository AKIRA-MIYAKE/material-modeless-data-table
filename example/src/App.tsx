import React, { useState, useMemo, useCallback } from 'react'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'

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
  b: string
  c: number
  d: boolean
  e: string
}

const App = () => {
  const [items, setItems] = useState<NullableItem<ExampleItem>[]>(() => {
    return [
      {
        a: 'a0',
        b: 'b0',
        c: 0,
        d: true,
        e: new Date().toISOString(),
      },
      {
        a: 'a1',
        b: 'b1',
        c: 1,
        d: false,
        e: new Date().toISOString(),
      },
      {
        a: 'a2',
        b: 'b2',
        c: 2,
        d: null,
        e: new Date().toISOString(),
      }
    ]
  })

  const columns = useMemo<Column<ExampleItem>[]>(() => {
    return [
      {
        keyProp: 'a',
        valueType: 'string',
        validate: (value, _, items) => {
          if (value === null) {
            return 'Required'
          }

          if (items.filter(item => item.a === value).length > 1) {
            return 'Duplicated'
          }

          return undefined
        },
        label: 'A',
        isRequired: true,
        style: {
          minWidth: '12rem',
        }
      },
      {
        keyProp: 'b',
        valueType: 'string',
        enum: ['b0', 'b1', 'b2', 'b3', 'b4'],
        label: 'B',
        style: {
          width: '12rem',
          minWidth: '12rem',
        }
      },
      {
        keyProp: 'c',
        valueType: 'number',
        label: 'C',
        style: {
          width: '12rem',
          minWidth: '12rem',
          textAlign: 'right'
        }
      },
      {
        keyProp: 'd',
        valueType: 'boolean',
        label: 'D',
        style: {
          width: '8rem',
          minWIdth: '8rem',
          textAlign: 'center'
        }
      },
      {
        keyProp: 'e',
        valueType: 'string',
        formatViewerValue: (value) => {
          return new Date(value as string).toLocaleString()
        },
        defualtValue: () => new Date().toISOString(),
        label: 'E',
        isReadOnly: true,
        style: {
          width: '12rem',
          minWidth: '12rem'
        }
      }
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
    <Container>
      <Box padding={2}>
        <TableContainer component={Paper}>
          <ModelessDataTable<ExampleItem>
            id="example"
            items={items}
            columns={columns}
            onReorder={onReorder}
            onChangeAtIndex={onChangeAtIndex}
            onDeleteAtIndex={onDeleteAtIndex}
            onInsertAtLast={onInsertAtLast}
          />
        </TableContainer>
      </Box>
    </Container>
  )
}

export default App
