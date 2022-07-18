/* eslint-disable jsx-a11y/anchor-is-valid */
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
/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
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
        const data = await axios.post('/users/login', {
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
          settriggerModal('')
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
          const sendOtp = async () => {
            //     // console.log(firstName, email)
            try {
              const ResponseData = await axios.post('/api/ujumbesms', {
                phoneNumber,
                otpno,
              })
              // console.log(ResponseData)
            } catch (error) {
              console.log(error)
              console.log('error on email sending')
            }
          }
          getUser()
          sendOtp()
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
        // navigate('/auth/regstration')
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
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Sign In to Veriphy</h1>
        <div className='text-gray-400 fw-bold fs-4'>
          New Here?{' '}
          <Link to='/auth/registration' className='link-primary fw-bolder'>
            Create an Account
          </Link>
        </div>
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
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
            {/* end::Label */}
            {/* begin::Link */}
            <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{marginLeft: '5px'}}
            >
              Forgot Password ?
            </Link>
            {/* end::Link */}
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          placeholder='Password'
          {...formik.getFieldProps('password')}
          className='form-control form-control-lg form-control-solid'
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.password}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}
      {/* modal for otp starts here */}
      <div
        style={{pointerEvents: 'none', display: 'none'}}
        className='modal fade'
        id='exampleModalCenter'
        role='dialog'
        aria-labelledby='exampleModalCenterTitle'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalCenterTitle'>
                Enter the 4-digits Verification code to continue
              </h5>

              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              {otpError && (
                <div className='alert alert-danger' role='alert'>
                  {otpError}
                </div>
              )}
              {otp.map((data, index) => {
                return (
                  <input
                    className='otp-field'
                    type='text'
                    name='otp'
                    maxLength={1}
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                  />
                )
              })}
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-dismiss='modal'>
                Close
              </button>
              <button type='button' onClick={() => veriphyOTP()} className='btn btn-primary'>
                {!loadingOtp && <span className='indicator-label'>Veriphy OTP</span>}
                {loadingOtp && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal for otp ends here */}

      {/* begin::Action */}
      <div className='text-center'>
        {!validated ? (
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
        ) : (
          <button
            type='submit'
            className='btn btn-lg btn-primary w-100 mb-5'
            data-toggle='modal'
            data-target='#exampleModalCenter'
          >
            <span className='indicator-label'>Click to veriphy OTP</span>
          </button>
        )}

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
  )
}
