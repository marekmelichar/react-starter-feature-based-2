// import { SerializedError } from '@reduxjs/toolkit'
// import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

// Define a type for the error response (optional, but recommended)
export interface AxiosError {
  response?: {
    data?: {
      message?: string
    }
    status?: number
  }
  message: string
}
