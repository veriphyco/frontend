import React, {useState, useEffect} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Outlet, Route, Routes, useLocation} from 'react-router-dom'
import {Link, useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import {requestPassword} from '../core/_requests'
import SignatureCanvas from 'react-signature-canvas'
import {toAbsoluteUrl} from "../../../../_metronic/helpers"
import axios from 'axios'
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';


const initialValues = {
     email: 'admin@demo.com',
  }
  
  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
  })
export function Stkpush() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [showstkMesssag, setshowstkMesssag] = useState(false);
  const [phoneNumber, setphoneNumber]= useState();
  const [email, setEmail]= useState();
  const [loadingRetry, setloadingRetry] = useState(false);
  const [userID, setuserID] = useState()
  const [mpesaError, setMpesaError] = useState("");
  const [paymentError , setPaymentError] = useState('')
  const [access_token, setaccess_token] = useState("");
  const [checkoutRequestId, setcheckoutRequestId]= useState("");
  const [retry, checkRetry] = useState(false);
  const [progress, setProgress] = useState(16);
 //  console.log(`${access_token} this is access_token`)
 //  console.log(`${checkoutRequestId} this is checkoutid`)
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setHasErrors(undefined)
      setTimeout(() => {
        requestPassword(values.email)
          .then(({data: {result}}) => {
            setHasErrors(false)
            setLoading(false)
          })
          .catch(() => {
            setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
            setStatus('The login detail is incorrect')
          })
      }, 1000)
    },
  })

  const confirmPayments = async ()=>{
  //  console.log("checking loaidng Retry")
    setshowstkMesssag("");
    setMpesaError("");
    setPaymentError("")
    setloadingRetry(true)
    const checkpament = await axios.post('/daraja/api/stk/querry', {
      access_token, checkoutRequestId
  })
  
//  console.log(checkpament.data)
 // console.log(checkpament.data.ResultCode);
  if(checkpament.data.ResultCode === "0"){
    navigate("/frontpage",  { state: { userID, phoneNumber,email } })
  }else{
    setshowstkMesssag("")
    setPaymentError("No Payment Received");
    setLoading(false);
    checkRetry(true)
    setloadingRetry(false)
  }
  }

 const handleSubmit = async(e)=>{
  setLoading(true);
  setshowstkMesssag("");
  setMpesaError("");
  setPaymentError("")
  e.preventDefault();
  setshowstkMesssag(true);
 // console.log('jhandle submnit')
  const data = await axios.get('/daraja/api/authtoken')
  const access_token=data.data.access_token;
 // console.log(data.data.access_token)
  setaccess_token(data.data.access_token);
  if(data.data.access_token){
    const dataMerchant = await axios.post('/daraja/api/stkpush', {
      access_token, phoneNumber
    })
   // console.log(dataMerchant)
    const checkoutRequestId = dataMerchant.data.CheckoutRequestID;
    setcheckoutRequestId(dataMerchant.data.CheckoutRequestID);

    const checkPayment =async ()=>{
      console.log("checking for payment now")
      const checkpament = await axios.post('/daraja/api/stk/querry', {
        access_token, checkoutRequestId
    })
   
  //  console.log(checkpament.data)
   // console.log(checkpament.data.ResultCode);
    if(checkpament.data.ResultCode === "0"){
      navigate("/frontpage",  { state: { userID, phoneNumber, email } })
      setLoading(false)
    }else{
      setshowstkMesssag("")
      setPaymentError("No Payment Received");
      setLoading(false);
      checkRetry(true)
    }

    }
    setTimeout(checkPayment, 20000)
    //  const merchantId = dataMerchant.data.MerchantRequestID; 
     
    
  

    
    //console.log(checkoutRequestId)


  }else{
    setMpesaError("Not sent Please Retry")
  }
 }
 const { state } = useLocation();


 useEffect(()=>{
  let phoneNumber= state?.phoneNumber;
  let userId = state?.userID
  let emailfromreg = state?.email;
  setphoneNumber(phoneNumber);
  setEmail(emailfromreg)
  setuserID(userId);
  setProgress(28)
 // console.log(phoneNumber);
})
  return (
    <>
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
      }}
    >
      {/* begin::Content */}
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        {/* begin::Logo */}
        <a href='#' className='mb-12'>
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/logonb.png')} className='h-45px' />
        </a>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
        <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={handleSubmit}
      >
        <div className='text-center mb-10'>
          {/* begin::Title */}
          {showstkMesssag && (
            <div className="alert alert-success" role="alert">
            Check for an STK push sent to {phoneNumber}
         </div>
          )}
          {
            mpesaError &&  (
              <div className="alert alert-warning" role="alert">
             {mpesaError}
             </div>
            )

          }
          {
            paymentError && (
              <div className="alert alert-danger" role="alert">
              No Payment Received
            </div>
            )
          }
          
            

         
          
          <div style={{ display:"flex", alignItems:"center", textAlign:"center", justifyContent:"center"}}>
        <div style={{ width: 100, height: 100 , display:"flex", alignItems:"center", textAlign:"center",marginBottom:"8px" }}>
        <CircularProgressbarWithChildren value={progress}>
        <div >
        <div  className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"><span className="svg-icon svg-icon-4 me-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mh-50px"><path opacity="0.3" d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM12 7C10.3 7 9 8.3 9 10C9 11.7 10.3 13 12 13C13.7 13 15 11.7 15 10C15 8.3 13.7 7 12 7Z" fill="currentColor"></path><path d="M12 22C14.6 22 17 21 18.7 19.4C17.9 16.9 15.2 15 12 15C8.8 15 6.09999 16.9 5.29999 19.4C6.99999 21 9.4 22 12 22Z" fill="currentColor"></path></svg></span>STEP 2
        
        </div>
        </div>
        </CircularProgressbarWithChildren>

        </div>
        </div>
          <h1 className='text-dark mb-3'>Pay Kshs 100 via   <img src={toAbsoluteUrl('/media/logos/mpesa.png')} alt="m-pesa" className='h-45px' /></h1>
       
          {/* end::Title */}
  
          {/* begin::Link */}
         
          {/* end::Link */}
        </div>

        {/* begin::Title */}
       

       
        {/* end::Title */}

        {/* begin::Form group */}
        
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
        {/* <Link to='/auth/registration'> */}
        <button
            type='submit'
            className='btn btn-lg btn-primary w-100 mb-5'>
           <span className='indicator-label'>
           {!loading && <span className='indicator-label'>Pay</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Waiting for confirmation...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
            
            </span> </button>
            

          {/* </Link> */}
        
          
        
        </div>
        {/* end::Form group */}
      </form>
      {retry  && (
               <button
              onClick= {()=>{confirmPayments()}}
               className='btn btn-lg btn-primary w-100 mb-5'>
              <span className='indicator-label'>
              {!loadingRetry && <span className='indicator-label'>Check Again</span>}
             {loadingRetry && (
               <span className='indicator-progress' style={{display: 'block'}}>
                 Waiting for confirmation...{' '}
                 <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
               </span>
             )}
               
               </span> </button>
            )}
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
      {/* begin::Footer */}
      <div className='d-flex flex-center flex-column-auto p-10'>
        <div className='d-flex align-items-center fw-bold fs-6'>
          <a href='#' className='text-muted text-hover-primary px-2'>
            About
          </a>

          <a href='#' className='text-muted text-hover-primary px-2'>
            Contact
          </a>

          <a href='#' className='text-muted text-hover-primary px-2'>
            Contact Us
          </a>
        </div>
      </div>
      {/* end::Footer */}
    </div>
      
    </>
  )
}
