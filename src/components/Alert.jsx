const Alert = ({ message, deleteAlert }) => {
  const handleClick = e => {
    deleteAlert()
  }
  return (
    <div className='fixed bottom-0 w-full left-0 p-4 bg-green-600 flex justify-between items-center z-20'>
      <p className='text-lg'>{message}</p>
      <button
        className='text-gray-800 hover:text-gray-900 text-xl px-4 border border-gray-800 rounded-sm py-1'
        onClick={handleClick}
      >
        X
      </button>
    </div>
  )
}

export default Alert
