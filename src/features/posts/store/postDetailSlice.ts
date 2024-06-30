import { createSlice } from '@reduxjs/toolkit'
import { Post } from '../types'

const initialState: Post = {
  userId: 0,
  id: 0,
  title: '',
  body: '',
}

const postDetailSlice = createSlice({
  name: 'postDetail',
  initialState,
  reducers: {
    setPostDetail(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { setPostDetail } = postDetailSlice.actions

export default postDetailSlice.reducer
