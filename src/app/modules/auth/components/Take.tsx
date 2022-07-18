//@ts-nocheck
import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Navigate, Outlet, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {requestPassword} from '../core/_requests'
import SignatureCanvas from 'react-signature-canvas'
import {toAbsoluteUrl} from "../../../../_metronic/helpers"
import axios from 'axios'
import Progress_bar from './progressBar2';
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
export function Take() {
  const [loading, setLoading] = useState(false)
  const [userID, setuserID] = useState()
  const [selfiee, setSelfie] = useState()
  const [metamap, setMetamap]=useState({});
  const [frontpage, setfrontpage]= useState();
  const [phoneNumber , setPhoneNumber]= useState();
  const [backpage, setBackpage]= useState();
  const [display, setDisplay]= useState("none");
  const [progress, setProgress]= useState(58);
  const [selfieError, setselfieError] = useState("");
  const [selfieLink, setSelfieLink] = useState("fsfsd");
  const [email, setEmail]= useState();
 

  const initialMinute = 3;
    
  const  initialSeconds = 0
  const [ minutes, setMinutes ] = useState(initialMinute);
  const [seconds, setSeconds ] =  useState(initialSeconds);
  const metaData={
    flowId: "62bc6671e1ec51001cbe0466"
  }
  const navigate = useNavigate()
  //console.log(selfieLink)
 
  const handleWaiting = ()=>{
    if(minutes === 3){
      setProgress("10")
    }else if (minutes=== 2){
      setProgress("60")
    }else if(minutes === 1){
      setProgress("90")
    }else{
      setProgress("100")
    }
  }
  //send stk to the user start
  const sendstkPush = async()=>{
    console.log('jhandle submnit')
    const data = await axios.get('/daraja/api/authtoken')
    const access_token=data.data.access_token;
    console.log(data.data.access_token)
    if(data.data.access_token){
      const data = await axios.post('/daraja/api/stkpush', {
        access_token, phoneNumber
      })
      console.log(data)


    }
  }
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
   //send stk to the user start
  //handleWaiting()
  const handleSubmit = async(e)=>{
   
    handleWaiting()
  // setProgress("50")
    e.preventDefault();
    if(selfiee === undefined){
      setselfieError('Please Select an image')
      setLoading(false)
    }else{
      setLoading(true)
      setDisplay("block")
      setselfieError('')
      try{
  
        const formData = new FormData();
        formData.append('file', selfiee)
        formData.append("upload_preset", "drtkc6r5")
        
        //console.log(selfiee)
        const data = await axios.post('https://api.cloudinary.com/v1_1/veriphy/image/upload', formData)
        const imageurl= data.data.secure_url;
       // console.log(imageurl)
       // console.log(data)
        if (data.data){
          
          setSelfieLink(data.data.selfie)
          ///send the complete data to metamap  start
                //clintSecret = "58Y6EGPP7AHBTDUYAKCXNWZ91N9CEYHZ";
        const encodedParams = new URLSearchParams();
        encodedParams.set("grant_type","client_credentials", "626acde467b431001b486993 58Y6EGPP7AHBTDUYAKCXNWZ91N9CEYHZ");
    
  
        const options = {
          method: 'POST',
          url: 'https://api.getmati.com/oauth',
          headers: {
           "Accept": 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization":"Basic NjI2YWNkZTQ2N2I0MzEwMDFiNDg2OTkzOjU4WTZFR1BQN0FIQlREVVlBS0NYTldaOTFOOUNFWUha"
          },
          data: encodedParams
        };
        
        axios.request(options).then(function (response) {
          console.log(response.data.access_token);
          //setToken(response.data.access_token);
        const validToken=response.data.access_token
          if(response.data.access_token){
            //second api call
              const options = {
                method: 'POST',
                  url: 'https://api.getmati.com/v2/verifications/',
                 headers: {
                  Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: `Bearer ${response.data.access_token}`
             },
             data: metaData
           };
          axios.request(options).then(function (response) {
           console.log(response.data.identity);
           const verificationId= response.data.id;
    //third api call    
    // console.log(response.data.access_tokenen);
    const formed = new FormData();
    //console.log(selfie_photo)
   const selfiename =selfiee.name;
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
      formed.append("document", selfiee); 
      formed.append("document", frontpage);
      formed.append("document", backpage); 
  
   
  
    
    const options = {
      method: 'POST',
      url: `https://api.getmati.com/v2/identities/${response.data.identity}/send-input`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
        Authorization: `Bearer ${validToken}`
      },
      data: formed
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
  const getJson=()=>{
    setLoading(true)
    const options = {
      method: 'GET',
      url: `https://api.getmati.com/v2/verifications/${verificationId}`,
      headers: {Accept: 'application/json', 'Content-Type': 'application/json',  Authorization: `Bearer ${validToken}`}
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
          const updatedatabase = await axios.patch(`users/onboarding/updatemanyregister/${userID}`, {idNumber: idNumber,
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
      navigate("/signature", { state: { userID,phoneNumber, email } })
      console.log('updated')
      }catch(err){
        console.log(err)
        console.log('cnannot pathc')
        navigate("/signature", { state: { userID,phoneNumber, email } })
      }
    /// Download the pdf to the User
  
    
      //setMetamap(response.data)
      // const data=response.data.computed;
      // const age = data.age.data;
      // const  documentEXporied = data.isDocumentExpired.data;
      // const documents = data.
      console.log('respndoend after a while')
    }).catch(function (error) {
      setLoading(false)
      console.error(error);
    });
  }
  setTimeout(getJson, 150000)
   //sendstkPush();
      //retrieve the data fourth api call
     // console.log(response.data.access_token)
     
    }).catch(function (error) {
      console.error(error);
      setLoading(false)
    });
    
    
  }).catch(function (error) {
    console.error(error);
  });
          }
        }).catch(function (error) {
          console.error(error);
          setLoading(false)
        });
  
          //send data to metamap complete end
  
          console.log(data.data.selfie);
         //  navigate("/signature", { state: { userID } }) 
         console.log('successfully uplaoded')
          //setSelfieLink(data.data.selfie)
          try{
            const updateSelfieDatabase = async()=>{
              const updatedSelfie = await axios.patch(`users/onboarding/register/selfie/${userID}`, {selfiee: data.data.secure_url})
              console.log('UPDAT API CALLLED')
          }
          updateSelfieDatabase();
          console.log('updated')
          }catch(err){
            console.log(err)
            console.log('cnannot patch')
            setLoading(false)
          }
         
        }else{
         
        }
      }catch(err){
    console.log(err)
    setselfieError("Failed Please Try Again")
    setLoading(false)
    setDisplay("none")
    navigate('/error/500');
    
      }
     
    }
 
   
  // const myInterval = setInterval(myTimer, 1000);
  // function myTimer() {
  //  setLoading(true) 
   
  // }
  
   // console.log('SIOSOFSF')
 

}
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

 //HANDLE SUBMIT STARTS HERE 
 const handleSubmitFinal = async(e)=>{
  e.preventDefault()
  setLoading(true)
  if(selfiee === undefined){
    setselfieError("Please select an Image")
    setLoading(false)
  }else{
    try{
      const formData = new FormData();
      formData.append('file', selfiee)
     // console.log(FrontIdImg)
      formData.append("upload_preset", "drtkc6r5")
      
      //console.log(selfiee)
      const data = await axios.post('https://api.cloudinary.com/v1_1/veriphy/image/upload', formData)
      const imageurl= data.data.secure_url;
      //console.log(selfiee)
     
      //console.log(data.data)
      if (data.data){
        setSelfieLink(data.data.selfiee)
        console.log(data.data.selfiee);
        navigate("/signature", { state: { userID, frontpage,backpage, phoneNumber, email, selfiee } }) 
       console.log('successfully uplaoded')
        //setSelfieLink(data.data.selfie)
        try{
          const updateSelfieDatabase = async()=>{
            const updatedSelfie = await axios.patch(`users/onboarding/register/selfie/${userID}`, {selfie: data.data.secure_url})
            console.log('UPDAT API CALLLED')
        }
        updateSelfieDatabase();
        console.log('updated')
        }catch(err){
          console.log(err)
          console.log('cnannot pathc')
          setLoading(false)
        }
       
      }else{
       
      }
    }catch(err){
  console.log(err)
  setselfieError("Failed Please Try Again")
  navigate('/error/500');

    }

  }
 // e.preventDefault();
 
 
 // console.log('SIOSOFSF')


}

 //HANDLE SUBMIT ENDS HERE
