import React, { useState } from 'react'
import { emailValidation, numberValidation, passwordValidation } from '../utils/FormValidationHandler';
import constKeys from '../constant/constant';

function FormInputs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: ''
    })
    
    const [error, seterror] = useState(false);
    const [errorMsg, seterrorMsg] = useState("");


 const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();

    if(formData.name.trim() == ""){
        seterrorMsg('Please enter your name.')
        seterror(true);
        return;
    }
    
    if(formData.email.trim() == ""){
        seterrorMsg('Please enter your email.')
        seterror(true);
        return;
    }
    else{
        let emailVerify = emailValidation(formData.email)
        if(emailVerify){
            seterror(false)
        }
        else{
            seterrorMsg('Please enter a valid email.')
            seterror(true);
            return;
        }
    }

    if(formData.mobile.trim() == ""){
        seterrorMsg('Please enter your mobile number.')
        seterror(true);
        return;
    }
    else{
        let mobileVerify = numberValidation(formData.mobile)
        if(mobileVerify){
            seterror(false)
        }
        else{
            seterrorMsg('Please enter a valid 10 digit mobile number.')
            seterror(true);
            return;
        }
    }

}


  return (
    <div>
        <h2>{constKeys.FORM_VALIDATION_EXAMPLE}</h2>
        <form>
            <p> Name : <input type="text" name="name" onChange={ e => onChangeHandler(e) }/></p>            
            <p> Email : <input type="email" name="email"  onChange={ e => onChangeHandler(e) } /></p>
            <p> Mobile : <input type="number" name="mobile" onChange={ e => onChangeHandler(e) }  /></p>
            {
                error?<div className='errorSection'><p className=''>{errorMsg}</p></div> : null
            }
            <button type="submit" onClick={ (e) => formSubmit(e) }> submit</button>
        </form>
    </div>
  )
}

export default FormInputs