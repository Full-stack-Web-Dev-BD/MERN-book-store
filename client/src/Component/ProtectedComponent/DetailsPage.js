import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CategoryIcon from '@material-ui/icons/Category';
import { Button, Input } from '@material-ui/core';
import AuthButton from './AuthButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import BookCard from './BookCard';
import Axios from 'axios';

// Page name  Dashboard/


const drawerWidth = 240;





const logout = () => {
    window.localStorage.removeItem('st_app')
    window.location.reload()
}


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function Dashboard(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [allBook, setAllBook] = useState([])
    const [keyword, setKeyword] = useState('')
    const [textTitle, setTextTitle] = useState('Home')


    const serachByCategory = (catText) => {
        Axios.post('/searchcategory', { category: catText })
            .then(res => {
                setAllBook(res.data)
                setTextTitle(`Search Result for " ${catText} "`)

            })
    }


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const sort = () => {
        const sorted = allBook.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
        setAllBook(sorted)
        setTextTitle(`Sorted By Price `)
    }
    useEffect(() => {
        // const hr=qs.parse(window.location.href)

        // Axios.get(/getsingle/')
        //     .then(res => {
        //         console.log(res.data)
        //     })
    }, [])
    const search = (e) => {
        e.preventDefault()
        Axios.post('/search', { text: keyword })
            .then(res => {
                setTextTitle(`Search Result for " ${keyword} "`)
                setAllBook(res.data)
            })
    }
    // Sidebar
    const drawer = (
        <div>
            <div className={classes.toolbar} style={{ background: '#3f51b5' }} >
                <div style={{ color: 'white', paddingTop: '15px' }}>
                    <h3 className="text-center" >Book Store</h3>
                </div>
            </div>
            <Divider />
            <List>
                <ListItem button  >
                    <ListItemIcon><CategoryIcon /></ListItemIcon>
                    <ListItemText primary={"Category"} />
                </ListItem>
            </List>
            <Divider />
            <List>
                {["Storybook", "Contemporary Fiction", "Picture Book", "History"].map((text, index) => (
                    <ListItem onClick={() => serachByCategory(text)} style={{ textDecoration: 'underline' }} button key={text}>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}


            </List>
            <Divider />

            <Divider />
            <List>
                <ListItem onClick={() => sort()} button  >
                    <ListItemIcon> </ListItemIcon>
                    <ListItemText style={{ textDecoration: 'underline' }} primary="Sort  With Price" />
                </ListItem>
            </List>
            <Divider />
            <AuthButton />
            <List>
                {[].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <form onSubmit={search} style={{ display: 'inherit' }}>
                        <Input required onChange={e => { setKeyword(e.target.value) }} style={{ background: 'white', padding: '0 20px', marginRight: '20px' }} placeholder="Keyword (s)" />
                        <Button variant="contained" type="submit" color="primary"> Search</Button>
                    </form>
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <Button variant="contained" color="primary"> <AddShoppingCartIcon />  ( 0 )  </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h3 className="text-info" style={{ textDecoration: 'underline' }}>Book Details Page</h3>
                <hr />
                <div className="row">

                </div>
            </main>
        </div>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;
