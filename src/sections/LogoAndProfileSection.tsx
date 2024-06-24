import React from 'react'
import logo from '../assets/logo.svg'
import profile from '../assets/profile.svg'

const LogoAndProfileSection = () => {
  return (
    <div className='w-full md:w-2/12 px-5 py-2 md:p-7 flex flex-row md:flex-col justify-between'>
        <img src={logo} alt='logo' className='h-10 w-32' />
        <div className=''>
            <img src={profile} alt='profile' className='w-12 h-12' />
        </div>
    </div>
  )
}

export default LogoAndProfileSection