import { createTheme, type ThemeOptions } from '@mui/material'
import { type TypographyStyleOptions } from '@mui/material/styles/createTypography'

declare module '@mui/material/styles' {
  interface Palette {
    buttonGray: Palette['primary']
  }

  interface PaletteOptions {
    buttonGray?: PaletteOptions['primary']
  }

  interface TypographyVariants {
    tabLabel: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    tabLabel?: TypographyStyleOptions
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    tabLabel: false
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    buttonGray: true
  }
}

const theme: ThemeOptions = {
  typography: {
    fontFamily: '"Source Sans 3", serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 360,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      // textTransform: 'uppercase',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '.875rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '.875rem',
      fontWeight: 400,
    },
    caption: {
      fontSize: '.75rem',
      fontWeight: 400,
    },
    tabLabel: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '123.5%',
      letterSpacing: '-0.18px',
    },
  },

  palette: {
    primary: {
      main: '#EB7826',
    },
    secondary: {
      light: '#344054',
      main: '#052441',
    },
    buttonGray: {
      main: '#D0D5DD',
    },
    text: {
      primary: '#334150',
      secondary: '#00000099',
    },
    success: {
      main: '#2E7D32',
      light: '#4CAF50',
    },
    divider: '#D9D9D9',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1060,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            color: '#fff',
          },
        },
        {
          props: { variant: 'outlined', color: 'buttonGray' },
          style: ({ theme }) => ({
            color: theme.palette.secondary.light,
          }),
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            backgroundColor: '#EBEBEB',
            color: '#000',
            ':hover': {
              backgroundColor: '#CCCCCC',
            },
          },
        },
      ],
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',
          borderRadius: 6,
          '& MuiButtonBase-root-MuiTab-root.Mui-selected': {
            color: theme.palette.secondary.main,
          },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          fontWeight: 600,
          borderRadius: '6px',
          padding: '2px 6px',
          boxShadow: '0px 1px 2px 0px #D0D5DD',
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: 'filled' },
          style: {
            backgroundColor: '#F9FAFB',
            border: '1px solid #D9D9D9',
            borderRadius: '10px',
            height: 50,
            '& .MuiInputBase-root': {
              height: 50,
              borderRadius: '8px',
            },
            '& .MuiInputBase-input': {
              padding: 0,
            },
            '& .MuiSvgIcon-root': {
              marginRight: 12,
            },
          },
        },
      ],
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
        // InputProps: {
        //   disableUnderline: true,
        // },
      },
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiInputLabel-root': {
            position: 'relative',
            transform: 'initial !important',
            fontSize: '.75rem',
            fontWeight: 400,
            color: theme.palette.text.primary,
            marginBottom: 2,
          },
        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: ({ theme }) => ({
          '&::placeholder': {
            color: theme.palette.text.secondary,
            opacity: 1,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          height: 40,
          borderRadius: 5,
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 1,
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            top: 0,
            '& legend': {
              display: 'none',
            },
          },
        },
        notchedOutline: {
          borderColor: '#bfbfbf',
          '&:hover': {
            borderColor: '#999999',
          },
          '&.Mui-focused': {
            borderWidth: 1,
          },
        },
        multiline: {
          padding: '6px 0',
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          gap: 4,
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: 0,
          color: '#D8D8D8',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          width: '100%',
          borderRadius: '20px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },

    MuiTabs: {
      defaultProps: {
        indicatorColor: 'primary',
      },
      styleOverrides: {
        root: {
          minHeight: 'unset',
          '& .MuiTabs-indicator': {
            height: '4px',
          },
          '& .MuiTabs-flexContainer': {
            gap: 16,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'capitalize',
          padding: '2px 18px 4px',
          minHeight: 'unset',
          ...theme.typography.tabLabel,
          color: theme.palette.text.primary + '!important',
        }),
      },
    },
  },
}

export default createTheme(theme)

