import { Link, StepLabel } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Step from '@material-ui/core/Step'
import StepContent from '@material-ui/core/StepContent'
import Stepper from '@material-ui/core/Stepper'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { linkData } from '../Stack/Stack'

const getLink = (label: string) => {
   return linkData.find((element) => element.linkLabel === label)
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         width: '100%',
      },
      button: {
         marginTop: theme.spacing(0),
         marginRight: theme.spacing(1),
      },
      actionsContainer: {
         marginBottom: theme.spacing(0),
      },
      resetContainer: {
         padding: theme.spacing(0),
      },
   })
)

function getSteps() {
   return ['Install VSCode', 'Install django', 'Install Rest', 'Node.js']
}

function getStepContent(step: number) {
   switch (step) {
      case 0:
         return (
            <div>
               <span>Install </span>
               <Link target="_blank" href={getLink('VSCode')?.link} color="inherit">
                  VSCode
               </Link>
               <span> it is a good editor. Most of the remaining steps can be done within VSCode</span>
            </div>
         )
      case 1:
         return (
            <div>
               <span>Use the </span>
               <Link target="_blank" href="https://docs.djangoproject.com/en/3.2/intro/install/" color="inherit">
                  django Quick Install Guide.
               </Link>
               <span>
                  {' '}
                  This will install Python and django. A database (SQLite) for your local host is included with the
                  instalation.
               </span>
            </div>
         )
      case 2:
         return (
            <div>
               <span>Use the </span>
               <Link target="_blank" href="https://www.django-rest-framework.org/#installation" color="inherit">
                  Rest framework.
               </Link>
               <span> instalation instructions.</span>
            </div>
         )
      default:
         return 'Unknown step'
   }
}

export default function GettingStarted() {
   const classes = useStyles()
   const [activeStep, setActiveStep] = React.useState(0)
   const steps = getSteps()

   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
   }

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
   }

   const handleJumpTo = (step: number) => {
      setActiveStep(activeStep === step ? -1 : step)
   }

   return (
      <div className={classes.root}>
         <Stepper activeStep={activeStep} nonLinear orientation="vertical">
            {steps.map((label, index) => (
               <Step key={label}>
                  <StepLabel>
                     <Button onClick={() => handleJumpTo(index)}>{label}</Button>
                  </StepLabel>
                  <StepContent>
                     <Typography>{getStepContent(index)}</Typography>
                     <div className={classes.actionsContainer}>
                        <div>
                           <Button
                              variant="contained"
                              size="small"
                              color="primary"
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              className={classes.button}>
                              Back
                           </Button>
                           <Button
                              variant="contained"
                              size="small"
                              color="primary"
                              onClick={handleNext}
                              className={classes.button}>
                              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                           </Button>
                        </div>
                     </div>
                  </StepContent>
               </Step>
            ))}
         </Stepper>
         {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
               <Typography>All steps completed - you&apos;re finished</Typography>
               <Button onClick={() => handleJumpTo(0)} className={classes.button}>
                  Reset
               </Button>
            </Paper>
         )}
      </div>
   )
}
