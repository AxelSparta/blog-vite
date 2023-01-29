import { useEffect, useState, useContext } from 'react'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { createPost } from '../services/posts'

import { imageValidation } from '../validations/image.validation'
import {
  categoryValidation,
  contentValidation,
  titleValidation
} from '../validations/post.validation'

const Write = () => {
  const state = useLocation().state
  const navigate = useNavigate()

  const { currentUser } = useContext(AuthContext)

  const [title, setTitle] = useState(state?.desc || '')
  const [content, setContent] = useState(state?.title || '')
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState(state?.cat || '')

  const [errors, setErrors] = useState({
    title: { error: false, message: '' },
    content: { error: false, message: '' },
    image: { error: false, message: '' },
    category: { error: false, message: '' }
  })

  useEffect(() => {
    if (!currentUser) navigate('/')
  }, [currentUser, navigate])

  const validateTitle = () => {
    const titleValidationResult = titleValidation(title)
    if (titleValidationResult.error) {
      setErrors(prev => ({
        ...prev,
        title: { error: true, message: titleValidationResult.message }
      }))
      return true
    } else {
      setErrors(prev => ({ ...prev, title: { error: false, message: '' } }))
      return false
    }
  }

  const validateCont = () => {
    const contValidationResult = contentValidation(content)
    if (contValidationResult.error) {
      setErrors(prev => ({
        ...prev,
        content: { error: true, message: contValidationResult.message }
      }))
      return true
    } else {
      setErrors(prev => ({
        ...prev,
        content: { error: false, message: '' }
      }))
      return false
    }
  }

  const handleImg = e => {
    let img = e.target.files[0]
    const resultImgValidation = imageValidation(img, 2)
    if (resultImgValidation.error) {
      setErrors(prev => ({
        ...prev,
        image: { error: true, message: resultImgValidation.message }
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

  const validateCat = () => {
    const catValidationResult = categoryValidation(cat)
    if (catValidationResult.error) {
      setErrors(prev => ({
        ...prev,
        category: { error: true, message: catValidationResult.message }
      }))
      return true
    } else {
      setErrors(prev => ({
        ...prev,
        category: { error: false, message: '' }
      }))
      return false
    }
  }

  const handleClick = async e => {
    e.preventDefault()
    const isTitleValid = validateTitle()
    const isContValid = validateCont()
    const isCatValid = validateCat()
    if (!isTitleValid && !isContValid && !isCatValid) {
      // UPLOAD POST
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      formData.append('image', file)
      formData.append('category', cat)
      try {
        let res = await createPost(formData)
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className='flex justify-center min-h-screen items-center pt-20'>
      <form className='flex flex-col items-center rounded-lg shadow-lg border border-gray-300 w-4/5 max-w-4xl p-4'>
        <input
          className='w-full py-2 px-4 border rounded font-bold text-xl text-gray-700 focus:outline-none focus:border-gray-700'
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
          className='overflow-scroll my-4 w-full'
          theme='snow'
          value={content}
          onChange={setContent}
        />
        {errors.content && (
          <p className='error-message'>{errors.content.message}</p>
        )}

        <input
          type='file'
          id='file'
          name=''
          className='hidden'
          onChange={handleImg}
          // (e) => setFile(e.target.files[0])
        />
        <label
          className='border py-2 px-4 rounded-lg border-gray-800 text-gray-800 hover:text-white hover:bg-gray-800'
          htmlFor='file'
        >
          Upload image
        </label>
        {file && (
          <img
            className='w-full h-80 object-cover my-2'
            src={URL.createObjectURL(file)}
            alt='prev-img'
          />
        )}
        {errors.image.error && (
          <p className='error-message'>{errors.image.message}</p>
        )}
        <div className='w-full flex justify-center flex-wrap gap-2 my-4 text-gray-800'>
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
          onClick={handleClick}
          className='py-2 px-4 border border-gray-800'
        >
          Post
        </button>
      </form>
    </div>
  )
}

export default Write
