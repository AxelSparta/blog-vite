import React from 'react'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className='w-full bg-[#645CBB] text-white p-4'>
      <div className='max-w-5xl mx-auto'>
        <p className='text-center p-4'>
          Built by{' '}
          <a
            className='underline hover:text-gray-200'
            href='#'
            target='_blank'
            rel='noopener'
          >
            Axel Sparta
          </a>
        </p>
        <div className='flex justify-center'>
          <a
            className='underline hover:text-gray-200'
            href='https://www.linkedin.com/in/axel-sparta-web/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <AiFillLinkedin className='text-4xl mx-4' />
          </a>
          <a
            className='underline hover:text-gray-200'
            href='https://github.com/AxelSparta'
            target='_blank'
            rel='noopener noreferrer'
          >
            <AiFillGithub className='text-4xl mx-4' />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
