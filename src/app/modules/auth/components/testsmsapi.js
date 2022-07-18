import React, {useEffect, useState} from 'react'
import axios from 'axios'
import OtpInput from 'react-otp-input'

export default function Testsmsapi() {
  const [otp, setOtp] = useState(new Array(4).fill(''))
  let optcode = Math.floor(1000 + Math.random() * 9000)
  console.log(optcode)
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])
    ///focus on next box
    if (element.nextSibling) {
      element.nextSibling.focus()
    }
  }
  const sendSms = async () => {
    try {
      let headerswH = JSON.stringify({
        'content-Type': 'application/json',
        'X-Authorization': 'ZjcwZGY5MDFhNTUyYjFlOTQ2NDBkYzYzNWIyZWUx',
        email: 'info@veriphy.co',
        'Cache-Control': 'no-cache',
      })
      let dataFrom = JSON.stringify({
        data: [
          {
            message_bag: {
              numbers: '0716720612',
              message: 'Messagefromthefirstbag',
              sender: 'DEPTHSMS',
            },
          },
          {
            message_bag: {
              numbers: '0702591509',
              message: 'Messageinbag from the websit3',
              sender: 'VERIPHY',
            },
          },
        ],
      })
      console.log(typeof headerswH)
      const Send = await axios({
        method: 'post',
        url: 'https://cors-anywhere.herokuapp.com/https://ujumbesms.co.ke/api/messaging',
        headers: headerswH,
        body: dataFrom,
      })

      // console.log(Send)
      console.log('hapa hapa')
      console.log('called for SNMSi SENDING AaI!')
    } catch (error) {
      console.log(error)
      console.log('error on otp sending')
    }

    // console.log('ia am outside the try catch block')
  }

  useEffect(() => {
    // sendSms()
  }, [])
  return (
    <div className='testDIV'>
      TSETING fsdfsf THE PAI
      <button
        type='button'
        className='btn btn-primary'
        data-toggle='modal'
        data-target='#exampleModalCenter'
      >
        Launch demo modal
      </button>
      <div
        className='modal fade'
        id='exampleModalCenter'
        tabindex='-1'
        role='dialog'
        aria-labelledby='exampleModalCenterTitle'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalCenterTitle'>
                Enter the 4-digits Verification code to continue {otp.join('')}
              </h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              {otp.map((data, index) => {
                return (
                  <input
                    className='otp-field'
                    type='text'
                    name='otp'
                    maxLength='1'
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
              <button type='button' className='btn btn-primary'>
                Veriphy OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
