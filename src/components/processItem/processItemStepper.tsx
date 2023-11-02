import {
  Box,
  Step,
  StepButton,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import { type Key } from 'react'
import { type ProcessItemStep } from "@/types/ProcessItem"

// import CustomStepIcon from '@/components/contacts/ImportContacts/CustomStepIcon'

export default function ProcessItemStepper({
  activeStep,
  steps,
  handleStepClicked,
}: {
  activeStep: number
  steps: Array<ProcessItemStep>,
  handleStepClicked: (clickedIdx: number) => void,
}) {
  return (
    <Stepper
      activeStep={activeStep}
      nonLinear
      alternativeLabel
      sx={{ mb: 3, mt: 2 }}
      connector={
        <StepConnector
          sx={{
            '& .MuiStepConnector-line': {
              borderWidth: 3,
              borderRadius: 2,
            },
          }}
        />
      }
    >
      {steps.map(({label}, i) => {
        return (
          <Step key={label as Key} >
            <Box component={'span'}>
              <StepButton onClick={() => handleStepClicked(i)}>
                  <Typography variant="subtitle2">{label}</Typography>
              </StepButton>
            </Box>
          </Step>
        )
      })}
    </Stepper>
  )
}


