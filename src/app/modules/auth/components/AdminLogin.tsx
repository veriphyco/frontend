import {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import {getUserByToken, login} from '../core/_requests'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useAuth} from '../core/Auth'
import '../../../../_metronic/assets/css/style'
import axios from 'axios'

const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  })
  
  const initialValues = {
    email: '',
    password: '',
  }


  
  
export function Adminlogin() {
  // otp code starts here
  const [otp, setOtp] = useState(new Array(4).fill(''))

  const clietOpt = parseInt(otp.join(''), 10)

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])
    ///focus on next box
    if (element.nextSibling) {
      element.nextSibling.focus()
    }
  }
  // otp code ends here
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loadingOtp, setLoadingOtp] = useState(false)
  const [firstNamefromDb, setfirstNamefromDb] = useState('')
  const [phoneNumber, setphoneNumberFromDb] = useState('')
  const [email, setEmailOtp] = useState('')
  const [firstName, setfirstNameOtp] = useState('')
  const [otpno, setOtpNo] = useState(1020)
  const [otpError, setOtpErorr] = useState('')
  const [validated, setValidated] = useState(true)
  const [triggerModal, settriggerModal] = useState('')
  const [loggedIn, setLoggedIn] = useState('')
  const [serverErrorEmailPassword, setSERVERerorEmail] = useState('')

  const {saveAuth, setCurrentUser} = useAuth()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const valuestToSend = {
          email: values.email,
          password: values.password,
        }
        const email = valuestToSend.email
        const firstName = valuestToSend.email
        setEmailOtp(email)
        setfirstNameOtp(email)

        const password = valuestToSend.password
        const data = await axios.post('/admin/login', {
          email,
          password,
        })
        setSERVERerorEmail('')
        setLoggedIn('')
        //  console.log(data)
        // console.log(email)
        // console.log(password)
        const NameId = data.data._id
        if (data.data === 'Email does not Exist') {
          //navigate('/auth/registration')
          setSERVERerorEmail(data.data)
          setLoading(false)
        } else if (data.data === 'Invalid Password or Email') {
          setSERVERerorEmail(data.data)
          setLoading(false)
        } else {
        navigate('/dashboard')
          // console.log('hurray')
          //get That specific User from the database
          const getUser = async () => {
            //     // console.log(firstName, email)
            try {
              const ResponseData = await axios.post('/users/login/specific', {
                email,
              })
              // console.log(ResponseData)
              const firstNameResponse = ResponseData.data.firstName
              const phoneNumberFromDb = ResponseData.data.phoneNumber
              setfirstNamefromDb(firstNameResponse)
              setphoneNumberFromDb(phoneNumberFromDb)
              console.log(firstNameResponse, phoneNumberFromDb)
            } catch (error) {
              console.log(error)
              console.log('error on email sending')
            }
          }
          //sendOtp
          getUser()
          setValidated(true)
          //  navigate('/dashboard')
          setLoggedIn('Details Authenticated. Click Veriphy OTP Below to continue')
        }
        //navigate('/dashboard')
        // const {data: auth} = await login(values.email, values.password)
        // saveAuth(auth)
        // const {data: user} = await getUserByToken(auth.api_token)
        // setCurrentUser(user)
      } catch (error) {
        // console.error(error)
        // saveAuth(undefined)
        // setStatus('The login detail is incorrect')
        // setSubmitting(false)
        
        setLoading(false)
        console.log(error)
        navigate('/error/500')
      }
    },
  })

  //console.log(emailOTP)
  // console.log(firstNameOtp)
  // console.log(otpno)
  //console.log(otpno)
  const veriphyOTP = () => {
    setLoadingOtp(true)
    if (clietOpt == otpno) {
      setLoadingOtp(true)
      //send a welcome email to the users/client
      const sendEmail = async () => {
        //     // console.log(firstName, email)
        try {
          const Send = await axios.post('/users/login/sendemail', {
            email,
            firstName,
          })
        } catch (error) {
          console.log(error)
          console.log('error on email sending')
        }
      }
      sendEmail()
      navigate('/dashboard')
    } else {
      setLoadingOtp(false)
      setOtpErorr('Verification failed')
      
    }
  }
  useEffect(() => {
    let optcode = Math.floor(1000 + Math.random() * 9000)
    setOtpNo(optcode)
    setValidated(false)
  }, [])


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
       {/* custom admin code page begins here */}
       <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Sign In to Veriphy Admin</h1>
     
      </div>
      {/* begin::Heading */}

      {/* {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>
            Use account <strong>admin@demo.com</strong> and password <strong>demo</strong> to
            continue.
          </div>
        </div>
      )} */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        {serverErrorEmailPassword && (
          <div className='alert alert-danger' role='alert'>
            {serverErrorEmailPassword}
          </div>
        )}
        {loggedIn && (
          <div className='alert alert-success' role='alert'>
            {loggedIn}
          </div>
        )}
        <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}
    
      {/* begin::Form group */}
      <div className='fv-row mb-7'>
        <div className='d-flex justify-content-between mt-n5'>
        <label className='form-label fw-bolder text-dark fs-6 mt-5'>Password</label>
        <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{marginLeft: '5px'}}
            >
             
            </Link>
        </div>
        <input
          type='password'
          autoComplete='off'
          placeholder='Password'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.password && formik.errors.password},
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.password}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}
    

      {/* begin::Action */}
      <div className='text-center'>
        
          <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn btn-lg btn-primary w-100 mb-5'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>Continue</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
     

        {/* begin::Separator */}
        {/* <div className='text-center text-muted text-uppercase fw-bolder mb-5'>or</div> */}
        {/* end::Separator */}

        {/* begin::Google link */}
        {/* <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
            className='h-20px me-3'
          />
          Continue with Google
        </a> */}
        {/* end::Google link */}

        {/* begin::Google link */}
        {/* <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/facebook-4.svg')}
            className='h-20px me-3'
          />
          Continue with Facebook
        </a> */}
        {/* end::Google link */}

        {/* begin::Google link */}
        {/* <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')}
            className='h-20px me-3'
          />
          Continue with Apple
        </a> */}
        {/* end::Google link */}
      </div>
      {/* end::Action */}
    </form>
         {/* custom admin code page ends here */}
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

          <a href='welcome' className='text-muted text-hover-primary px-2'>
          Home
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
