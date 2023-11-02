import './styles/globals.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { SnackbarProvider } from '@/contexts/SnackbarContext'

import Router from './router'
import theme from './theme'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </LocalizationProvider>
    </SnackbarProvider>
  </ThemeProvider>,
)


// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <ThemeProvider theme={theme}>
//     <CssBaseline />
//     <SnackbarProvider>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <ClerkProvider publishableKey={clerkPK}>
//           <QueryClientProvider client={queryClient}>
//             <Router />
//           </QueryClientProvider>
//         </ClerkProvider>
//       </LocalizationProvider>
//     </SnackbarProvider>
//   </ThemeProvider>,
// )

