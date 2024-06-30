import { baseUrl } from '@/constants'
import { POSTS_ROUTE } from '@/routes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Post } from '../types'

export const useGetPostsList = () => {
  const fetchData: () => Promise<Post[]> = async () => {
    const res = await axios.get(`${baseUrl}/${POSTS_ROUTE}`)
    return res.data
  }

  return useQuery({
    queryKey: ['postsList'],
    queryFn: fetchData,
  })
}
