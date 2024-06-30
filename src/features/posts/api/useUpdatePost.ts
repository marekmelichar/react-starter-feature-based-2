import { baseUrl } from '@/constants'
import { POSTS_ROUTE } from '@/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Post } from '../types'
import { useDispatch } from 'react-redux'
import { setPostDetail } from '../store'
import { AxiosError } from '@/types'

export const useUpdatePost = (postId: string) => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const updatePost = async (updatedData: Post): Promise<Post> => {
    try {
      const res = await axios.put(
        `${baseUrl}/${POSTS_ROUTE}/${postId}`,
        updatedData
      )
      // Dispatch the action to update the store right after successfully updating the data
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

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      // Invalidate and refetch the post query to ensure the updated data is reflected
      queryClient.invalidateQueries({ queryKey: [`post-${postId}`] })
    },
    onError: (error) => {
      const axiosError = error as AxiosError
      // Perform side effects, like logging or showing notifications
      if (axiosError.response) {
        console.error(
          `Error updating post: ${axiosError.response.data?.message} (status: ${axiosError.response.status})`
        )
      } else {
        console.error(`Error updating post: ${axiosError.message}`)
      }
      // Optionally dispatch an action or show a notification to the user
    },
  })
}
