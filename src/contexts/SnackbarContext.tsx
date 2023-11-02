import { type AlertProps } from '@mui/material/Alert'
import { createContext, type ReactNode, useContext, useState } from 'react'

import Snackbar from '@/components/common/Snackbar'

interface SnackbarOptions {
  open?: boolean
  message?: string
  autoHideDuration?: number
  type?: 'error' | 'warning' | 'info' | 'success'
  AlertProps?: AlertProps
}

export interface ISnackbarContext {
  snackbar: SnackbarOptions
  openSnackbar: (snackbarOptions: SnackbarOptions) => void
}
const SnackbarContext = createContext<ISnackbarContext>({} as ISnackbarContext)

function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarOptions>({
    open: false,
    message: 'There was an error',
    autoHideDuration: 3000,
  })

  const openSnackbar = ({
    open = true,
    ...snackbarOptions
  }: SnackbarOptions) => {
    setSnackbar((currentSnackbar) => ({
      ...currentSnackbar,
      ...snackbarOptions,
      open,
    }))
  }

  return (
    <SnackbarContext.Provider
      value={{
        snackbar,
        openSnackbar,
      }}
    >
      {children}
      <Snackbar />
    </SnackbarContext.Provider>
  )
}

function useSnackbarContext(): ISnackbarContext {
  const snackbarContext = useContext(SnackbarContext)
  if (snackbarContext === undefined) {
    throw new Error('useSnackbarContext must be used within a SnackbarProvider')
  }
  return snackbarContext
}

export { SnackbarProvider, useSnackbarContext }

