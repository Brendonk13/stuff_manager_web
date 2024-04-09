import { useMediaQuery, useTheme } from "@mui/material"

export default function useGetBreakpoint(){

  const theme = useTheme()

  const mq_xs = useMediaQuery(theme.breakpoints.only('xs'))
  const mq_sm = useMediaQuery(theme.breakpoints.only('sm'))
  const mq_md = useMediaQuery(theme.breakpoints.only('md'))
  const mq_lg = useMediaQuery(theme.breakpoints.only('lg'))
  const mq_xl = useMediaQuery(theme.breakpoints.only('xl'))

  const getBreakPointName = () => {
    if(mq_xs)      return "xs"
    else if(mq_sm) return "sm"
    else if(mq_md) return "md"
    else if(mq_lg) return "lg"
    else if(mq_xl) return "xl"
  }

  return getBreakPointName()
}

