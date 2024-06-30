import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import { useAppSelector } from '@/store'
import { useGetPostById, useUpdatePost } from '../api'
import { setPostDetail } from '../store'

type Inputs = {
  postTitle: string
  postBody: string
}

export const PostDetailPage = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { id = '' } = useParams()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<Inputs>()

  const { error: getPostError, isLoading: isPostLoading } = useGetPostById(id)
  const {
    mutate: mutateUpdatePost,
    isSuccess: isSuccessUpdatePost,
    isPending: isPendingUpdatePost,
  } = useUpdatePost(id)

  const post = useAppSelector((state) => state.postDetail)

  useEffect(() => {
    if (getPostError?.message) {
      enqueueSnackbar(`Post error: ${getPostError.message}`, {
        variant: 'success',
      })
    }
  }, [getPostError])

  useEffect(() => {
    if (isSuccessUpdatePost) {
      enqueueSnackbar('Post updated successfully!', { variant: 'success' })
    }
  }, [isSuccessUpdatePost])

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)

    mutateUpdatePost({
      id: post.id,
      userId: post.userId,
      title: post.title,
      body: post.body,
    })
  }

  return (
    <>
      {isPostLoading ? (
        <div>{t('App.Loading')}</div>
      ) : (
        <Box sx={{ marginTop: '1.5rem', marginBottom: '5rem' }}>
          <Typography
            variant='h1'
            sx={{
              marginTop: '3rem',
            }}
          >
            <b>{post.id}</b>
          </Typography>
          <Controller
            name='postTitle'
            control={control}
            rules={{
              required: 'Post title is required.',
            }}
            render={({ field: { value, onChange } }) => {
              const handleTitleChange = useCallback(
                (event: any) => {
                  dispatch(
                    setPostDetail({
                      ...post,
                      title: event.target.value,
                    })
                  )
                  onChange(event)
                },
                [dispatch, post, onChange]
              )

              return (
                <TextField
                  value={post.title}
                  onChange={handleTitleChange}
                  id='post-title'
                  label='Post title'
                  fullWidth
                  sx={{
                    marginTop: '3rem',
                  }}
                />
              )
            }}
          />
          {errors.postTitle?.message && (
            <FormHelperText error>{errors.postTitle?.message}</FormHelperText>
          )}

          <Controller
            name='postBody'
            control={control}
            rules={{
              required: 'Post body is required.',
            }}
            render={({ field: { value, onChange } }) => {
              const handleBodyChange = useCallback(
                (event: any) => {
                  dispatch(
                    setPostDetail({
                      ...post,
                      body: event.target.value,
                    })
                  )
                  onChange(event)
                },
                [dispatch, post, onChange]
              )

              return (
                <TextField
                  value={post.body}
                  onChange={handleBodyChange}
                  multiline
                  id='post-body'
                  label='Post body'
                  fullWidth
                  sx={{
                    marginTop: '3rem',
                  }}
                />
              )
            }}
          />
          {errors.postBody?.message && (
            <FormHelperText error>{errors.postBody?.message}</FormHelperText>
          )}

          <Box
            sx={{
              textAlign: 'right',
            }}
          >
            <Button
              sx={{ marginTop: '1.5rem' }}
              onClick={handleSubmit(onSubmit)}
            >
              {t('App.Save')}
              {isPendingUpdatePost && (
                <CircularProgress
                  disableShrink
                  size={'30px'}
                  sx={{ position: 'absolute', top: '3px' }}
                />
              )}
            </Button>
          </Box>
        </Box>
      )}
    </>
  )
}
