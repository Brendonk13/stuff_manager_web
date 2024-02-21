import { IconButton, styled, type IconButtonProps } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled(
  (props: ExpandMoreProps) => {
    const { expand, ...other } = props
    return (
      <IconButton {...other}>
        <ExpandMoreIcon />
      </IconButton>
    )
})
(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  // marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))


export default ExpandMore
