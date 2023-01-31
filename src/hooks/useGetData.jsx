import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useGetData ({ url }) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const res = await axios(url)
      console.log(res)
      setLoading(false)
    }

    getData()
  }, [])

  return { loading, data }
}
