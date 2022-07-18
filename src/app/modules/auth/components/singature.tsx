import React, {useState, useEffect} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Outlet, Route, Routes,useLocation , useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {requestPassword} from '../core/_requests'
import SignatureCanvas from 'react-signature-canvas'
import {toAbsoluteUrl} from "../../../../_metronic/helpers"
import axios from 'axios';
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
export function Singnature() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [phoneNumber , setPhoneNumber]= useState("070256");
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [frontpage, setFrontpage]= useState();
  const [backpage , setBackpage]= useState();
  const [selfie , setSelfie]= useState();
  const [email ,setEmail]= useState();
  const [userId ,setUserId]= useState();
  const [progress, setProgress] = useState(74)
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
  const sendstkPush = async()=>{
    console.log('jhandle submnit')
    navigate("/termsandcondition", { state: {phoneNumber,userId, frontpage,backpage, selfie, email } })
    // const data = await axios.get('/daraja/api/authtoken')
    // const access_token=data.data.access_token;
    // console.log(data.data.access_token)
    // if(data.data.access_token){
    //   const data = await axios.post('/daraja/api/stkpush', {
    //     access_token, phoneNumber
    //   })
    //   console.log(data)


    // }
  }

  const { state } = useLocation()
  useEffect(()=>{
    console.log(state)
    
    let phoneNumber= state?.phoneNumber;
    setPhoneNumber(phoneNumber)
    let email = state?.email;
    setEmail(email);
    let frontPage = state?.frontpage;
    setFrontpage(frontPage);
    let backpage = state?.backpage;
    setBackpage(backpage)
    let selfie = state?.selfiee;
    setSelfie(selfie);
    let userID = state?.userID;
    setUserId(userID)
    setProgress(88)


  //  console.log(phoneNumber)
    console.log(phoneNumber)
    setPhoneNumber(phoneNumber)
  
  },[])
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
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo.png')} className='h-45px' />
        </a>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
        <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik.handleSubmit}
      >
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <div className="steps">

        </div>
        <div style={{ display:"flex", alignItems:"center", textAlign:"center", justifyContent:"center"}}>
        <div style={{ width: 100, height: 100 , display:"flex", alignItems:"center", textAlign:"center",marginBottom:"8px" }}>
        <CircularProgressbarWithChildren value={progress}>
        <div >
        <div  className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"><span className="svg-icon svg-icon-4 me-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mh-50px"><path opacity="0.3" d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM12 7C10.3 7 9 8.3 9 10C9 11.7 10.3 13 12 13C13.7 13 15 11.7 15 10C15 8.3 13.7 7 12 7Z" fill="currentColor"></path><path d="M12 22C14.6 22 17 21 18.7 19.4C17.9 16.9 15.2 15 12 15C8.8 15 6.09999 16.9 5.29999 19.4C6.99999 21 9.4 22 12 22Z" fill="currentColor"></path></svg></span>STEP 6
        
        </div>
        </div>
        </CircularProgressbarWithChildren>

        </div>
        </div>
          <h1 className='text-dark mb-3'>Kindly Sign Here</h1>
          {/* end::Title */}

          {/* begin::Link */}
         
          {/* end::Link */}
        </div>

        {/* begin::Title */}
       

       
        {/* end::Title */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
         
        <SignatureCanvas penColor='green'
    canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} />
    
         
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
        {/* <Link to='/termsandcondition' state={phoneNumber,userId, frontpage,backpage, selfie}> */}
          <button
            type='submit'
            onClick={sendstkPush}
            className='btn btn-lg btn-primary fw-bolder me-4'
          >
            <span className='indicator-label'>Submit</span>
           
          </button>
          {/* </Link> */}
        
          
        
        </div>
        {/* end::Form group */}
      </form>
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

          <a href='/admin/login' className='text-muted text-hover-primary px-2'>
            Admin
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
