import { useRef } from 'react'

export default function Dialog ({ message, handleDelete }) {
  const dialogContainer = useRef()

  const handleNo = e => {
    if (e.target === dialogContainer.current) {
      handleDelete(false)   
    }
  }
  return (
    <div
      ref={dialogContainer}
      className='fixed top-0 left-0 h-screen w-full bg-gray-700 flex items-center justify-center z-20 bg-opacity-80'
      onClick={handleNo}
    >
      <div className='bg-white w-72 text-center rounded p-4'>
        <h3 className='font-bold'>
          {message} Are you sure you want to delete it?
        </h3>
        <div className='flex justify-center mt-8'>
          <button onClick={e => handleDelete(true)} className='btn btn-red'>
            Yes
          </button>
          <button onClick={e => handleDelete(false)} className='btn'>
            No
          </button>
        </div>
      </div>
    </div>
  )
}
