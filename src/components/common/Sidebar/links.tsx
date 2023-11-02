import { DateRange } from '@mui/icons-material'
import { type ReactNode } from 'react'

import barChart from '@/assets/bar_chart.svg'
import currencyIcon from '@/assets/currency-dollar-circle.svg'
// import nuHome from '@/assets/home.svg'
import nuHome from '@/assets/home.svg'
import shareIcon from '@/assets/share.svg'
import usersIcon from '@/assets/users.svg'

export interface ISidebarLink {
  text: string
  icon: ReactNode
  path: string
  hideText?: boolean
}

const sidebarLinks: ISidebarLink[] = [
  {
    text: 'Dashboard',
    icon: <img src={nuHome} alt="dashboard" />,
    path: '/',
  },
  {
    text: 'Schedule',
    icon: <DateRange />,
    path: '/schedule',
  },
  {
    text: 'Channels',
    icon: <img src={shareIcon} alt="channels" />,
    path: '/channels',
  },
  {
    text: 'Contacts',
    icon: <img src={usersIcon} alt="contacts" />,
    path: '/contacts',
  },
  {
    text: 'Performance',
    icon: <img src={barChart} alt="performance" />,
    path: '/performance',
  },
  {
    text: 'Credits',
    icon: <img src={currencyIcon} alt="credits" />,
    path: '/credits',
  },
]
export default sidebarLinks
