import ReactDataSheet from 'react-datasheet'

import type { ItemValue, DataSheetCell } from '../interfaces'  // eslint-disable-line

export default class DataSheet extends ReactDataSheet<
  DataSheetCell,
  ItemValue
> {}
