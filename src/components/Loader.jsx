import { Blocks } from 'react-loader-spinner'

const Loader = ({ format }) => {
  return (
    <div
      className={`${format} bg-gray-800 bg-opacity-70 absolute top-0 left-0 w-full h-full flex justify-center items-center`}
    >
      <Blocks
        visible={true}
        height='70'
        width='70'
        ariaLabel='blocks-loading'
        wrapperClass='blocks-wrapper'
      />
    </div>
  )
}

export default Loader
