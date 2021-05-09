/* eslint-disable react/require-default-props */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { Button, Card, CardContent, createStyles, makeStyles, Paper, Typography } from '@material-ui/core'
import { DataGrid, DataGridProps, GridColDef, GridColumns, GridRowsProp } from '@material-ui/data-grid'
import React, { useEffect, useState } from 'react'
import SwitchTextField from '../Controls/SwitchTextField'
import env from '../Login/Env'

type TField = {
   name: string
   modelType: string
   inputType: string
   inputShrink: boolean
   colType: string
   required: boolean
   readOnly: boolean
   label: string
   width: number
   value: any
}

const baseUrl = '/api/'

class RestMeta {
   url: string

   hook: any

   metaFields: TField[]

   setUrl(url: string) {
      this.url = url
   }

   setHook(hook: any) {
      this.hook = hook
   }

   handleRowSelected = (e: any) => {
      const newFields: TField[] = this.metaFields.map((field) => {
         const updataField: TField = field

         updataField.value = e.data[field.name] ? e.data[field.name] : ''

         return updataField
      })
      if (this.hook) {
         this.hook(newFields)
      }
   }

   getRows = async (): Promise<GridRowsProp> => {
      const r: GridRowsProp = await fetch(this.url, { method: 'GET' })
         .then((response) => response.json())
         .then((data) => {
            const rows: GridRowsProp = data

            return rows
         })
         .catch((err) => {
            // eslint-disable-next-line no-console
            console.error(`no database >>> ${err}`)
            throw err
         })
      return r
   }

   getColumns = async (): Promise<GridColumns> => {
      const metaFields: TField[] = await this.getMetaFields()
      const _cols: GridColumns = metaFields.map((f) => {
         const col: GridColDef = {
            field: f.name,
            headerName: f.label,
            type: f.colType,
         }
         return col
      })
      return _cols
   }

   getMetaFields = async (): Promise<TField[]> => {
      const f: TField[] = await fetch(this.url, { method: 'OPTIONS' })
         .then((response) => response.json())
         .then((metaData) => {
            const meta = metaData.actions.POST
            const fields: TField[] = []
            for (const prop in meta) {
               const detail = meta[prop]
               const fieldDef: TField = {
                  name: prop,
                  modelType: detail.type,
                  inputType: detail.type,
                  inputShrink: true,
                  colType: 'string',
                  required: detail.required,
                  readOnly: detail.read_only,
                  label: detail.label,
                  width: 350,
                  value: '',
               }
               switch (detail.type) {
                  case 'integer':
                     fieldDef.inputType = 'number'
                     fieldDef.colType = 'number'
                     break
                  case 'decimal':
                     fieldDef.colType = 'number'
                     break
                  case 'float':
                     fieldDef.colType = 'number'
                     break
                  case 'boolean':
                     fieldDef.inputType = 'checkbox'
                     fieldDef.value = false
                     break
                  case 'datetime':
                     fieldDef.inputType = 'dateTime-local'
                     fieldDef.colType = 'dateTime'
                     fieldDef.width = 300
                     break
                  case 'date':
                     fieldDef.width = 300
                     break
                  case 'string':
                     fieldDef.inputType = 'text'
                     break
                  case 'email':
                     fieldDef.colType = 'string'
                     break
                  case 'file upload':
                     fieldDef.width = 300
                     fieldDef.colType = 'string'
                     break
                  default:
                     break
               }

               fields.push(fieldDef)
            }
            return fields
         })
      this.metaFields = f
      return f
   }
}
const meta = new RestMeta()

declare type RestViewGridProps = Omit<DataGridProps, 'columns' | 'rows'> & {
   url: string
   columns?: GridColumns
   rows?: GridRowsProp
}

export const RestViewGrid = (props: RestViewGridProps): any => {
   const { url, columns, rows, ...other } = props
   const emptyCols: GridColumns = []
   const emptyRows: GridRowsProp = []
   const [cols, setCols] = useState(emptyCols)
   const [_rows, setRows] = useState(emptyRows)
   meta.setUrl(url)

   useEffect(() => {
      if (cols === emptyCols) {
         if (columns) {
            setCols(columns)
         } else {
            meta.getColumns().then((c) => {
               setCols(c)
            })
         }

         if (rows) {
            setRows(rows)
         } else {
            meta.getRows().then((r) => {
               setRows(r)
            })
         }
      }
   }, [])

   return <DataGrid onRowSelected={meta.handleRowSelected} rows={_rows} columns={cols} {...other} />
}

interface IProps {
   url: string
}

