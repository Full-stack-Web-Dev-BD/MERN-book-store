import { AppBar, Button, Card, CardHeader, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import {reactLocalStorage} from 'reactjs-localstorage';

const CartPage = () => {
    const [cartProduct, setCartProduct] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        let  cp= reactLocalStorage.getObject('cart').cart
        if(cp){
            setCartProduct(cp)
            let  x=0
            cp.map(el=>{
                x=x+(el.Price*el.qt)
                setTotalPrice(x)
            })
            console.log(x)
        }else{
            return console.log('done')
        }
    },[])
    return (
        <div>
            <AppBar position="static">
                <div className="col-md-8 offset-md-2">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                        </IconButton>
                        <Typography variant="h6">Cart Page</Typography>

                        <div className="ml-5 pl-5">
                            <Button className="sr-only"> </Button>
                            <Button variant="contained" color="primary" onClick={()=>{ window.history.back() }}>Back</Button>
                            <a href="/checkout">
                                <Button variant="contained" color="primary">Checkout</Button>
                            </a>
                        </div>
                    </Toolbar>
                </div>
            </AppBar> 

            <div className="mt-5 col-md-6 offset-md-3"> 
                <h3 className="">My  Cart  <h5>(Total Price {totalPrice} ) </h5> </h3>
                <hr/>
                 {
                    cartProduct.map(el=>(
                        <Card className="mb-2">
                            <div className="p-3">
                                <h4>Book Name : {el.BookName}</h4>
                                <h6>Quantity : {el.qt}</h6>
                                <h6>Price Per Book: {el.Price}</h6>
                            </div>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default CartPage
