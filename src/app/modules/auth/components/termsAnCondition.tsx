import React, {useState, useEffect} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Outlet, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios';
import {useFormik} from 'formik'
import {requestPassword} from '../core/_requests'
import SignatureCanvas from 'react-signature-canvas'
import {toAbsoluteUrl} from "../../../../_metronic/helpers"

import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { confirmAlert } from 'react-confirm-alert'; 



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
export function Termsandcondition() {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [backpage , setBackpage]= useState();
  const [frontpage, setFrontpage]= useState();
  const [selfie , setSelfie]= useState();
  const [identity , setveriphicationID]= useState();
  const [email ,setEmail]= useState();
  const [userId ,setUserId]= useState();
  const [phoneNumber , setPhoneNumber]= useState();
  const [progess, setProgress] = useState(88)
  const [checkBox, setCheckBox] = useState(true)
  console.log(userId)
  console.log(email)
  const baseOfAnotherHost = 'https://someotherdomain.com';
  const relativeOrAbsoluteURL = 'https://www.veriphy.co/'
  const absoulteUrl = new URL(relativeOrAbsoluteURL,baseOfAnotherHost).href
  const showThankYou = () => {
    confirmAlert({
      title: 'Thank You For Choosing Veriphy',
      message: `Check ${email} email in 10 Mins for the feedback`,
      buttons: [
        {
          label: 'Continue',
           onClick:()=>{navigate("/")}
        },
     
      ]
    });
  };
 // console.log(checkBox)
 // console.log(selfie)
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


  const handleSUbmit = async()=>{
    setLoading(true)
    const data = await axios.post('/metamap/authtoken')
    let access_token=data.data.access_token;
     console.log(access_token)
     if(data.data.access_token){
      //let access_token=data.data.access_token;
       const dataMerchant = await axios.post('/metamap/startverification/', {
        access_token,
      })
     console.log(dataMerchant)
      const identityId = dataMerchant.data.identity;
      const verificationId= dataMerchant.data.id;
      console.log(identityId)
      setveriphicationID(dataMerchant.data.identity);
//send inputs to metamap
      if(identityId){
        try{
          const formed = new FormData();
          //console.log(selfie_photo)
         const selfiename =selfie.name;
         const frontIdName =frontpage.name;
         const backIdName =backpage.name;
         console.log(selfiename);
          
          const inputs=﻿JSON.stringify([
            {
            "inputType":"selfie-photo",
            "data":{"type":"selfie-photo",
            "country":"KE",
            "filename":`${selfiename}`}
            },
            {
            "inputType":"document-photo",
            "group":0,
            "data":{"type":"national-id",
            "country":"KE",
            "page":"front",
            "filename":`${frontIdName}`}
            },
            {
            "inputType":"document-photo",
            "group":0,
            "data":{"type":"national-id",
            "country":"KE",
            "page":"back",
            "filename":`${backIdName}`}
            },
        
            ])
            formed.append("inputs", inputs); 
            formed.append("document", selfie); 
            formed.append("document", frontpage);
            formed.append("document", backpage); 
          const options = {
            method: 'POST',
            url: `https://api.getmati.com/v2/identities/${identityId}/send-input`,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
              Authorization: `Bearer ${access_token}`
            },
            data: formed

           
          };
          axios.request(options).then(function (response) {
            console.log(response.data);
            if(response.data){
              try{
                const doAll = async()=>{
                  console.log(access_token)
                  
     console.log(verificationId)
     console.log(userId)
     console.log(access_token)
                  const dataMerchant = await axios.post('/metamap/hotel_veriphy_co/webhook/', {
                    verificationId,
                    email,
                    userId,
                    access_token,
                  })
                 
                }
                doAll()
                showThankYou();
                setLoading(false)
              
                
              }catch(err){
                  console.log(err)
              }
             
            }
        const getJson=()=>{
          setLoading(true)
          const options = {
            method: 'GET',
            url: `https://api.getmati.com/v2/verifications/${verificationId}`,
            headers: {Accept: 'application/json', 'Content-Type': 'application/json',  Authorization: `Bearer ${access_token}`}
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
            const data= response.data;
            
            const {computed, documents, expired, flow, identity, steps, id,deviceFingerprint, hasProblem}= data;
           //let country= documents[0].country;
         
            const idNumber=documents[0].steps[0].data.documentNumber;
            const fullNamesFromMeta= documents[0].steps[5].data.fullName.value;
            const dochasProblem =hasProblem;
            const docidentity = identity.status;
            const documentType= documents[0].fields.documentType.value;
            const age= documents[0].steps[1].data.age;
            const docExpired = expired;
            const dateOFBirth= documents[0].steps[5].data.dateOfBirth.value;
            const sex= documents[0].steps[5].data.sex.value;
            const faceMatchScore = documents[0].steps[3].data.score;
            const AlterationDetected = documents[0].steps[2].error;
            const onWatchList= documents[0].steps[6].error;
            const validationFrom= documents[0].steps[0].id;
            const pdfLink = 'none';
           const  selfieURl=steps[0].data.selfiePhotoUrl;
            const expirationDate= documents[0].steps[5].data.expirationDate.value;
        
            try{
              const updateDatabaseFromMeta = async()=>{
                const updatedatabase = await axios.patch(`users/onboarding/updatemanyregister/${userId}`, {idNumber: idNumber,
                  dochasProblem:dochasProblem,
                  docidentity:docidentity,
                  age:age,
                  docExpired:docExpired,
                  dateOFBirth:dateOFBirth,
                  sex:sex,
                  documentType:documentType,
                  onWatchList:onWatchList,
                  fullNamesFromMeta:fullNamesFromMeta,
                  faceMatchScore:faceMatchScore,
                  validationFrom:validationFrom,
                  selfieURl:selfieURl,
                  expirationDate:expirationDate,
                  AlterationDetected:AlterationDetected,
                  pdfLink:pdfLink
                })
                console.log('UPDATE API CALLLED')
               
            }
            
            updateDatabaseFromMeta();
            showThankYou();
            setLoading(false)
        
            //send email of metamap response
            const sendResponseViaEmail = async()=>{
              try{
                const Send = await axios.post('/users/metamap/sendemail', {
                  email,
                  docidentity,
                  fullNamesFromMeta,
                  idNumber,
                  documentType,
                  dateOFBirth,
                  onWatchList
        
        
                })
              }catch(err){
                console.log("errro on sending Email to metamap receiptien")
              }
            }
            sendResponseViaEmail()
           // navigate("/signature", { state: { userID,phoneNumber } })
            console.log('updated')
            }catch(err){
              console.log(err)
              console.log('cnannot pathc')
            //  navigate("/signature", { state: { userID,phoneNumber } })
            }
          /// Download the pdf to the User
        
          
            //setMetamap(response.data)
            // const data=response.data.computed;
            // const age = data.age.data;
            // const  documentEXporied = data.isDocumentExpired.data;
            // const documents = data.
           // setLoading(false)
            console.log('respndoend after a while')
          }).catch(function (error) {
            setLoading(false)
            console.error(error);
          });
        }
       // setTimeout(getJson, 150000)
         //sendstkPush();
            //retrieve the data fourth api call
           // console.log(response.data.access_token)
           
          }).catch(function (error) {
            console.error(error);
            setLoading(false)
            navigate('/error/500')
          });
        

          
        }catch(err){
          console.log(err)
        }
       
      }
      
  
    
      //  const merchantId = dataMerchant.data.MerchantRequestID; 
       
      
    
  
      
      //console.log(checkoutRequestId)
  
  
    }else{
      navigate('/error/500');
    }
  }
  
  const { state } = useLocation()
  useEffect(()=>{
    console.log(state)
   // console.log("halo ahlo")
    let phoneNumber= state?.phoneNumber;
    setPhoneNumber(phoneNumber)
    let email = state?.email;
    setEmail(email);
    let frontPage = state?.frontpage;
    setFrontpage(frontPage);
    let backpage = state?.backpage;
    setBackpage(backpage)
    let selfie = state?.selfie;
    setSelfie(selfie);
    let userID = state?.userId;
    setUserId(userID)
    setProgress(88)
    // console.log(userID)
    // console.log(selfie)
    // console.log(frontPage)
    // console.log(backpage)


  //  console.log(phoneNumber)
    // console.log(phoneNumber)
    // setPhoneNumber(phoneNumber)
  
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
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/logonb.png')} className='h-45px' />
        </a>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
        <div
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        id='kt_login_password_reset_form'
      >
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <div className="steps">
        </div>
        <div style={{ display:"flex", alignItems:"center", textAlign:"center", justifyContent:"center"}}>
        <div style={{ width: 100, height: 100 , display:"flex", alignItems:"center", textAlign:"center",marginBottom:"8px" }}>
        <CircularProgressbarWithChildren value={checkBox ? progess : 95}>
        <div >
        <div  className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"><span className="svg-icon svg-icon-4 me-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mh-50px"><path opacity="0.3" d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM12 7C10.3 7 9 8.3 9 10C9 11.7 10.3 13 12 13C13.7 13 15 11.7 15 10C15 8.3 13.7 7 12 7Z" fill="currentColor"></path><path d="M12 22C14.6 22 17 21 18.7 19.4C17.9 16.9 15.2 15 12 15C8.8 15 6.09999 16.9 5.29999 19.4C6.99999 21 9.4 22 12 22Z" fill="currentColor"></path></svg></span>STEP 7
        
        </div>
        </div>
        </CircularProgressbarWithChildren>

        </div>
        </div>
          <h1 className='text-dark mb-3'> 
            Terms and Conditions  
           </h1>
          {/* end::Title */}

          {/* begin::Link */}
         
          {/* end::Link */}
        </div>

        {/* begin::Title */}
       

       
        {/* end::Title */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
         
      

   
        </div>
        {/* end::Form group */}
    {/* TICK BOX START HERE */}
    <div className='fv-row mb-10'>
        <div className='form-check form-check-custom form-check-solid'>
          <input
            className='form-check-input'
            type='checkbox'
            onClick={()=> {setCheckBox(!checkBox)}}
           
          />
          <label
            className='form-check-label fw-bold text-gray-700 fs-6 ml-10'
            htmlFor='kt_login_toc_agree'
          >
            I Agree to the{' '}
            <Link to="/termsandconditions">

              terms and conditions
            </Link>
          
            .
          </label>
         
        </div>
      </div>
    {/* TICK BOX ENDS HERE */}
        {/* begin::Form group */}
       <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
        {/* <a  href={absoulteUrl} target={'_blank'} rel="noopener noreferrer external"> */}
          <button
            type='submit'
            onClick={handleSUbmit}
            disabled={checkBox}
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
          {/* </a> */}
        
          
        
        </div>
        {/* end::Form group */}
      </div>
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

          <a href='admin/login' className='text-muted text-hover-primary px-2'>
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
