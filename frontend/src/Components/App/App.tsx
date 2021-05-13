/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import env from '../Login/Env'
import getCsrfToken from '../Login/getCsrfToken'
import Login from '../Login/Login'
import RandomValues from '../RandomNames/RandomNames'
import RestCrud from '../RestCrud/RestCrud'
import RestViewGrid from '../RestFormGrid/RestFormGrid'
import './App.css'
import useToken from './useToken'

function App() {
   const { token, setToken } = useToken()
   const [minLine, setMinLine] = useState(0)

   const [fileToRead, setFileToRead] = useState<File>()

   if (!token) {
      return <Login setToken={setToken} />
   }

   const handleMinLineChange = (e: React.ChangeEvent<{ value: number }>) => {
      e.preventDefault()
      setMinLine(e.target.value)
      if (fileToRead) {
         readSomeLines(fileToRead, e.target.value)
      }
   }

   const handleFileChange = async (e: any) => {
      e.preventDefault()

      setFileToRead(e.target.files[0])
      readSomeLines(e.target.files[0], minLine)
   }

   const readSomeLines = (theFile: File, min: number): void => {
      const parser = new DOMParser()
      const reader = new FileReader()
      let isLastname = true
      if (theFile) {
         reader.readAsText(theFile)
         isLastname = theFile.name.includes('last')
      } else {
         return
      }

      const save = async (data: any, line: number) => {
         let baseUrl = '/api/firstname/'
         if (isLastname) {
            baseUrl = '/api/lastname/'
         }

         const url = `${env().API_HOST + baseUrl}`
         const method = 'POST'

         const requestOptions = {
            method,
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': await getCsrfToken() },
            body: JSON.stringify(data),
         }

         try {
            await fetch(url, requestOptions)
         } catch (error) {
            console.log(line)
         }
      }

      const toInt = (v: any): number => {
         const myInt: string = v || '0'

         return parseInt(myInt.replaceAll(',', ''), 10)
      }

      const toProper = (v: any): string => {
         const myString: string = v || ''

         return myString
            .split(' ')
            .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
            .join(' ')
      }

      reader.onload = async (pe: any) => {
         if (pe.target.result) {
            const lines = pe.target.result.split('\n')
            for (let line = 0; line < lines.length; line += 1) {
               const doc = parser.parseFromString(lines[line], 'text/xml')
               // eslint-disable-next-line no-constant-condition
               if (isLastname) {
                  try {
                     const lastname = {
                        surName: toProper(doc.children[0].children[0].textContent),
                        rank: toInt(doc.children[0].children[1].textContent),
                        recentCount: toInt(doc.children[0].children[4].textContent),
                        minRange: 0,
                        maxRange: 0,
                     }
                     //    if (line >= min && line <= min + 400) {
                     if (line >= min) {
                        // eslint-disable-next-line no-await-in-loop
                        await save(lastname, line)
                     }
                  } catch (error) {
                     console.log('do nothing')
                  }
               } else {
                  try {
                     const firstname = {
                        givenName: toProper(doc.children[0].children[2].textContent),
                        gender: doc.children[0].children[3].textContent,
                        rank: toInt(doc.children[0].children[1].textContent),
                        recentCount: toInt(doc.children[0].children[4].textContent),
                        minRange: 0,
                        maxRange: 0,
                     }
                     //   if (line >= min && line <= min + 400) {
                     if (line >= min) {
                        await save(firstname, line)
                     }
                  } catch (error) {
                     console.log('do nothing')
                  }
               }
            }
         }
      }
   }

   return (
      <div className="wrapper">
         <BrowserRouter>
            <Switch>
               <Route path="/rest_grid">
                  <Grid container direction="row" style={{ background: 'grey', flexGrow: 1 }}>
                     <Grid sm={8} xs={12} style={{ minHeight: '400px' }} item>
                        <RestViewGrid url={`${env().API_HOST}/api/`} columns={[]} rows={[]} />
                     </Grid>
                  </Grid>
               </Route>
               <Route path="/random_names">
                  <RandomValues url={`${env().API_HOST}/api/`} />
               </Route>
               <Route path="/rest_form">
                  <RestCrud />
               </Route>
               <Route path="/read_file">
                  <FormControl>
                     <InputLabel id="demo-simple-select-label">minLine</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={minLine}
                        onChange={handleMinLineChange}>
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={400}>400</MenuItem>
                        <MenuItem value={800}>800</MenuItem>
                        <MenuItem value={1200}>1200</MenuItem>
                        <MenuItem value={1600}>1600</MenuItem>
                        <MenuItem value={2000}>2000</MenuItem>
                        <MenuItem value={2400}>2400</MenuItem>
                     </Select>
                  </FormControl>
                  <input type="file" name="file" id="file" onChange={handleFileChange} />
                  <RandomValues url={`${env().API_HOST}/api/`} />
               </Route>
            </Switch>
         </BrowserRouter>
      </div>
   )
}

export default App
