import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeCustomization from './themes';
import { CssBaseline } from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { SnackbarProvider } from '@/contexts/SnackbarContext'

import Router from './router'

const clerkPK = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY
const queryClient = new QueryClient()
// console.log({clerkPK})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeCustomization>
    <CssBaseline />
    <SnackbarProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ClerkProvider publishableKey={clerkPK}>
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </ClerkProvider>
      </LocalizationProvider>
    </SnackbarProvider>
  </ThemeCustomization>
)

// brendonk13.bk+stuff1@gmail.com
// TestPass12334$
// http://localhost:4000/actions?completed=false
