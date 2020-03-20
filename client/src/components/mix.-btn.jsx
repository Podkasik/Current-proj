import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

class Landing extends Component{
    logOut(e){
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }

    render(){
        const classes = makeStyles(theme=>({
            root:{
                flexGrow:1,

            },
            menuButton: {
                marginRight: theme.spasing(2),
            },
            title: {
                flexGrow: 1,
            }
        }))

        const loginRegLink =(
            <div className={classes.root}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" className="classes.title">
                        <Link to="login" className="nav-link">
                            Вход
                        </Link>
                    </Typography>
                    <Typography variant="h6" color="inherit" className="classes.title">
                        <Link to="register" className="nav-link">
                            Регистрация
                        </Link>
                    </Typography>
                </Toolbar>
            </div>
        )

        const userLink = (
            <div>
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        <Link to="profile" className="nav-link">
                            Профиль
                        </Link>
                    </Typography>
                    <Typography variant="h6" color="inherit">
                        <Link to="logout" onClick={this.logOut.bind(this)} className="nav-link">
                            Выход
                        </Link>
                    </Typography>
                </Toolbar>
            </div>
        )
        
        return (
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        <Link to="/home" className="nav-link" color="inherit">
                            Главная
                        </Link>
                    </Typography>
                    {localStorage.usertoken ? userLink : loginRegLink}
                </Toolbar>
            </AppBar>
        )
    }
}

export default withRouter(Landing)