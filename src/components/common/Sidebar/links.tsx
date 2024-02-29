import { DateRange } from '@mui/icons-material'
import { type ReactNode } from 'react'

import nuHome from '@/assets/home.svg'
import StarIcon from '@mui/icons-material/Star'
import SummarizeIcon from '@mui/icons-material/Summarize'
import List from '@mui/icons-material/List'
import Task from '@mui/icons-material/Task'
import Assignment from '@mui/icons-material/Assignment'
// import ViewModuleIcon from '@muui/icons-material/ViewModule'

export interface ISidebarLink {
  text: string
  icon: ReactNode
  path: string
  hideText?: boolean
}

const sidebarLinks: ISidebarLink[] = [
  {
    text: 'Actions',
    icon: <Task />,
    path: '/actions',
  },
  {
    text: 'Projects',
    icon: <Assignment />,
    path: '/projects',
  },
  {
    text: 'Favorites',
    icon: <StarIcon />,
    path: '/favorites',
  },
  // {
  //   text: 'Calendar',
  //   icon: <DateRange />,
  //   path: '/calendar',
  // },
]
export default sidebarLinks
