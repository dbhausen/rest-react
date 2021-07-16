/* eslint-disable no-nested-ternary */
import {
   Button,
   createStyles,
   FormControl,
   FormControlLabel,
   FormGroup,
   Grid,
   InputLabel,
   makeStyles,
   MenuItem,
   Paper,
   Select,
   Switch,
   TextField,
   Theme,
   Tooltip,
   Typography,
} from '@material-ui/core'
import { DataGrid, GridColumns } from '@material-ui/data-grid'
import CreateSharpIcon from '@material-ui/icons/CreateSharp'
import copy from 'clipboard-copy'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import UserContext from '../Context/UserContext'

const genderNames: string[] = [
   'Not disclosed',
   'Man',
   'Woman',
   'Transgender',
   'Genderqueer',
   'Agender',
   'Genderless',
   'Non-binary',
   'Cis Man',
   'Cis Woman',
   'Trans Man',
   'Trans Woman',
   'Third Gender',
   'Two-Spirit',
   'Bigender',
   'Genderfluid',
   'Undecided',
]

const _cols: GridColumns = [
   //  { field: 'id' },
   { field: 'givenName', hide: false },
   { field: 'middleInitial', hide: false },
   { field: 'surName', hide: false },
   { field: 'gender', width: 150, hide: false },
   { field: 'ss', width: 150, hide: false },
   { field: 'age', type: 'number', width: 90, hide: false },
   { field: 'hireDate', type: 'date', width: 250, hide: false },
]
const _rows: TRow[] = [
   //  { field: 'id' },
   { id: 0, givenName: '', middleInitial: '', surName: '', gender: '', ss: '', age: 0, hireDate: new Date() },
]

type TFirstName = {
   givenName: string
   gender: string
   minRange: number
   maxRange: number
}
type TLastName = {
   surName: string
   minRange: number
   maxRange: number
}
type TRow = {
   id: number
   givenName: string
   middleInitial: string
   surName: string
   gender: string
   ss: string
   age: number
   hireDate: Date
}

interface IProps {
   url: string
}

