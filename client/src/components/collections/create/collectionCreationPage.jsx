import React from 'react'
import General from './collectionInformation'
//import Bonus from './bonusesInformation'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
//import AppBar from '@material-ui/core/AppBar'
//import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'


function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    )
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired
  }
  
  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={event => {
          event.preventDefault();
        }}
        {...props}
      />
    )
  }
  
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      marginTop: 50
    }
  }))
  
   function NavTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    function handleChange(event, newValue) {
      setValue(newValue)
    }
  
    return (       
        <div className={classes.root}>
            <TabContainer ><General/></TabContainer>
          </div>
    )
  }

  export default NavTabs