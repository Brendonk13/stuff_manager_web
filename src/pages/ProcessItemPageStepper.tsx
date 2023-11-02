import ProcessItemStepper from "@/components/processItem/processItemStepper"

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { useSearchParams } from "react-router-dom"

// const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

// const steps = ['Actionable', 'Multi-Step', 'Priority']
const steps = [
  {label: 'Actionable', completed: false,},
  {label: 'Multi-Step', completed: false,},
  {label: 'Priority', completed: false,},
]

export default function ProcessItemPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  // const [searchParams, setSearchParams] = useSearchParams()

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    // todo: validate that they can go to the next step (each step should be a form)
    // mark this step as completed
    const currentStep = steps[activeStep]
    if (currentStep){
      currentStep.completed = true
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepClicked = (clickedIdx: number) => {
    // console.log("step clicked: ", steps[clickedIdx])
    // if we have completed the step before this, then allow clicking
    if (clickedIdx === 0 || steps[clickedIdx-1]?.completed){
      setActiveStep(clickedIdx)
    }
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const showCorrectForm = () => {
    const currentStep = steps[activeStep]
    if (!currentStep){
      throw Error("currentStep broke bad")
    }
    if (currentStep.label === "Actionable"){
      return <Typography variant="h2"> Actionable </Typography>
    } else if (currentStep.label === "Multi-Step"){

      return <Typography variant="h2"> Multi-Step </Typography>
    } else if (currentStep.label === "Priority"){
      return <Typography variant="h2"> Priority </Typography>
    }

  }

  return (
    <Box sx={{ width: '100%' }}>
      <ProcessItemStepper steps={steps} activeStep={activeStep} handleStepClicked={handleStepClicked}/>
      {/* <Stepper activeStep={activeStep}> */}
      {/*   {steps.map((label, index) => { */}
      {/*     const stepProps: { completed?: boolean } = {}; */}
      {/*     const labelProps: { */}
      {/*       optional?: React.ReactNode; */}
      {/*     } = {}; */}
      {/*     if (isStepOptional(index)) { */}
      {/*       labelProps.optional = ( */}
      {/*         <Typography variant="caption">Optional</Typography> */}
      {/*       ); */}
      {/*     } */}
      {/*     if (isStepSkipped(index)) { */}
      {/*       stepProps.completed = false; */}
      {/*     } */}
      {/*     return ( */}
      {/*       <Step key={label} {...stepProps}> */}
      {/*         <StepLabel {...labelProps}>{label}</StepLabel> */}
      {/*       </Step> */}
      {/*     ); */}
      {/*   })} */}
      {/* </Stepper> */}

      {/* last step only */}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>

      ) : (
        <React.Fragment>
          {/* Other Steps */}
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
            <Box>
              {showCorrectForm()}
            </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
