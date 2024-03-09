import { DateRange } from '@mui/icons-material'
import { type ReactNode } from 'react'

import nuHome from '@/assets/home.svg'
import StarIcon from '@mui/icons-material/Star'
import SummarizeIcon from '@mui/icons-material/Summarize'
import List from '@mui/icons-material/List'
import Task from '@mui/icons-material/Task'
import Assignment from '@mui/icons-material/Assignment'
// import ViewModuleIcon from '@muui/icons-material/ViewModule'
// import NewReleasesIcon from '@mui/icons-material/NewReleases'; // nope
// import AddTaskIcon from '@mui/icons-material/AddTask'; // nope: this is not filled icon
// import PendingActionsIcon from '@mui/icons-material/PendingActions';  // nope: this is not filled icon
import FiberNewIcon from '@mui/icons-material/FiberNew'

export interface ISidebarLink {
  text: string
  icon: ReactNode
  path: string
  hideText?: boolean
}

const sidebarLinks: ISidebarLink[] = [
  {
    text: "Unprocessed",
    icon: <FiberNewIcon />,
    path: "/unprocessed",
  },
  // Actions:
  // import FeedIcon from '@mui/icons-material/Feed';
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
