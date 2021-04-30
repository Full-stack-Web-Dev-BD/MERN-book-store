const validator=require('validator')
const registerValidator= (req)=>{
    const {email,password,confirmPassword}=req.body
    let error={}
    if(!email){
        error.email="Username required !!"
    }else if(!validator.default.isEmail(req.body.email)){
        error.email="Username not valid!!"
    }
    if(!password){
        error.password="Password required !!"
    }
    if(!confirmPassword){
        error.confirmPassword="Confirm password  required !!"
    }else if(password!==confirmPassword){
        error.confirmPassword="Confirm  password does not match with password !!"
    }
    
    return{
        isValid:Object.keys(error).length===0,
        error:error
    }
}
const loginValidator=(req)=>{
    let err={}
    if(!req.body.email){
        err.email="Username required !!!"
    } else if(!validator.default.isEmail(req.body.email)){
        err.email="Username not valid"
    }
    if(!req.body.password){
        err.password="Password required !!!"
    }
    return{
        isValid:Object.keys(err).length===0,
        err:err
    }
}
const postValidator=(req)=>{
    let err={}
    if(!req.body.title){
        err.title="Title Required"
    }
    if(!req.body.summary){
        err.summary="Summery Required"
    }
    if(!req.body.author){
        err.author="Author Name Requird"
    }
    
    return{
        isValid:Object.keys(err).length===0,
        err:err
    }
}
module.exports={
    loginValidator,
    registerValidator,
    postValidator
}