export const RestForm = (props: IProps) => {
   const useStyles = makeStyles(() =>
      createStyles({
         wordwrap: {
            overflowWrap: 'anywhere',
         },
      })
   )

   const emptyMeta: TField[] = []
   const emptyRep = { ok: false, statusText: '', url: '' }
   const [metaFields, setMetaFields] = useState<TField[]>(emptyMeta)
   const [newData, setNewData] = useState('')
   const [resp, setResp] = useState(emptyRep)
   const classes = useStyles()
   meta.setUrl(props.url)
   meta.setHook(setMetaFields)

   useEffect(() => {
      if (metaFields === emptyMeta) {
         meta
            .getMetaFields()
            .then((c) => {
               setMetaFields(c)
            })
            .catch(() => {})
      }
   })

   const handleChange = (event: any) => {
      // event.preventDefault()
      // event.persist()
      let { value } = event.target
      const { type, id, checked } = event.target
      const index = parseInt(id, 10)

      setMetaFields((prev) => {
         // return untouched all the items that don't match index
         return prev.map((item, i) => {
            if (i !== index) {
               return item
            }
            // for the one item that does match the index
            // do any special handling of event.target.value
            if (type === 'checkbox') {
               value = checked
            }

            // update the matching item and return result to setMetaFields
            return {
               ...item,
               value,
            }
         })
      })
   }

   const handleSubmit = async (event: any) => {
      event.preventDefault()

      // Make an array of read-only fields that have an assigne value
      // If there is anyhting in this array then the read-only primary key field
      // been assigned a value which only happens if this should be an update operation.
      const primaryKeyFieldArray = metaFields
         .filter((field) => field.value && field.readOnly)
         .map((field) => {
            return {
               name: field.name,
               value: field.value,
            }
         })

      let pk: number = 0
      const isUpdate = primaryKeyFieldArray.length > 0

      if (isUpdate) {
         pk = primaryKeyFieldArray[0].value
      }

      let stripFormat = metaFields
         .filter((field) => !field.readOnly)
         .map((field) => {
            const stripped = {
               name: field.name,
               value: field.value,
            }
            if (field.inputType === 'decimal' && field.value) {
               stripped.value = stripped.value.replaceAll(',', '')
               stripped.value = stripped.value.replaceAll('$', '')
               stripped.value = stripped.value.replaceAll(' ', '')
               stripped.value = parseFloat(stripped.value)
            }
            if (field.inputType === 'number' && field.value) {
               stripped.value = parseInt(stripped.value, 10)
            }
            if (stripped.value === '') {
               stripped.value = null
            }
            return stripped
         })

      stripFormat = stripFormat.concat(primaryKeyFieldArray)

      const isValid = validate()
      if (isValid) {
         const data = stripFormat.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {})
         setNewData(JSON.stringify(data))
         let url = `${env().API_HOST + baseUrl}`
         let method = 'POST'

         if (isUpdate) {
            url = `${env().API_HOST + baseUrl}update/${pk}`
            method = 'PUT'
         }
         const requestOptions = {
            method,
            //    headers: { 'Content-Type': 'application/json', 'X-CSRFToken': await getCsrfToken() },
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
         }
         try {
            const response = await fetch(url, requestOptions)

            setResp(response)
         } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
         }
      }
   }
   //  TO DO: implement form level validation
   const validate = () => {
      return true
   }

   return (
      <Paper elevation={0}>
         <form onSubmit={handleSubmit}>
            {metaFields.map((item, index) => (
               <div key={item.name}>
                  {item.readOnly ? (
                     <Paper variant="outlined">
                        <span>{`${item.name} : ${item.value}`}</span>
                     </Paper>
                  ) : (
                     <SwitchTextField
                        label={item.label}
                        type={item.inputType}
                        fullWidth={true}
                        value={item.value}
                        required={item.required}
                        onChange={handleChange}
                        id={index.toString()}
                        name={item.name}
                        InputLabelProps={{
                           shrink: item.inputShrink,
                        }}
                     />
                  )}
               </div>
            ))}

            <Button variant="contained" color="primary" type="submit">
               submit
            </Button>

            <Card>
               <CardContent>
                  <Typography color="textPrimary" gutterBottom>
                     Data sent:
                  </Typography>
                  <Typography variant="body2" component="p" gutterBottom className={classes.wordwrap}>
                     {newData}
                  </Typography>
                  <Typography color="textPrimary" gutterBottom>
                     Response:
                  </Typography>
                  <Typography>{`Status Text: ${resp.statusText}`}</Typography>
                  <Typography>{`URL: ${resp.url}`}</Typography>
               </CardContent>
            </Card>
         </form>
      </Paper>
   )
}
