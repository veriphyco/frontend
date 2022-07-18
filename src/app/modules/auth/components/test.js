import React,{useState , useEffect} from 'react'
import axios from 'axios'
import Timer from './progressbar'
import Progress_bar from './progressBar2'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


export default function Test() {

  const [token , setToken]=useState();
  const [frontId, setFrontId]= useState();
  
  const [metamap, setMetamap]=useState();
  const [loading , setLoading]= useState(false)
  const [selfie_photo, setSelfie]=useState();
  const [progress, setProgress]= useState("1");
  const initialMinute = 3;
    
  const  initialSeconds = 0
  const [ minutes, setMinutes ] = useState(initialMinute);
  const [seconds, setSeconds ] =  useState(initialSeconds);
  const sel='https://res.cloudinary.com/veriphy/image/upload/v1656316060/xjzwa5sqrn6lf76d3zj2.jpg';
  const front='https://res.cloudinary.com/veriphy/image/upload/v1656315597/saq6yq4lwtlsasdpw9cp.jpg';
  const back='https://res.cloudinary.com/veriphy/image/upload/v1656315607/ahiot3xbdamwtitydcxu.jpg';
 // console.log(frontId)

  const metaData={
    flowId: "62bc6671e1ec51001cbe0466"
  }


    const handleSubmit = ()=>{  
      const clientId = {"626acde467b431001b486993":"58Y6EGPP7AHBTDUYAKCXNWZ91N9CEYHZ"};
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
        setToken(response.data.access_token);
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
  console.log(selfie_photo)
 const selfiename =selfie_photo.name;
 const frontIdName =frontId.name;
 const backIdName =backId.name;
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
    formed.append("document", selfie_photo); 
    formed.append("document", frontId);
    formed.append("document", backId); 

 

  
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
  const options = {
    method: 'GET',
    url: `https://api.getmati.com/v2/verifications/${verificationId}`,
    headers: {Accept: 'application/json', 'Content-Type': 'application/json',  Authorization: `Bearer ${validToken}`}
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data.computed);
    const data=response.data.computed;
    const age = data.age.data;
    const  documentEXporied = data.isDocumentExpired.data;
    const documents = data.
    console.log('respndoend afeter a while')
  }).catch(function (error) {
    console.error(error);
  });
}
setTimeout(getJson, 180000)
    //retrieve the data fourth api call
   // console.log(response.data.access_token)
   
  }).catch(function (error) {
    console.error(error);
  });
  
  
}).catch(function (error) {
  console.error(error);
});
        }
      }).catch(function (error) {
        console.error(error);
      });
     
    }

    const testDelay=()=>{
  console.log("halloe")
  setLoading(true)
    }
      
  ///data from metamap
  const data= {
    computed: {
      age: {
        data: 28
      },
      isDocumentExpired: {
        data: {
          national_id: false
        }
      }
    },
    documents: [
      {
        country: "KE",
        region: null,
        type: "national-id",
        steps: [
          {
            status: 200,
            id: "kenyan-ecitizen-validation",
            error: null,
            data: {
              documentNumber: "31320509",
              fullName: "SOLOMON GITHIRA"
            }
          },
          {
            status: 200,
            id: "age-check",
            data: {
              age: 28,
              ageThreshold: 18,
              underage: false
            },
            error: null
          },
          {
            status: 200,
            id: "alteration-detection",
            error: null
          },
          {
            status: 200,
            id: "facematch",
            data: {
              score: 100
            },
            error: null
          },
          {
            status: 200,
            id: "template-matching",
            error: null
          },
          {
            status: 200,
            id: "document-reading",
            data: {
              fullName: {
                value: "SOLOMON MUGWIMA GITHIRA",
                label: "Name",
                required: true
              },
              emissionDate: {
                value: "2012-12-24",
                label: "Emission Date",
                required: false
              },
              documentNumber: {
                value: "31320509",
                label: "Document Number",
                required: true
              },
              dateOfBirth: {
                value: "1994-06-17",
                label: "Day of Birth",
                required: true
              },
              expirationDate: {
                value: "2070-12-31",
                label: "Date of Expiration",
                required: false
              },
              documentType: {
                value: "ID",
                label: "Document Type",
                required: false
              },
              firstName: {
                value: "SOLOMON MUGWIMA",
                label: "First Name",
                required: false
              },
              issueCountry: {
                value: "KYA",
                label: "Issue Country",
                required: false
              },
              optional2: {
                value: "234918838",
                label: "Optional 2",
                required: false
              },
              sex: {
                value: "M",
                label: "Sex",
                required: false
              },
              surname: {
                value: "GITHIRA",
                label: "Surname",
                required: false
              }
            },
            error: null
          },
          {
            status: 200,
            id: "watchlists",
            error: null
          }
        ],
        fields: {
          dateOfBirth: {
            value: "1994-06-17"
          },
          documentNumber: {
            value: "31320509"
          },
          documentType: {
            value: "ID"
          },
          emissionDate: {
            value: "2012-12-24"
          },
          expirationDate: {
            value: "2070-12-31"
          },
          firstName: {
            value: "SOLOMON MUGWIMA"
          },
          fullName: {
            value: "SOLOMON MUGWIMA GITHIRA"
          },
          issueCountry: {
            value: "KYA"
          },
          optional2: {
            value: "234918838"
          },
          sex: {
            value: "M"
          },
          surname: {
            value: "GITHIRA"
          }
        },
        photos: [
          "https://media.getmati.com/file?location=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlTmFtZSI6IjBmZDI4NGFmLWIwNDMtNDIwMy04ZDYxLWE4YmNmNzdhNWZlYy5qcGVnIiwiZm9sZGVyIjoiZG9jdW1lbnQiLCJpYXQiOjE2NTY2NzA5NzIsImV4cCI6MTY1Njc1NzM3MiwiYXVkIjoiYzkyNmQ1MDItYmEzYi00N2FhLTg0YjItZjJmZGNiODQxYjdlIn0.lTAa3Zru08RKnnuGKSqcn5Rcvnz4V70EG81679Yx764",
          "https://media.getmati.com/file?location=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlTmFtZSI6IjQxNDFiZmViLTA3OGItNDRhZS1hZDNlLTU4YjAzYjE0MTM4OC5qcGVnIiwiZm9sZGVyIjoiZG9jdW1lbnQiLCJpYXQiOjE2NTY2NzA5NzIsImV4cCI6MTY1Njc1NzM3MiwiYXVkIjoiYzkyNmQ1MDItYmEzYi00N2FhLTg0YjItZjJmZGNiODQxYjdlIn0.Lw3GjCevtMzpmbrY-GNEQr2XdtkrgO0kP_Q9gGuwka8"
        ]
      }
    ],
    expired: false,
    flow: {
      id: "62bc6671e1ec51001cbe0466",
      name: "hotel.veriphy.co"
    },
    identity: {
      status: "verified"
    },
    steps: [
      {
        status: 200,
        id: "selfie",
        data: {
          selfiePhotoUrl: "https://media.getmati.com/file?location=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlTmFtZSI6IjhkNDZhOWY1LTA5OTgtNDkwZi1iNWY3LWI3MGQzY2E2MDZiMC5qcGVnIiwiZm9sZGVyIjoiZG9jdW1lbnQiLCJpYXQiOjE2NTY2NzA5NzIsImV4cCI6MTY1Njc1NzM3MiwiYXVkIjoiYzkyNmQ1MDItYmEzYi00N2FhLTg0YjItZjJmZGNiODQxYjdlIn0.3LeeOuqRSb3HIHhc-uz_c9Ixyzae7s3E_1b1xbYmTFU"
        },
        error: null
      }
    ],
    id: "62beca341198f7001c2875fd",
    deviceFingerprint: {
      ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
      browser: {
        name: "Chrome",
        version: "103.0.0.0",
        major: "103"
      },
      engine: {
        name: "Blink",
        version: "103.0.0.0"
      },
      os: {
        name: "Windows",
        version: "10"
      },
      cpu: {
        architecture: "amd64"
      },
      ip: "197.248.61.219",
      vpnDetectionEnabled: false
    },
    hasProblem: false
  }
 const {computed, documents, expired, flow, identity, steps, id,deviceFingerprint, hasProblem}= data;

 //console.log(documents[0].steps);
 //const {age, isDocumentExpired}=computed
 //console.log(isDocumentExpired.data.national_id );
 
 useEffect(()=>{
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
  });
  const handleWaiting = ()=>{
    console.log(backId)
    console.log(typeof backId)

    // const initialMinute = 3;
    
    // const  initialSeconds = 0
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

    if(minutes === 3){
      setProgress("10")
    }else if (minutes=== 2){
      setProgress("10")
    }else if(minutes === 1){
      setProgress("90")
    }else{
      setProgress("100")
    }
  }

  ///custom dialogue
   const submit = () => {
    confirmAlert({
      title: 'File type Error',
      message: 'This file is not supported. File type must be .JPE, .JPG , .PNG',
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
  };
  const [backId,setIdBack]= useState("");
  const checkSize= (e)=>{

    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    const fileExtension = file.name.split(".").at(-1);
    const allowedFileTypes = ["jpg", "png", "jpeg"];
    if (!allowedFileTypes.includes(fileExtension)) {
       // window.alert(`This file is not supported. File type must be ${allowedFileTypes.join(", ")}`);
        submit()
        setIdBack()
        return false;
    }else{
      console.log("allowed type!!!!")
     
      console.log(backId)
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
            setIdBack()
            return false;
          }else{
            console.log("ALLLOWED  TYPE AND SIZE!!!!")
            
          }
        }
       
       
      }
      setIdBack(e.target.files[0])

  
    

    }

  }
  return (
    <div>
        <div>
        <input type="file" name="document" onChange={(e)=>setSelfie(e.target.files[0])}/> selfie
          <input type="file" name="document" onChange={(e)=>setFrontId(e.target.files[0])}/>
          <input type="file" name="document" onChange={(e)=>checkSize(e)}/>
         <button
          onClick={()=>{handleWaiting()}}
         >
            {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
         </button>
         <div>
        { minutes === 0 && seconds === 0
            ? null
            : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
        {seconds*minutes}
      <Progress_bar bgcolor="#99ff66" progress={progress}  height={20} />
      <div class="progress">
  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "75%"}}></div>
</div>
     
        
         </div  >
    </div>
  )
}