const { state } = useLocation()

  useEffect(()=>{
   // console.log(state)
    let userId = state?.userID
    const frontPage= state?.frontpage;
    const backPage= state?.selfie;
    let phoneNumber= state?.phoneNumber;
    let emailfromreg= state?.email;
    setEmail(emailfromreg)
    setPhoneNumber(phoneNumber)
    console.log(emailfromreg)
    setfrontpage(frontPage);
    setBackpage(backPage);
   console.log(backPage)
    setuserID(userId)
    setProgress(74)
    let myInterval = setInterval(() => {
      if (seconds > 0) {
          setSeconds(seconds - 1);
      }
      if (seconds === 0) {
          if (minutes === 0) {
              clearInterval(myInterval)
          } else {
              setMinutes(minutes - 1);
              setSeconds(59);
          }
      } 
  }, 1000)
  return ()=> {
      clearInterval(myInterval);
    };

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
        <form
         className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
         id='kt_login_password_reset_form'
         onSubmit={handleSubmitFinal}
        encType="multipart/form-data"

      >
        <div className='text-center mb-10'>
        {selfieError && (
          <div className='alert alert-danger' role='alert'>
            {selfieError}
          </div>
        )}
          {/* begin::Title */}
          <div className="steps">
 
        </div>
        <div style={{ display:"flex", alignItems:"center", textAlign:"center", justifyContent:"center"}}>
        <div style={{ width: 100, height: 100 , display:"flex", alignItems:"center", textAlign:"center", marginBottom:"8px"}}>
        <CircularProgressbarWithChildren value={progress}>
        <div >
        <div  className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"><span className="svg-icon svg-icon-4 me-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mh-50px"><path opacity="0.3" d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM12 7C10.3 7 9 8.3 9 10C9 11.7 10.3 13 12 13C13.7 13 15 11.7 15 10C15 8.3 13.7 7 12 7Z" fill="currentColor"></path><path d="M12 22C14.6 22 17 21 18.7 19.4C17.9 16.9 15.2 15 12 15C8.8 15 6.09999 16.9 5.29999 19.4C6.99999 21 9.4 22 12 22Z" fill="currentColor"></path></svg></span>STEP 5
        
        </div>
        </div>
        </CircularProgressbarWithChildren>

        </div>
        </div>
          <h1 className='text-dark mb-3'>Take a Selfie</h1>
          <span  class="btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3 mb-2">*Allowed types .jpeg, .jpg and .png</span>
          <span  class="btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3 mb-3">*Should not be more than 50MB</span>
          <span  class="btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3">*Should be atleast 600px by 600px</span>


  <div  style={{display:display}}>
  <div class="progress">       
  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
  </div>
  <div className="alert alert-warning mt-5" role="alert">
        This will only take a while...Please keep this tab open
        
    </div>
    
    </div>    
 
          {/* <Progress_bar bgcolor="#99ff66" progress={progress }  height={20} /> */}
          {/* end::Title */}
          {/* begin::Link */}
         
          {/* end::Link */}
        </div>

        {/* begin::Title */}
       

       
        {/* end::Title */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
         
          <input
            type='file' className='form-control form-control-lg form-control-solid' name="selfie" accept="image/*" capture="user"
            onChange={(e)=>checkSize(e)}
            />
         
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
        
          <button
            className='btn btn-lg btn-primary fw-bolder me-4'
          >
              {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please{' '}
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
