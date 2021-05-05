/* eslint-disable react/no-array-index-key */
import {
   AppBar,
   Box,
   Button,
   createStyles,
   FormControl,
   FormGroup,
   Grid,
   GridContentAlignment,
   GridDirection,
   GridItemsAlignment,
   GridJustification,
   GridSize,
   GridSpacing,
   InputLabel,
   makeStyles,
   MenuItem,
   Paper,
   Select,
   Tab,
   Tabs,
   TextField,
   Theme,
   Typography,
   withWidth,
   WithWidth,
} from '@material-ui/core'
import { LoremIpsum } from 'lorem-ipsum'
import React, { useState } from 'react'

const lorem = new LoremIpsum({
   sentencesPerParagraph: {
      max: 8,
      min: 4,
   },
   wordsPerSentence: {
      max: 16,
      min: 4,
   },
})

const BoxBuilder = (props: WithWidth) => {
   type myBox = {
      color: string
      height: number
      boxWidth: number
   }

   const sizeItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto', 'true']
   const spacingItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   const justifyItems = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']
   const alignContentItems = ['stretch', 'flex-start', 'center', 'flex-end', 'space-around', 'space-between']
   const alignItemsItems = ['stretch', 'flex-start', 'center', 'flex-end', 'baseline']

   const { width } = props

   const [height, setHeight] = useState(75)
   const [boxWidth, setWidth] = useState(200)
   const [color, setColor] = useState('red')
   const [value, setValue] = useState(0)
   const [boxList, addBox] = useState<myBox[]>()
   const [xs, setXs] = useState<GridSize>(12)
   const [sm, setSm] = useState<GridSize>(6)
   const [md, setMd] = useState<GridSize>(4)
   const [lg, setLg] = useState<GridSize>(3)
   const [xl, setXl] = useState<GridSize>(2)
   const [direction, setDirection] = useState<GridDirection>('row')
   const [justify, setJustify] = useState<GridJustification>('flex-start')
   const [alignContent, setAlignContent] = useState<GridContentAlignment>('stretch')
   const [alignItems, setAlignItems] = useState<GridItemsAlignment>('stretch')
   const [spacing, setSpacing] = useState<GridSpacing>(1)

   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue)
   }

   const handleAlignItemsChange = (event: any) => {
      const newValue = event.target.value as GridItemsAlignment
      setAlignItems(newValue)
   }

   const handleAlignContentChange = (event: any) => {
      const newValue = event.target.value as GridContentAlignment
      setAlignContent(newValue)
   }

   const handleJustifyChange = (event: any) => {
      setJustify(event.target.value as GridJustification)
   }

   const handleDirectionChange = (event: any) => {
      setDirection(event.target.value as GridDirection)
   }

   const handleSpacingChange = (event: any) => {
      setSpacing(event.target.value as GridSpacing)
   }

   const handleSizeChange = (event: any) => {
      const newSize: GridSize = event.target.value

      switch (event.target.name) {
         case 'xs':
            setXs(newSize)
            break
         case 'sm':
            setSm(newSize)
            break
         case 'md':
            setMd(newSize)
            break
         case 'lg':
            setLg(newSize)
            break
         case 'xl':
            setXl(newSize)
            break

         default:
            break
      }
   }

   const getSizePx = (size: number) => {
      return size.toString().concat('px')
   }

   const handleHeightChange = (e: any) => {
      setHeight(parseInt(e.target.value, 10))
   }

   const handleWidthChange = (e: any) => {
      setWidth(parseInt(e.target.value, 10))
   }

   const handleColorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setColor(event.target.value as string)
   }

   const handleSubmit = () => {
      const newBox: myBox = { color, height, boxWidth }
      addBox((prev) => {
         if (prev) {
            return prev.concat(newBox)
         }
         return [newBox]
      })
   }

   const handleClear = () => {
      addBox([])
   }

   const useStyles = makeStyles((theme: Theme) =>
      createStyles({
         root: {
            padding: '0px',
         },
         form: {
            marginBottom: theme.spacing(2),
            marginRight: theme.spacing(2),
            minWidth: '215px',
         },
         data: {
            marginBottom: theme.spacing(2),
            minHeight: '400px',

            color: theme.palette.text.secondary,
         },
         dataPaper: {
            marginBottom: theme.spacing(2),
            minHeight: '400px',
            background: theme.palette.text.hint,
         },
         formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
         },
         sizeControl: {
            margin: theme.spacing(1),
            minWidth: '60px',
         },
         alignControl: {
            margin: theme.spacing(1),
            minWidth: '110px',
         },
         primaryPaper: {
            background: theme.palette.primary.main,
         },
         mockCode: {
            overflow: 'auto',
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.contrastText,
         },
         selectEmpty: {
            marginTop: theme.spacing(2),
         },
      })
   )
   const classes = useStyles()

   return (
      <div>
         <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
               <Tab label="Demo" />
               <Tab label="Instalation" />
               <Tab label="Usage" />
            </Tabs>
         </AppBar>
         {value === 0 ? (
            <div>
               <FormGroup>
                  <Grid container direction="column">
                     <Grid container direction="row">
                        <Grid item xs={2}>
                           <TextField
                              type="number"
                              id="height"
                              key="height"
                              label="Height"
                              value={height}
                              onChange={handleHeightChange}
                              variant="filled"
                              fullWidth={false}
                              InputLabelProps={{ shrink: true }}
                           />
                        </Grid>
                        <Grid item xs={2}>
                           <TextField
                              type="number"
                              id="width"
                              key="width"
                              label="Width"
                              value={boxWidth}
                              onChange={handleWidthChange}
                              variant="filled"
                              fullWidth={false}
                              InputLabelProps={{ shrink: true }}
                           />
                        </Grid>
                        <Grid item xs={2}>
                           <FormControl className={classes.formControl}>
                              <InputLabel id="demo-simple-select-label">Color</InputLabel>
                              <Select
                                 labelId="demo-simple-select-label"
                                 id="demo-simple-select"
                                 value={color}
                                 onChange={handleColorChange}>
                                 <MenuItem value="red">Red</MenuItem>
                                 <MenuItem value="purple">Purple</MenuItem>
                                 <MenuItem value="green">Green</MenuItem>
                                 <MenuItem value="blue">Blue</MenuItem>
                              </Select>
                           </FormControl>
                        </Grid>
                     </Grid>
                     <Grid container direction="row">
                        <Button variant="contained" size="small" onClick={handleSubmit} color="primary">
                           Add Box
                        </Button>
                        <Button variant="contained" size="small" onClick={handleClear} color="secondary">
                           Clear
                        </Button>
                     </Grid>
                  </Grid>
               </FormGroup>
               <Grid container justify="flex-start" direction="row">
                  <Grid item xs={3}>
                     <FormControl fullWidth className={classes.alignControl}>
                        <InputLabel>Direction</InputLabel>
                        <Select value={direction} onChange={handleDirectionChange}>
                           <MenuItem value="row">row</MenuItem>
                           <MenuItem value="column">column</MenuItem>
                           <MenuItem value="row-reverse">row-reverse</MenuItem>
                           <MenuItem value="column-reverse">column-reverse</MenuItem>
                        </Select>
                     </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                     <FormControl className={classes.sizeControl}>
                        <InputLabel>Spacing</InputLabel>
                        <Select id="spacing" name="spacing" value={spacing} onChange={handleSpacingChange}>
                           {spacingItems.map((item) => (
                              <MenuItem value={item}>{item}</MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Grid>
               </Grid>
               <Grid container justify="flex-start" direction="row">
                  <Grid item xs={4}>
                     <FormControl fullWidth className={classes.alignControl}>
                        <InputLabel>justify</InputLabel>
                        <Select value={justify} onChange={handleJustifyChange}>
                           {justifyItems.map((item) => (
                              <MenuItem value={item}>{item}</MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                     <FormControl fullWidth className={classes.alignControl}>
                        <InputLabel>alignContent</InputLabel>
                        <Select value={alignContent} onChange={handleAlignContentChange}>
                           {alignContentItems.map((item) => (
                              <MenuItem value={item}>{item}</MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                     <FormControl fullWidth className={classes.alignControl}>
                        <InputLabel> AlignItems</InputLabel>
                        <Select value={alignItems} onChange={handleAlignItemsChange}>
                           {alignItemsItems.map((item) => (
                              <MenuItem value={item}>{item}</MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Grid>
               </Grid>

               <Grid container justify="flex-start" direction="row">
                  <Grid item xs={2}>
                     <FormControl className={classes.sizeControl}>
                        <InputLabel>xs</InputLabel>
                        <Select id="xs" name="xs" value={xs} onChange={handleSizeChange}>
                           {sizeItems.map((item) => (
                              <MenuItem value={item}>{item}</MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Grid>
                  <Grid item sm={2}>
                     <FormControl className={classes.sizeControl}>
                        <InputLabel>sm</InputLabel>
                        <Select id="sm" name="sm" value={sm} onChange={handleSizeChange}>
                           {sizeItems.map((item) => (
                              <MenuItem value={item}>{item}</MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                     <FormControl className={classes.sizeControl}>
                        <InputLabel>md</InputLabel>
                        <Select id="md" name="md" value={md} onChange={handleSizeChange}>
                           {sizeItems.map((item) => (
                              <MenuItem value={item}>{item}</MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                     <FormControl className={classes.sizeControl}>
                        <InputLabel>lg</InputLabel>
                        <Select id="lg" name="lg" value={lg} onChange={handleSizeChange}>
                           {sizeItems.map((item) => (
                              <MenuItem value={item}>{item}</MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                     <FormControl className={classes.sizeControl}>
                        <InputLabel>xl</InputLabel>
                        <Select id="xl" name="xl" value={xl} onChange={handleSizeChange}>
                           {sizeItems.map((item) => (
                              <MenuItem value={item}>{item}</MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Grid>
               </Grid>
               <Paper className={classes.mockCode}>
                  <Typography style={{ fontSize: 14 }} variant="subtitle1">
                     <pre>
                        <code>
                           {`<Grid container direction="${direction}" justify="${justify}" alignContent="${alignContent}" alignItems="${alignItems}" spacing={${spacing}}>`}
                           <br />
                           {`    <Grid item xs={${xs}} sm={${sm}} md={${md}} lg={${lg}} xl={${xl}}> ...</Grid>`}
                           <br />
                           {`    ...`}
                           <br />
                           {`</Grid>`}
                        </code>
                     </pre>
                  </Typography>
               </Paper>
               <Paper className={classes.primaryPaper}>
                  <Typography style={{ textAlign: 'center' }} variant="subtitle1">
                     Current width: {width}
                  </Typography>
               </Paper>

               <Grid
                  container
                  direction={direction}
                  justify={justify}
                  alignContent={alignContent}
                  spacing={spacing}
                  alignItems={alignItems}>
                  {boxList?.map((item, index) => (
                     <Grid item xs={xs} sm={sm} md={md} lg={lg} key={index}>
                        <Box
                           style={{ minWidth: getSizePx(item.boxWidth) }}
                           m={0}
                           bgcolor={item.color}
                           p={2}
                           color="text.primary">
                           <Typography>
                              Box ({index}) minWidth: {getSizePx(item.boxWidth)}{' '}
                           </Typography>
                           <Paper style={{ overflow: 'auto', height: getSizePx(item.height) }}>
                              {lorem.generateWords(50)}
                           </Paper>
                        </Box>
                     </Grid>
                  ))}
               </Grid>
            </div>
         ) : null}
         {value === 1 ? <Typography>To Do: Instalation</Typography> : null}
         {value === 2 ? <Typography>To Do: Usage</Typography> : null}
      </div>
   )
}
export default withWidth()(BoxBuilder)
