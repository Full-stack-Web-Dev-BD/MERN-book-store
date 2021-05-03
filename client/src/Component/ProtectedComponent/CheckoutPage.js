import { AppBar, Button, Card, CardHeader, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import {reactLocalStorage} from 'reactjs-localstorage';

const CheckoutPage = () => {
    const [totalPrice, setTotalPrice] = useState(0)

    // form  filed
    const [fullName, setFullName] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [adl1, setAdl1] = useState('')
    const [adl2, setAdl2] = useState('')
    const [city, setCity] = useState('')
    const [rsD, setRsD] = useState('')
    const [country, setCountry] = useState('')
    const [pz, setPz] = useState('')
    
    useEffect(() => {
        let  cp= reactLocalStorage.getObject('cart').cart
        if(cp){
             let  x=0
            cp.map(el=>{
                x=x+el.Price
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
        console.log(obj)
    }
    return (
        <div>
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

            <div className="mt-1 col-md-6 offset-md-3"> 
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
        </div>
    )
}

export default CheckoutPage
