import React, { ChangeEventHandler, useState, useMemo, useCallback } from 'react'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
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
  const [isTableSizeSmall, setIsTableSizeSmall] = useState(false)
  const [isReadOnly, setIsReadOnly] = useState(false)
  const [isTableHeaderHidden, setIsTableHeaderHidden] = useState(false)
  const [isReorderDisabled, setIsReorderDisabled] = useState(false)
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false)
  const [isInsertDisabled, setIsInsertDisabled] = useState(false)

  const onTableSizeSwitchChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setIsTableSizeSmall(event.target.checked)
    },
    []
  )

  const onReadOnlySwitchChage = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setIsReadOnly(event.target.checked)
    },
    []
  )

  const onTableHeaderHiddenSwitchChage = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setIsTableHeaderHidden(event.target.checked)
    },
    []
  )

  const onReorderDisabledSwitchChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setIsReorderDisabled(event.target.checked)
    },
    []
  )

  const onDeleteDisabledSwitchChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setIsDeleteDisabled(event.target.checked)
    },
    []
  )

  const onInsertDisabledSwitchChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setIsInsertDisabled(event.target.checked)
    },
    []
  )

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
      <Box marginY={2}>
        <Paper>
          <Box padding={2}>
            <FormGroup row>
              <FormControlLabel
                control={<Switch checked={isTableSizeSmall} onChange={onTableSizeSwitchChange} />}
                label="Small"
              />

              <FormControlLabel
                control={<Switch checked={isTableHeaderHidden} onChange={onTableHeaderHiddenSwitchChage} />}
                label="isTableHeaderHidden"
              />
            </FormGroup>

            <FormGroup row>
              <FormControlLabel
                control={<Switch checked={isReadOnly} onChange={onReadOnlySwitchChage} />}
                label="isReadOnly"
              />

              <FormControlLabel
                control={<Switch checked={isReorderDisabled} onChange={onReorderDisabledSwitchChange} />}
                label="isReorderDisabled"
              />

              <FormControlLabel
                control={<Switch checked={isDeleteDisabled} onChange={onDeleteDisabledSwitchChange} />}
                label="isDeleteDisabled"
              />

              <FormControlLabel
                control={<Switch checked={isInsertDisabled} onChange={onInsertDisabledSwitchChange} />}
                label="isInsertDisabled"
              />
            </FormGroup>
          </Box>
        </Paper>
      </Box>

      <TableContainer component={Paper}>
        <ModelessDataTable<ExampleItem>
          id="example"
          items={items}
          columns={columns}
          onReorder={onReorder}
          onChangeAtIndex={onChangeAtIndex}
          onDeleteAtIndex={onDeleteAtIndex}
          onInsertAtLast={onInsertAtLast}
          tableSize={isTableSizeSmall ? 'small' : 'medium'}
          isReadOnly={isReadOnly}
          isTableHeaderHidden={isTableHeaderHidden}
          isReorderDisabled={isReorderDisabled}
          isDeleteDisabled={isDeleteDisabled}
          isInsertDisabled={isInsertDisabled}
        />
      </TableContainer>
    </Container>
  )
}

export default App
