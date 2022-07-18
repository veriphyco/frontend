// @ts-nocheck
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'


type Props = {
  className: string
}

const TablesWidget10: React.FC<Props> = ({className}) => {

  const [users, setUsers]= useState([]);
  console.log(users)
  useEffect(()=>{
    const extractUsers =async()=>{
      try{
        const data = await axios.get('/api/onboarding/registeredusers');
       // console.log(data.data)
        setUsers(data.data)
        const actualUsers = data.data;
      }catch(err){
     console.log(err)
      }
    }
    extractUsers();
    console.log('hahakdie')
  },[])
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Users</span>
          <span className='text-muted mt-1 fw-bold fs-7'>List of users in the database</span>
        </h3>
        {/* <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <a
            href='#'
            className='btn btn-sm btn-light-primary'
            // data-bs-toggle='modal'
            // data-bs-target='#kt_modal_invite_friends'
          >
            <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
            New Member
          </a>
        </div> */}
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted'>
                <th className='w-25px'>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value='1'
                      data-kt-check='true'
                      data-kt-check-target='.widget-9-check'
                    />
                  </div>
                </th>
                <th className='min-w-150px'>User</th>
                <th className='min-w-140px'>Phone Number</th>
                <th className='min-w-120px'>ID Number</th>
                <th className='min-w-100px text-end'>Action</th>
               
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {users.map((user)=>
               <tr key={user._id}>
               <td>
                 <div className='form-check form-check-sm form-check-custom form-check-solid'>
                   <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                 </div>
               </td>
               <td>
                 <div className='d-flex align-items-center'>
                   <div className='symbol symbol-45px me-5'> 
                       <img src={user.selfie} alt='veriphy' />  
                       
                   </div>
                   <div className='d-flex justify-content-start flex-column'>
                     <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                      { user.firstName} {user.lastName}
                     </a>
                     <span className='text-muted fw-bold text-muted d-block fs-7'>
                     {user.email}
                     </span>
                   </div>
                 </div>
               </td>
               <td>
                 <a href='#' className='text-muted fw-bold text-muted d-block fs-7'>
               {user.phoneNumber}
                 </a>
                 <span className='text-muted fw-bold text-muted d-block fs-7'>
                {user.country}
                 </span>
               </td>
               <td className='text-muted fw-bold text-muted d-block fs-7'>
               {user.idNumber}
               </td>
               <td>
                <Link to="/crafted/pages/profile/overview"  state= {{from: user._id}} >
                 <button className='btn btn-sm btn-primary w-70 mb-5'>
                 View Details
                 </button>
                 </Link>
                
               </td>
             
             </tr>
              )}
             
           
           
          
            
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {TablesWidget10}
