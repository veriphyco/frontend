//@ts-nocheck
import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {requestPassword} from '../core/_requests'
import SignatureCanvas from 'react-signature-canvas'
import {toAbsoluteUrl} from "../../../../_metronic/helpers"
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; 
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
export function FrontPage() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [userID, setuserID] = useState()
  const [email, setEmail]= useState();
  const [phoneNumber , setPhoneNumber]= useState();
  const [selfie, setSelfie] = useState();
  const [FrontIdImg, setSetFrontIdImg] = useState()
  const [selfieError, setselfieError] = useState("");
  const [selfieLink, setSelfieLink] = useState("fsfsd");
  const [progress, setProgress] = useState(28);
  const navigate = useNavigate();
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
//alert error messages start
const submit = () => {
  confirmAlert({
    title: 'File type Error',
    message: 'This file is not supported. File type must be .JPEG, .JPG , .PNG',
    buttons: [
      {
        label: 'Continue',
       // onClick: () => alert('Click Yes')
      },
   
    ]
  });
};
const submitSize = () => {
  confirmAlert({
    title: 'File size Error',
    message: 'Image Must be Atlease 600px by 600px and not more than 50MB.',
    buttons: [
      {
        label: 'Continue',
       // onClick: () => alert('Click Yes')
      },
   
    ]
  });
}
//allert error message end 
  const handleSubmit = async(e)=>{
    setLoading(true)
    console.log(selfie)
    e.preventDefault();
    if(selfie === undefined){
      setselfieError("Please select an image")
      setLoading(false)
    }else{
      try{
        const formData = new FormData();
        formData.append('file', selfie)
      //  console.log(FrontIdImg)
        formData.append("upload_preset", "drtkc6r5")
        
        //console.log(selfiee)
        const data = await axios.post('https://api.cloudinary.com/v1_1/veriphy/image/upload', formData)
        const imageurl= data.data.secure_url;
        console.log(data.data)
        if (data.data){
          //setSelfieLink(data.data.selfie)
          console.log(data.data);
        //  navigate("/backpage", { state: { userID, selfie , phoneNumber, email} }) 
        // console.log('successfully uplaoded')
          setSelfieLink(data.data.selfie)
          try{
            const updateSelfieDatabase = async()=>{
              const updatedSelfie = await axios.patch(`users/onboarding/register/frontIdImg/${userID}`, {frontIdimg: data.data.secure_url})
              console.log('UPDAT API CALLLED')
          }
          updateSelfieDatabase();
          console.log('updated')
          setLoading(false)
          navigate("/backpage", { state: { userID, selfie , phoneNumber, email} }) 
          }catch(err){
            console.log(err)
            console.log('cnannot pathc')
          }
         
        }else{
         
        }
      }catch(err){
    console.log(err)
    setselfieError("Failed Please Try Again")
    navigate('/error/500')
      }

    }
   
   
   // console.log('SIOSOFSF')
 

}
  const { state } = useLocation()

  useEffect(()=>{
    console.log(state)
    let userId = state?.userID
    let phoneNumber= state?.phoneNumber;
    let emailfromreg= state?.email;
   // console.log(emailfromreg)
    setEmail(emailfromreg)
    setuserID(userId)
    setPhoneNumber(phoneNumber)
    setProgress(42)

  },[])
 //check file size of upload start here
 const checkSize= (e)=>{
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  const fileExtension = file.name.split(".").at(-1);
  const allowedFileTypes = ["jpg", "png", "jpeg"];
  if (!allowedFileTypes.includes(fileExtension)) {
     // window.alert(`This file is not supported. File type must be ${allowedFileTypes.join(", ")}`);
      submit()
      setSelfie()
      return false;
  }else{
   // console.log("allowed type!!!!")
   
    
    reader.onload = (e)=>{
      const image = new Image();
      image.src = e.target.result;
      image.onload = (e) => {
        const height = e.target.height;
         const width = e.target.width;
         console.log(height, width)
         if (height < 600 || width < 600) {
         // alert("Image Must be Atlease 600px by 600px and not more than 50MB.");
         submitSize()
         setSelfie()
          return false;
        }else{
         // console.log("ALLLOWED  TYPE AND SIZE!!!!")
          
        }
      }
     
     
    }
    setSelfie(e.target.files[0])


  

  }

}
 //check file sizei of upload ends here
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
        encType="multipart/form-data"
        id='kt_login_password_reset_form'
        onSubmit={handleSubmit}
      >
        <div className='text-center mb-10'>
        {selfieError && (
          <div className='alert alert-danger' role='alert'>
            {selfieError}
          </div>
        )}
          {/* begin::Title */}
          <div style={{ display:"flex", alignItems:"center", textAlign:"center", justifyContent:"center"}}>
        <div style={{ width: 100, height: 100 , display:"flex", alignItems:"center", textAlign:"center",marginBottom:"8px" }}>
        <CircularProgressbarWithChildren value={progress}>
        <div >
        <div  className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"><span className="svg-icon svg-icon-4 me-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mh-50px"><path opacity="0.3" d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM12 7C10.3 7 9 8.3 9 10C9 11.7 10.3 13 12 13C13.7 13 15 11.7 15 10C15 8.3 13.7 7 12 7Z" fill="currentColor"></path><path d="M12 22C14.6 22 17 21 18.7 19.4C17.9 16.9 15.2 15 12 15C8.8 15 6.09999 16.9 5.29999 19.4C6.99999 21 9.4 22 12 22Z" fill="currentColor"></path></svg></span>STEP 3
        
        </div>
        </div>
        </CircularProgressbarWithChildren>

        </div>
        </div>
        
          <h1 className='text-dark mb-3'> ID/Passport(Front)</h1>
          <span  class="btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3 mb-2">*Allowed types .jpeg, .jpg and .png</span>
          <span  class="btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3 mb-3">*Should not be more than 50MB</span>
          <span  class="btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3">*Should be atleast 600px by 600px</span>

          {/* end::Title */}

          {/* begin::Link */}
         
          {/* end::Link */}
        </div>

        {/* begin::Title */}
       

       
        {/* end::Title */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
         
          <input
            type='file' onChange={(e)=>checkSize(e)} className='form-control form-control-lg form-control-solid' name='selfie' accept="image/*" capture="user"/>
         
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
       
          <button
            type='submit'
          
            className='btn btn-lg btn-primary fw-bolder me-4'
          >
           {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
           
          </button>
         
        
          
        
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
