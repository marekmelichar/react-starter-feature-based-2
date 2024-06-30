import { baseUrl } from '@/constants'
import { POSTS_ROUTE } from '@/routes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Post } from '../types'
import { useDispatch } from 'react-redux'
import { setPostDetail } from '../store'
import { AxiosError } from '@/types'

export const useGetPostById = (postId: string) => {
  const dispatch = useDispatch()

  const fetchData: () => Promise<Post> = async () => {
    try {
      const res = await axios.get(`${baseUrl}/${POSTS_ROUTE}/${postId}`)
      // Dispatch the action to update the store right after successfully fetching the data
      dispatch(setPostDetail(res.data))
      return res.data
    } catch (error) {
      const axiosError = error as AxiosError
      // Handle the error as needed, e.g., log it or transform it
      if (axiosError.response) {
        console.error(
          `Error: ${axiosError.response.data?.message} (status: ${axiosError.response.status})`
        )
      } else {
        console.error(`Error: ${axiosError.message}`)
      }
      // Throw the error to let react-query handle it
      throw error
    }
  }

  return useQuery({
    queryKey: [`post-${postId}`],
    queryFn: fetchData,
  })
}
