import { AppBar, Button, Card, CardHeader, IconButton, Toolbar, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import {reactLocalStorage} from 'reactjs-localstorage';

const CheckoutPage = () => {
    const [totalPrice, setTotalPrice] = useState(0)

    const [cartProduct, setCartProduct] = useState([])

    // form  filed
    const [fullName, setFullName] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [adl1, setAdl1] = useState('')
    const [adl2, setAdl2] = useState('')
    const [city, setCity] = useState('')
    const [rsD, setRsD] = useState('')
    const [country, setCountry] = useState('')
    const [pz, setPz] = useState('')
    

    // invoice data
    const [invoice, setInvoice] = useState({})
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
    const submitHandler=(e)=>{
        e.preventDefault()
        let obj={ 
            totalPrice,
            fullName,
            companyName,
            adl1,
            adl2,
            city,
            rsD,
            country,
            pz,
        }
        Axios.post('/checkout',obj)
        .then(res=>{
            setInvoice(res.data)
            document.getElementById('exid').click()
            setTimeout(() => {
                reactLocalStorage.clear()
            }, 3000);
        })
    }


    return (
        <div>
                <button type="button" class="btn btn-primary sr-only" data-toggle="modal" data-target="#exampleModal" id="exid">check out  button </button>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Invoice </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Full Name : { invoice.fullName}</p>
                        <p>Company: { invoice.companyName}</p>
                        <p>Address Line 1 : { invoice.adl1}</p>
                        <p>Address Line 2: { invoice.adl2}</p>
                        <p>City : { invoice.city}</p>
                        <p>Regoin : { invoice.rsD}</p>
                        <p>Country : { invoice.country}</p>
                        <p>Postcode : { invoice.pz}</p>
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
                        <h3 className="">   Total Price : HKS {totalPrice}   </h3>
                        <p className="text-success alert alert-success">Thanks for ordering . Your books will be delivered within 7  working  days .</p>
                    </div>
                    <div class="modal-footer">
                        <a href="/" type="button" class="btn btn-secondary" data-dismiss="modal" >Thank you </a>
                    </div>
                    </div>
                </div>
                </div>
            <AppBar position="static">
                <div className="col-md-8 offset-md-2">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                        </IconButton>
                        <Typography variant="h6">Checkout Page</Typography>

                        <div className="ml-5 pl-5">
                            <Button className="sr-only"> </Button>
                            <Button variant="contained" color="primary" onClick={()=>{ window.history.back() }}>Back</Button>
                        </div>
                    </Toolbar>
                </div>
            </AppBar> 
                <div className="container mt-3">
                    <div className="row"> 
                    <div className="mt-1 col-md-8 "> 
                        <h3 className="">My  Cart  <h5>(Total Price {totalPrice} ) </h5> </h3>
                        <hr/>
                        <h5>Delivery Address</h5>
                        <form onSubmit={e=>submitHandler(e)}>
                            <lebel>Full Name</lebel>
                            <input className="form-control" required onChange={e=>{setFullName(e.target.value)}} placeholder="Full Name" />
                            <lebel>Company Name</lebel>
                            <input className="form-control" onChange={e=>{setCompanyName(e.target.value)}} placeholder="Company Name" />
                            <lebel>Address Line 1</lebel>
                            <input className="form-control" required onChange={e=>{setAdl1(e.target.value)}} placeholder="Address Line 1" />
                            <lebel>Address Line 2</lebel>
                            <input className="form-control" onChange={e=>{setAdl2(e.target.value)}} placeholder="Address Line 2" />
                            <lebel>City</lebel>
                            <input className="form-control" required onChange={e=>{setCity(e.target.value)}} placeholder="City" />
                            <lebel>Regoin/State/District</lebel>
                            <input className="form-control" onChange={e=>{setRsD(e.target.value)}} placeholder="Regoin/State/District" />
                            <lebel>Country</lebel>
                            <input className="form-control" required onChange={e=>{setCountry(e.target.value)}} placeholder="Country" />
                            <lebel>Postal/Zip Code</lebel>
                            <input className="form-control" required onChange={e=>{setPz(e.target.value)}} placeholder="Postal/Zip Code" />
                            <button className="btn btn-success mt-5"> Confirm </button>
                        </form>
                    </div>
                    <div className="col-md-4">
                        <h5>Your Order  <a href="/">Change</a> </h5>
                        <h3>Free Standard Shipping</h3>
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
                        <hr/>
                        <h3 className="">   Total Price : HKS {totalPrice}   </h3>

                    </div>
                    </div>
                </div>
        </div>
    )
}

export default CheckoutPage
