import { makeStyles } from '@material-ui/core/styles'
import { DataGrid } from '@material-ui/data-grid'
import * as React from 'react'

const rows = [
   {
      id: 1,
      status: 'big',
      subTotal: 10,
      total: 20,
   },
   {
      id: 2,
      status: 'big',
      subTotal: 10,
      total: 20,
   },
]

const currencyFormatter = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD',
})

const usdPrice = {
   type: 'number',
   width: 130,
   valueFormatter: ({ value }: any) => currencyFormatter.format(Number(value)),
   cellClassName: 'font-tabular-nums',
}

const useStyles = makeStyles({
   root: {
      '& .font-tabular-nums': {
         fontVariantNumeric: 'tabular-nums',
      },
   },
})

export default function CustomColumnTypesGrid() {
   const classes = useStyles()

   return (
      <div style={{ height: 300, width: '100%' }} className={classes.root}>
         <DataGrid
            columns={[
               { field: 'status', width: 130 },
               { field: 'subTotal', ...usdPrice },
               { field: 'total', ...usdPrice },
            ]}
            rows={rows}
         />
      </div>
   )
}
