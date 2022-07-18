// @ts-nocheck
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {Dropdown1} from '../../../_metronic/partials'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import jsPDF from 'jspdf';



const ProfileHeader: React.FC = () => {
  const [specificUser, setSpecificUser]= useState();


  const generatePdf= ()=>{
  
    let doc = new jsPDF('p', 'pt',"a4");
   
    doc.setFont('Lato-Regular', 'normal');
   // doc.setFont(undefined, 'bold')
    let img = new Image();
    const selfie= img.src = `${specificUser?.selfie}`;
    doc.addImage(selfie, 'png', 150, 40, 50, 50)
    img.src = '/media/logos/download.png';
    doc.addImage(img, 'png', 50, 30, 70, 70)
    doc.setFontSize(14)
    doc.setTextColor(0,0, 0);
    doc.text(350, 80, "GUEST REGISTRATION CARD")
    doc.line(350, 85, 530, 85); // horizontal line    
    doc.setLineWidth(0.5);      
    doc.text(50, 120, `SURNAME: ${specificUser?.lastName}`)
    doc.line(125, 125, 185, 125); // horizontal line  
    doc.text(200, 120, `FIRSTNAME: ${specificUser?.firstName}`)
    doc.line(280, 125, 370, 125); // horizontal line 
    doc.text(380, 120, `ID/PASSPORT: ${specificUser?.idNumber}`)
    doc.line(470, 125, 530, 125); // horizontal line 
    doc.text(50, 155, `ARRRIVAL:`)
    doc.line(125, 160, 185, 160); // horizontal line 
    doc.text(190, 155, `DEPARTURE:`)
    doc.line(280, 160, 350, 160); // horizontal line 
    doc.text(350, 155, `ADULTS/CHILD:`)
    doc.line(460, 160, 500, 160); // horizontal line 
    doc.text(500, 155, `NIGHTS:`)
   
     doc.text(50, 190, `ARRIVAL FROM:`)
     doc.line(165, 190, 310, 190); // horizontal line 
     doc.text(330, 190, `DEPARTING TO:`)
     doc.line(440, 190, 550, 190); // horizontal line 
     doc.text(50, 220, `ADDRESS:`)
     doc.line(130, 220, 310, 220); // horizontal line 
     doc.text(350, 220, `CITY/TOWN:`)
     doc.line(430, 220, 550, 220); // horizontal line 
     doc.text(50, 250, `POSTAL CODE: `)
     doc.line(145, 255, 190, 255); // horizontal line  
     doc.text(200, 250, `COUNTRY: ${specificUser?.country} `)
     doc.line(270, 255, 370, 255); // horizontal line 
     doc.text(380, 250, `TELEPHONE:${specificUser?.phoneNumber} `)
     doc.line(470, 255, 550, 255); // horizontal line 
     doc.text(50, 280, `NATIONALITY:${specificUser?.country} `)
     doc.line(145, 285, 260, 285); // horizontal line 
     doc.text(290, 280, `DATE OF BIRTH: ${specificUser?.dateOFBirth}`)
     doc.line(400, 285, 550, 285); // horizontal line 
      doc.text(50, 310, `EMAIL: ${specificUser?.email}`)
      doc.line(100, 315, 260, 315); // horizontal line 
      doc.text(290, 310, `VILLA: `)
      doc.line(350, 315, 570, 315); // horizontal line 
      doc.text(50, 340, `PAYMENT: `)
      doc.line(120, 345, 260, 345); // horizontal line 
      doc.text(260, 340, `CHECKED IN BY: ${specificUser?.fullNamesFromMeta}`)
     doc.line(370, 345, 580, 345); // horizontal line 
     doc.text(50, 375, `I fully understand that this cancellation or reduction of the number of nights stay at the hotel 
     will result in full cancelation charges as per the hotel policy.It is understood that full payment 
     must be made at the time of the check-in for all Direct  Guest not booked through an agent: `)

    doc.text(50, 430, `we the undersigned agree that the hotel and its management will not acccept any liability 
whatsoever or accidents, personal injury, death, loss and/or damage to persons and/ or 
personal effects.However caused. We will not accept any liability arising from use of pool ,
 spa the room and its content, orsourouding areas, The Main pool should not be
             used by children wihout adults supervision
                              `)

     doc.text(50, 530, `For general hotel policies and regulations please note that you can get all 
                        the neccessary information at the reception`)
  doc.text(50, 580, `CHECK IN TIME:`)
  doc.line(160, 585, 345, 585); // horizontal line 
  doc.text(350, 580, `CHECKOUT TIME:`)
  doc.line(470, 590, 570, 590); // horizontal line 
  doc.text(50, 640, `GUEST SIGNATURE:`)
  doc.line(180, 645, 345, 645); // horizontal line 
  doc.text(350, 640, `DATE:`)
  doc.line(390, 645, 570, 645); // horizontal line 
 // doc.line(50, 660, 570, 660); // horizontal line 
  doc.text(50, 700, `Platform which you booked through:`)
  doc.line(255, 705, 570, 705); // horizontal line 
  doc.text(50, 730, `How did you hear about us? Internet (which website):`)
  doc.line(355, 735, 570, 735); // horizontal line 
  doc.text(50, 760, `Agency Which one:`)
  doc.line(170, 765, 570, 765); // horizontal line 
  doc.text(50, 790, `One More:`)
  doc.line(120, 795, 570, 795); // horizontal line 
  doc.text(150, 820, `We Hope you enjoy your stay with us!:`)
    doc.addPage() // this code creates new page in pdf document
    doc.setFont('helvetica')
    doc.setFont(undefined, 'normal')
    doc.text(300, 30, 'Below are your submited documents', {align:'center'})

   const image1= img.src = `${specificUser?.frontIdimg}`;
    doc.addImage(image1, 'png', 40, 70, 100, 70)

    const image2= img.src = `${specificUser?.backIdImg}`;
    doc.addImage(image2, 'png', 200, 70, 100, 70)

    const image3= img.src = `${specificUser?.selfie}`;
    doc.addImage(image3, 'png', 350, 70, 100, 70)
    
    doc.save(`${specificUser?.firstName}.pdf`)
    //console.log("hakdfifo")
   }
 
  const location = useLocation()
  const { from  } = location?.state;
 // console.log(from)


  useEffect(()=>{
    const getUser =  async ()=>{
      try{
        const user= await axios.get(`/users/actualUser/specific/${from}`);
        setSpecificUser(user.data)
      }catch(err){
         console.log(err)
      }

    }
    getUser();
  
   
  },[])
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              <img src={specificUser?.selfie} alt='veriphy_profile_photo' />
              <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
            </div>
          </div>
{
  <div className='flex-grow-1'> 
  <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
    <div className='d-flex flex-column'>
      <div className='d-flex align-items-center mb-2'>
        <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
         {specificUser?.firstName}  {specificUser?.lastName}
        </a>
        <a href='#'>
          <KTSVG
            path='/media/icons/duotune/general/gen026.svg'
            className='svg-icon-1 svg-icon-primary'
          />
        </a>
      </div>

      <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
        <a
          href='#'
          className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
        >
          <KTSVG
            path='/media/icons/duotune/communication/com006.svg'
            className='svg-icon-4 me-1'
          />
          {specificUser?.idNumber}
        </a>
        <a
          href='#'
          className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
        >
          <KTSVG
            path='/media/icons/duotune/general/gen018.svg'
            className='svg-icon-4 me-1'
          />
       {specificUser?.country}
        </a>
        <a
          href='#'
          className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
        >
          <KTSVG
            path='/media/icons/duotune/communication/com011.svg'
            className='svg-icon-4 me-1'
          />
           {specificUser?.email}
        </a>
      </div>
    </div>

    <div className='d-flex my-4'>
      {/* <a href='#' className='btn btn-sm btn-light me-2' id='kt_user_follow_button'>
        <KTSVG
          path='/media/icons/duotune/arrows/arr012.svg'
          className='svg-icon-3 d-none'
        />

        <span className='indicator-label'>Follow</span>
        <span className='indicator-progress'>
          Please wait...
          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
        </span>
      </a> */}
      <button
    
        className='btn btn-sm btn-primary me-3' onClick={generatePdf}
      >
        Download PDF
      </button>
      
    
    
      <div className='me-0'>
        {/* <button
          className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
          data-kt-menu-trigger='click'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='top-end'
        >
          <i className='bi bi-three-dots fs-3'></i>
        </button> */}
        {/* <Dropdown1 /> */}
      </div>
    </div>
  </div>

  <div className='d-flex flex-wrap flex-stack'>
    <div className='d-flex flex-column flex-grow-1 pe-8'>
      <div className='d-flex flex-wrap'>
        <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
          <div className='d-flex align-items-center'>
            {/* <KTSVG
              path='/media/icons/duotune/arrows/arr066.svg'
              className='svg-icon-3 svg-icon-success me-2'
            /> */}
            <div className='fs-2 fw-bolder'>{specificUser?.docidentity ==="verified" ? "Verified" : `${specificUser?.docidentity}`} </div>
          </div>

          <div className='fw-bold fs-6 text-gray-400'>Document Status</div>
        </div>

        <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
          <div className='d-flex align-items-center'>
           
             <KTSVG
              path='/media/icons/duotune/arrows/arr066.svg'
              className='svg-icon-3 svg-icon-success me-2'
            />
            {/* <KTSVG
              path='/media/icons/duotune/arrows/arr065.svg'
              className='svg-icon-3 svg-icon-danger me-2'
            /> */}
              {/* <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div> */}
            
            <div className='fs-2 fw-bolder'> {specificUser?.docExpired === false ? "True" : "False" } </div>
          </div>

          <div className='fw-bold fs-6 text-gray-400'>Document is Valid</div>
        </div>

        <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
          <div className='d-flex align-items-center'>
            {/* <KTSVG
              path='/media/icons/duotune/arrows/arr066.svg'
              className='svg-icon-3 svg-icon-success me-2'
            /> */}
            <div className='fs-2 fw-bolder'>{specificUser?.sex}</div>
          </div>

          <div className='fw-bold fs-6 text-gray-400'>Gender</div>
        </div>
      </div>
    </div>

    <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
      <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
        <span className='fw-bold fs-6 text-gray-400'>Face match Score</span>
        <span className='fw-bolder fs-6'>{specificUser?.faceMatchScore}%</span>
      </div>
      <div className='h-5px mx-3 w-100 bg-light mb-3'>
        <div
          className='bg-success rounded h-5px'
          role='progressbar'
          style={{width: `${specificUser?.faceMatchScore}`}}
        ></div>
      </div>
    </div>
  </div>
</div>
}
         
        </div>

        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                state={{ from: "occupation" }}
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/overview' && 'active')
                }
                to='/crafted/pages/profile/overview'
              >
                Overview
              </Link>
            </li>
            {/* <li className='nav-item'>
              <Link
              state={{ from: "occupation" }}
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/projects' && 'active')
                }
                to='/crafted/pages/profile/projects'
              >
                Projects
              </Link>
            </li> */}
            {/* <li className='nav-item'>
              <Link
              state={{ from: "occupation" }}
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/campaigns' && 'active')
                }
                to='/crafted/pages/profile/campaigns'
              >
                Campaigns
              </Link>
            </li> */}
            {/* <li className='nav-item'>
              <Link
              state={{ from: "occupation" }}
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/documents' && 'active')
                }
                to='/crafted/pages/profile/documents'
              >
                Documents
              </Link>
            </li> */}
            {/* <li className='nav-item'>
              <Link
              state={{ from: "occupation" }}
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/connections' && 'active')
                }
                to='/crafted/pages/profile/connections'
              >
                Connections
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  )
}

export {ProfileHeader}