const RandomNames = (props: IProps) => {
   const [firstNamelist, setFirstNamelist] = useState<TFirstName[]>()
   const [lastNameList, setLastNameList] = useState<TLastName[]>()
   const [loading, setLoading] = useState(true)
   const [rows, setRows] = useState<TRow[]>(_rows)
   const [rowCount, setRowCount] = useState(100)
   const [outputAs, setOutputAs] = useState('DataGrid')
   const [maxAge, setMaxAge] = useState<number>(65)
   const [minAge, setMinAge] = useState<number>(20)
   const [inclusiveGender, setInclusiveGender] = useState(true)
   const typeMap = new Map()

   typeMap.set('id', { type: 'number' })
   typeMap.set('givenName', { type: 'string' })
   typeMap.set('middleInitial', { type: 'string' })
   typeMap.set('surName', { type: 'string' })
   typeMap.set('gender', { type: 'string' })
   typeMap.set('ss', { type: 'string' })
   typeMap.set('age', { type: 'number' })
   typeMap.set('hireDate', { type: 'Date' })

   // eslint-disable-next-line no-unused-vars
   const [cols, setCols] = useState<GridColumns>(_cols)
   //   const uniqueRandNumberArray: number[] = []
   const useStyles = makeStyles((theme: Theme) =>
      createStyles({
         menubox: {
            height: '50px',
            paddingTop: theme.spacing(3),
            paddingLeft: theme.spacing(3),
            maxWidth: '800px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            '& .MuiSelect-selectMenu': {
               minWidth: '80px',
               marginLeft: '10px',
            },
         },
         box: {
            height: '30px',
            maxWidth: '700px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
         },
         hiddenbutton: {
            display: 'none',
         },
         csv: {
            overflowY: 'scroll',
         },
         showbutton: {
            display: 'flex',
         },
         dataPaper: {
            background: theme.palette.background.default,
         },
      })
   )

   const classes = useStyles()

   useEffect(() => {
      const fetchNames = async () => {
         const fnl = await getFirstnames(`${props.url}firstname/`)
         setFirstNamelist(fnl)
         const lnl = await getLastnames(`${props.url}lastname/`)
         setLastNameList(lnl)
         calculate(rowCount, fnl, lnl)
      }

      fetchNames()
   }, [])

   const callCalculate = () => {
      if (rowCount && firstNamelist && lastNameList) {
         calculate(rowCount, firstNamelist, lastNameList)
      }
   }

   const calculate = (_rowCount: number, fnl: TFirstName[], lnl: TLastName[]) => {
      setRows([])
      setLoading(true)

      const getRandomInt = (max: number): number => {
         return Math.floor(Math.random() * Math.floor(max))
      }

      const randNormal = (min: number, max: number): number => {
         let u = 0
         let v = 0
         while (u === 0) u = Math.random()
         while (v === 0) v = Math.random()
         let num = Math.sqrt(-8.0 * Math.log(u)) * Math.cos(8.0 * Math.PI * v)
         num = num / 10.0 + 0.5 // Translate to 0 -> 1
         if (num > 1 || num < 0) return randNormal(min, max) // resample between 0 and 1
         return num * (max - min) + min
      }

      const _r: TRow[] = []
      const ssGenerator: IterableIterator<string> = g(_rowCount)
      for (let index = 0; index < _rowCount; index += 1) {
         const minFirstRange = getRandomInt(192908123)
         const minLastRange = getRandomInt(154575750)
         const middleInitial = String.fromCharCode(getRandomInt(22) + 65)
         const age = Math.floor(randNormal(minAge, maxAge))
         let hireDate = dayjs()
         const daysOnJob = getRandomInt(age - minAge) * 0.65 * 365 + getRandomInt(365)
         hireDate = hireDate.subtract(Math.floor(daysOnJob), 'days')
         const firstName = fnl.find((element) => element.maxRange >= minFirstRange)
         const lastName = lnl.find((element) => element.maxRange >= minLastRange)
         let genderName = firstName?.gender === 'Male' ? 'Male' : 'Female'
         if (inclusiveGender) {
            genderName = genderName === 'Male' ? 'Man' : 'Woman'
         }
         const genderIndex = getRandomInt(1600)
         if (genderIndex < genderNames.length && inclusiveGender) {
            genderName = genderNames[genderIndex]
         }

         _r.push({
            id: index,
            givenName: firstName?.givenName || '',
            middleInitial,
            surName: lastName?.surName || '',
            gender: genderName,
            ss: ssGenerator.next().value,
            age,
            hireDate: hireDate.toDate(),
         })
      }

      setRows(_r)
      setLoading(false)
   }

   const copyToClip = () => {
      if (outputAs === 'JSON') {
         copy(JSON.stringify(rows))
      } else {
         copy(jsonToCsv())
      }
   }

   // eslint-disable-next-line no-unused-vars
   const handleSwitchChange = (e: React.ChangeEvent<{ checked: boolean; name: string }>) => {
      setCols((prev) => {
         const c = prev.find((col) => col.field === e.currentTarget.name)
         if (c) {
            c.hide = !e.target.checked
         }
         const _newCols: GridColumns = [
            //  { field: 'id' },
            { field: 'givenName', hide: false },
            { field: 'middleInitial', hide: false },
            { field: 'surName', hide: false },
            { field: 'gender', width: 150, hide: false },
            { field: 'ss', width: 150, hide: false },
            { field: 'age', type: 'number', width: 90, hide: false },
            { field: 'hireDate', type: 'date', width: 250, hide: false },
         ]

         for (let index = 0; index < _newCols.length; index += 1) {
            _newCols[index].hide = prev[index].hide
         }

         return _newCols
      })
   }

   const handleInclusiveGenderChange = (e: any) => {
      setInclusiveGender(e.target.checked)
   }

   const handleRowCountChange = (e: React.ChangeEvent<{ value: number }>) => {
      setRowCount(e.target.value)
      if (firstNamelist && lastNameList) {
         calculate(e.target.value, firstNamelist, lastNameList)
      }
   }

   const handleOutputAsChange = (e: React.ChangeEvent<{ value: string }>) => {
      setOutputAs(e.target.value)
   }

   const handleMinAgeChange = (e: any) => {
      setMinAge(parseInt(e.target.value, 10))
   }

   const handleMaxAgeChange = (e: any) => {
      setMaxAge(parseInt(e.target.value, 10))
   }

   const getVisibleColNames = (): string[] => {
      const visableColNames: string[] = []
      cols.forEach((col) => {
         if (!col.hide) {
            visableColNames.push(col.field)
         }
      })
      return visableColNames
   }

   const jsonToCsv = (): string => {
      if (!rows) {
         return ''
      }
      const headers = getVisibleColNames()
      const replacer = (value: any) => {
         return value === null ? '' : value
      }
      let result = ''
      rows.forEach((row: { [index: string]: any }) => {
         const values: any = []
         headers.forEach((header) => {
            values.push(JSON.stringify(replacer(row[header])))
         })
         result = result.concat(values.join(',').concat('\n'))
      })

      return result
   }

   const jsonToShortJson = (): string => {
      const headers = getVisibleColNames()

      const shortRows: any[] = []

      rows.forEach((row) => {
         const shortRow: any = {}

         headers.forEach((header) => {
            switch (header) {
               case 'id':
                  shortRow.id = row.id
                  break
               case 'givenName':
                  shortRow.givenName = row.givenName
                  break
               case 'surName':
                  shortRow.surName = row.surName
                  break
               case 'middleInitial':
                  shortRow.middleInitial = row.middleInitial
                  break
               case 'gender':
                  shortRow.gender = row.gender
                  break
               case 'ss':
                  shortRow.ss = row.ss
                  break
               case 'hireDate':
                  shortRow.hireDate = row.hireDate
                  break
               case 'age':
                  shortRow.age = row.age
                  break
               default:
                  break
            }
         })
         shortRows.push(shortRow)
      })

      return JSON.stringify(shortRows)
   }

   return (
      <UserContext.Consumer>
         {(u) => (
            <Paper elevation={0} style={{ padding: '8px' }}>
               {u.user}
               <Grid container direction="row" spacing={3}>
                  <Grid item>
                     <FormGroup>
                        {cols.map((col) => (
                           <FormControlLabel
                              control={
                                 <Switch
                                    size="small"
                                    checked={!col.hide}
                                    onChange={handleSwitchChange}
                                    name={col.field}
                                    color="primary"
                                 />
                              }
                              label={col.field}
                           />
                        ))}
                     </FormGroup>
                  </Grid>
                  <Grid item>
                     <FormGroup>
                        <FormControlLabel
                           control={
                              <Switch
                                 size="small"
                                 onChange={handleInclusiveGenderChange}
                                 checked={inclusiveGender}
                                 value={inclusiveGender}
                                 color="primary"
                              />
                           }
                           label="Use inclusive gender roles"
                        />

                        <TextField
                           label="Maximum age"
                           onChange={handleMaxAgeChange}
                           value={maxAge}
                           type="number"
                           color="primary"
                        />

                        <TextField
                           label="Minimum age when hired"
                           onChange={handleMinAgeChange}
                           value={minAge}
                           type="number"
                           color="primary"
                        />

                        <Tooltip title="Use preferences to generate a new set of employees" placement="bottom-start">
                           <Button color="primary" variant="contained" onClick={() => callCalculate()}>
                              Refresh
                           </Button>
                        </Tooltip>
                     </FormGroup>
                  </Grid>

                  <Grid item>
                     <Paper className={classes.dataPaper} style={{ padding: '10px' }}>
                        <Typography>
                           <pre>
                              {'type TEmployee = {'}
                              {cols
                                 .filter((col) => !col.hide)
                                 .map((col) => (
                                    <div>{`   ${col.field}: ${typeMap.get(col.field).type}`}</div>
                                 ))}
                              {'}'}
                           </pre>
                        </Typography>
                     </Paper>
                  </Grid>
               </Grid>

               <Paper className={classes.menubox} component="span">
                  <FormControl>
                     <InputLabel id="demo-simple-select-label">Count</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rowCount}
                        onChange={handleRowCountChange}>
                        <MenuItem value={100}>100</MenuItem>
                        <MenuItem value={1000}>1,000</MenuItem>
                        <MenuItem value={10000}>10,000</MenuItem>
                        <MenuItem value={50000}>50,000</MenuItem>
                     </Select>
                  </FormControl>
                  <FormControl>
                     <InputLabel id="demo-simple-select-label">Output as</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={outputAs}
                        onChange={handleOutputAsChange}>
                        <MenuItem value="DataGrid">Data Grid</MenuItem>
                        <MenuItem value="JSON">JSON</MenuItem>
                        <MenuItem value="csv">Comma Separated</MenuItem>
                     </Select>
                  </FormControl>
                  <Button
                     endIcon={<CreateSharpIcon />}
                     size="small"
                     classes={outputAs === 'DataGrid' ? { root: classes.hiddenbutton } : { root: classes.showbutton }}
                     onClick={copyToClip}>
                     Copy to clipboard
                  </Button>
               </Paper>

               {outputAs === 'DataGrid' ? (
                  <Paper elevation={0} style={{ marginBottom: '20px', paddingLeft: '20px' }}>
                     <Paper className={classes.dataPaper} elevation={9} style={{ height: '400px' }}>
                        <DataGrid
                           density="compact"
                           loading={loading}
                           pageSize={100}
                           disableColumnSelector={true}
                           autoHeight={false}
                           rows={rows}
                           columns={cols}
                        />
                     </Paper>
                  </Paper>
               ) : outputAs === 'JSON' ? (
                  <Paper
                     className={classes.dataPaper}
                     id="json"
                     elevation={9}
                     style={{
                        wordWrap: 'break-word',
                        wordBreak: 'break-all',
                        overflow: 'auto',
                        maxWidth: '700px',
                        maxHeight: '400px',
                     }}>
                     {jsonToShortJson()}
                  </Paper>
               ) : (
                  <Paper
                     className={classes.dataPaper}
                     id="json"
                     elevation={9}
                     style={{ maxWidth: '700px', maxHeight: '400px', whiteSpace: 'break-spaces', overflow: 'auto' }}>
                     <pre>{jsonToCsv()}</pre>
                  </Paper>
               )}
            </Paper>
         )}
      </UserContext.Consumer>
   )
}
export default RandomNames

function* g(rowCount: number): IterableIterator<string> {
   const uniqueRandNumberArray: number[] = []

   while (uniqueRandNumberArray.length < rowCount) {
      const r = Math.floor(Math.random() * Math.floor(899999999)) + 100000000
      if (uniqueRandNumberArray.indexOf(r) === -1) {
         uniqueRandNumberArray.push(r)
      }
   }
   for (let i = 0; i < rowCount; i += 1) {
      const SS: string = uniqueRandNumberArray[i].toString()
      yield `${SS.substr(0, 3)}-${SS.substr(3, 2)}-${SS.substr(5, 4)}`
   }
}

const getFirstnames = async (url: string): Promise<TFirstName[]> => {
   const r: TFirstName[] = await fetch(url, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
         const rows: TFirstName[] = data

         return rows
      })
      .catch((err) => {
         // eslint-disable-next-line no-console
         console.error(`no database >>> ${err}`)
         throw err
      })
   return r
}

const getLastnames = async (url: string): Promise<TLastName[]> => {
   const r: TLastName[] = await fetch(url, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
         const rows: TLastName[] = data

         return rows
      })
      .catch((err) => {
         // eslint-disable-next-line no-console
         console.error(`no database >>> ${err}`)
         throw err
      })
   return r
}
