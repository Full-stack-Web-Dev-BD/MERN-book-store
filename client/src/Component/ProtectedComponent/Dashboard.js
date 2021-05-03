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
import { Button, Card, CardActionArea, CardContent, Input } from '@material-ui/core';
import AuthButton from './AuthButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import BookCard from './BookCard';
import Axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';



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

const  Dashboard=(props)=> {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [allBook, setAllBook] = useState([])
    const [keyword, setKeyword] = useState('')
    const [textTitle, setTextTitle] = useState('Home')
    const [isDetails, setIsDetails] = useState(false)
    const [book, setBook] = useState({})
    const [cartProduct, setCartProduct] = useState([])
    const [orderQ, setOrderQ] = useState()
    const [tq, setTq] = useState(0)

    
    
    useEffect(() => {
        setCartProduct(reactLocalStorage.getObject('cart'))
        
        let  cp= reactLocalStorage.getObject('cart').cart
        if(cp){
            let x=0
            cp.map(el=>{
                x=parseInt(x)+ parseInt(el.qt)
                setTq(x)
            })
        }else{
             console.log('done')
        }
        
        Axios.get('/getallbook')
            .then(res => {
                setAllBook(res.data)
                console.log('data',res.data)
            })
    }, [])

    const serachByCategory = (catText) => {
        Axios.post('/searchcategory', { category: catText })
            .then(res => {
                setAllBook(res.data)
                setTextTitle(`Search Result for " ${catText} "`)
                setIsDetails(false)
            })
    }
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const sort = () => {
        const sorted = allBook.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
        setAllBook(sorted)
        setTextTitle(`Sorted By Price `)
        setIsDetails(false)
    }
    const search = (e) => {
        e.preventDefault()
        Axios.post('/search', { text: keyword })
            .then(res => {
                setTextTitle(`Search Result for " ${keyword} "`)
                setAllBook(res.data)
            })
    }
    const bookSetter = (el) => {
        setBook(el)
        setIsDetails(true)
    }

    const addToCart=()=>{
        book.qt=orderQ
        let ex=reactLocalStorage.getObject('cart')
        if (!ex.cart){
           return reactLocalStorage.setObject('cart',{cart:[book]})
        }else{
            let allCB=[...ex.cart,book]
           return reactLocalStorage.setObject('cart',{cart:allCB})
        }
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
                        <a href="/cart">
                            <Button variant="contained" color="primary"> <AddShoppingCartIcon />  ( {tq} )  </Button>
                        </a>
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
                {
                    isDetails ?
                        <div>
                            <h3 className="text-info" style={{ textDecoration: 'underline' }}> <a href="/">Home</a> > {book.BookName}</h3>
                            <div className="col-md-6 offset-md-3">
                                <form onSubmit={()=>addToCart()} style={{ display: 'inherit' }} className="mb-5">
                                    <Input  type='number' required onChange={e => { setOrderQ(e.target.value) }} style={{ background: 'white', padding: '0 20px', marginRight: '20px' }} placeholder="Order 0" />
                                    <Button variant="contained" type="submit" color="primary"    > Add to Cart</Button>
                                </form>
                                <Card >
                                    <CardActionArea>
                                        <img style={{ width: '100%', height: '400px' }} src={`/Image/${book.Img}`} />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">{book.BookName}</Typography>
                                            {
                                                book.NewArrival === "Yes" ?
                                                    <h6 className="text-danger  "> New Arrival !!! </h6> : ''
                                            }
                                            <p style={{ margin: '0' }}> Author : {book.Author} </p>
                                            <p style={{ margin: '0' }}> Published : {book.Published} </p>
                                            <p style={{ margin: '0' }}> Publisher : {book.Publisher} </p>
                                            <p style={{ margin: '0' }}> Category : {book.Category} </p>
                                            <p style={{ margin: '0' }}> Language : {book.Lang} </p>
                                            <p style={{ margin: '0' }}> Description : {book.Description} </p>
                                            <p style={{ margin: '0' }}> Price : $ {book.Price} </p>

                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </div>
                        :
                        <div>
                            <h3 className="text-info" style={{ textDecoration: 'underline' }}>{textTitle}</h3>
                            <hr />
                            <div className="row">
                                {
                                    allBook.map(el => {
                                        return (
                                            <div className="col-xs-12 col-sm-6  col-md-4 mb-5">
                                                <span onClick={() => bookSetter(el)}>
                                                    <BookCard book={el} />
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    allBook.length < 1 ?
                                        <h1 className="pt-5 pt-5  text-warning text-center ">Not found</h1> : ''
                                }
                            </div>
                        </div>
                }
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
