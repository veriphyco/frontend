/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthPage, useAuth} from '../modules/auth'
import {App} from '../App'
import Testsmsapi from '../modules/auth/components/testsmsapi'
import { Take } from '../modules/auth/components/Take'
import { Singnature } from '../modules/auth/components/singature'
import { Termsandcondition } from '../modules/auth/components/termsAnCondition'
import { Backpage } from '../modules/auth/components/backpage'
import { Welcome } from '../modules/auth/components/welcome'
import { FrontPage } from '../modules/auth/components/frontpage'
import { Stkpush } from '../modules/auth/components/stkpush'
import { Adminlogin } from '../modules/auth/components/AdminLogin'
import Test from '../modules/auth/components/test'


/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {PUBLIC_URL} = process.env

const AppRoutes: FC = () => {
  const {currentUser} = useAuth()
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          {/* {currentUser ? ( */}
          <>     
            <Route path='/*' element={<PrivateRoutes />} />
            <Route index element={<Navigate to='/welcome' />} />
          </>
          {/* ) : (            */}
          <>
            <Route path='auth/*' element={<AuthPage />} />
            <Route path='*' element={<Navigate to='/auth' />} />
            <Route path='/apitest' element={<Testsmsapi />} />
            <Route path='/test' element={<Test />} />
            <Route path='/stkpush' element={<Stkpush />} />
            <Route path='/selfie' element={<Take />} />
            <Route path='/frontpage' element={<FrontPage />} />
            <Route path='/backpage' element={<Backpage />} />
            <Route path='/signature' element={<Singnature />} />
            <Route path='/welcome' element={<Welcome />} />
            <Route path='/termsandcondition' element={<Termsandcondition />} />
            <Route path='/admin/login' element={<Adminlogin />} />
          </>
          {/* )} */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
