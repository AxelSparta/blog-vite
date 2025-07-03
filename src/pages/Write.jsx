import { useEffect, useState, useContext, useRef } from 'react'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { AuthContext } from '../context/authContext'
import { createPost, editPost, getPost } from '../services/posts'

import { imageValidation } from '../validations/image.validation'
import {
  categoryValidation,
  contentValidation,
  titleValidation
} from '../validations/post.validation'

const Write = () => {
  // form control
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { currentUser } = useContext(AuthContext)
  const { postId } = useParams()
  const inputFile = useRef()

  useEffect(() => {
    // if user is not logged in redirect home
    if (!currentUser) navigate('/')
  }, [currentUser, navigate])

  useEffect(() => {
    // post to edit
    if (postId) {
      getPost(postId)
        .then(({ data }) => {
          setFile(data.image)
          setContent(data.content)
          setCat(data.category.toLowerCase())
          setTitle(data.title)
        })
        .catch(err => console.error(err))
    }
  }, [])

  // errors handlers
  const [errors, setErrors] = useState({
    title: { error: false, message: '' },
    content: { error: false, message: '' },
    image: { error: false, message: '' },
    category: { error: false, message: '' }
  })

  const handleImg = e => {
    const img = e.target.files[0]
    const { error: imgError, message: imgErrorMsg } = imageValidation(img, 2)
    if (imgError) {
      setErrors(prev => ({
        ...prev,
        image: { error: imgError, message: imgErrorMsg }
      }))
      setFile(null)
    } else {
      setErrors(prev => ({
        ...prev,
        image: { error: false, message: '' }
      }))
      setFile(img)
    }
  }

  const clearImg = e => {
    e.preventDefault()
    setFile(null)
    inputFile.current.value = ''
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // VALIDATIONS
    const { error: titleError, message: titleErrorMsg } = titleValidation(title)
    const { error: contError, message: contErrorMsg } =
      contentValidation(content)
    const { error: catError, message: catErrorMsg } = categoryValidation(cat)

    if (titleError || contError || catError) {
      setErrors(prev => ({
        ...prev,
        title: { error: titleError, message: titleErrorMsg },
        content: { error: contError, message: contErrorMsg },
        category: { error: catError, message: catErrorMsg }
      }))
    } else {
      // UPLOAD POST OR EDIT POST
      setLoading(true)
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      formData.append('image', file)
      formData.append('category', cat)
      try {
        if (postId) {
          await editPost(formData, postId)
        } else {
          await createPost(formData)
        }
        setLoading(false)
        navigate('/')
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className='flex justify-center min-h-screen items-center pt-20'>
      <form className='flex flex-col items-center rounded-lg shadow-lg border border-gray-300 w-4/5 max-w-4xl p-4 relative'>
        {loading && <Loader format='rounded-lg z-10' />}

        <input
          className='w-full py-2 px-4 border border-gray-400 rounded-sm font-bold text-base text-gray-700 focus:outline-hidden focus:border-gray-700'
          placeholder='title'
          type='text'
          name='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        {errors.title.error && (
          <p className='error-message'>{errors.title.message}</p>
        )}

        <ReactQuill
          className='w-full mt-4 h-44 mb-16'
          theme='snow'
          value={content}
          onChange={setContent}
          placeholder='Content'
        />
        {errors.content && (
          <p className='error-message'>{errors.content.message}</p>
        )}

        <input
          type='file'
          id='file'
          name='file'
          className='hidden'
          onChange={handleImg}
          ref={inputFile}
        />
        <div className='flex mt-4'>
          <label
            className='border py-2 px-4 rounded-lg border-gray-800 text-gray-800 hover:text-white hover:bg-gray-800 mx-2'
            htmlFor='file'
          >
            Upload image
          </label>
          {file && (
            <button
              className='border py-2 px-4 rounded-lg border-gray-800 text-gray-800 hover:text-white hover:bg-gray-800 cursor-default mx-2'
              onClick={clearImg}
            >
              Clear image
            </button>
          )}
        </div>
        {file && (
          <img
            className='w-full h-80 object-cover my-2'
            src={file.url || URL.createObjectURL(file)}
            alt='prev-img'
          />
        )}
        {errors.image.error && (
          <p className='error-message'>{errors.image.message}</p>
        )}

        <div className='w-full flex justify-center flex-wrap gap-2 mt-4 text-gray-800'>
          <div>
            <input
              type='radio'
              checked={cat === 'art'}
              name='cat'
              value='art'
              id='art'
              onChange={e => setCat(e.target.value)}
            />
            <label htmlFor='art'>Art</label>
          </div>
          <div>
            <input
              type='radio'
              checked={cat === 'science'}
              name='cat'
              value='science'
              id='science'
              onChange={e => setCat(e.target.value)}
            />
            <label htmlFor='science'>Science</label>
          </div>
          <div>
            <input
              type='radio'
              checked={cat === 'technology'}
              name='cat'
              value='technology'
              id='technology'
              onChange={e => setCat(e.target.value)}
            />
            <label htmlFor='technology'>Technology</label>
          </div>
          <div>
            <input
              type='radio'
              checked={cat === 'cinema'}
              name='cat'
              value='cinema'
              id='cinema'
              onChange={e => setCat(e.target.value)}
            />
            <label htmlFor='cinema'>Cinema</label>
          </div>
          <div>
            <input
              type='radio'
              checked={cat === 'design'}
              name='cat'
              value='design'
              id='design'
              onChange={e => setCat(e.target.value)}
            />
            <label htmlFor='design'>Design</label>
          </div>
          <div>
            <input
              type='radio'
              checked={cat === 'food'}
              name='cat'
              value='food'
              id='food'
              onChange={e => setCat(e.target.value)}
            />
            <label htmlFor='food'>Food</label>
          </div>
        </div>
        {errors.category && (
          <p className='error-message'>{errors.category.message}</p>
        )}

        <button
          onClick={handleSubmit}
          className='mt-4 py-2 px-8 border border-blue-700 text-blue-700 rounded-sm hover:bg-blue-700 hover:text-white cursor-default'
        >
          Post
        </button>
      </form>
    </div>
  )
}

export default Write
