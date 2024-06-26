import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { AppState } from '../app/store'
import {
  User,
  UserInfo,
  UserAuthToken,
  UserRegister,
  UserLoginRequest,
  Address,
  AddressCreateDto,
  OrderReadDto,
  OrderCreateDto,
  ReviewReadDto,
  ReviewCreateDto,
  ReviewUpdateDto,
  UserUpdateInput
} from '../misc/type'
import { API_URL } from '../misc/utils'

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as AppState).user.token?.accessToken
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      headers.set('Content-Type', 'application/json')
      return headers
    }
  }),
  endpoints: (builder) => ({
    register: builder.mutation<User, UserRegister>({
      query: (credentials) => ({
        url: '/users',
        method: 'POST',
        body: credentials
      })
    }),
    login: builder.mutation<UserAuthToken, UserLoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      }),
      transformResponse: (response: UserAuthToken) => {
        return response
      }
    }),
    getUser: builder.query<UserInfo, void>({
      query: () => ({ url: '/users/profile' }),
      transformResponse: (response: User) => {
        const { id, role, firstName, lastName, email, avatar } = response
        return {
          id,
          role,
          firstName,
          lastName,
          email,
          avatar
        }
      }
    }),
    updateUser: builder.mutation<boolean, UserUpdateInput>({
      query: (request) => ({
        url: '/users/profile',
        method: 'PUT',
        body: request
      }),
      transformResponse: (response: boolean) => {
        return response
      }
    }),
    getRefreshToken: builder.mutation<UserAuthToken, { refreshToken: string }>({
      query: (refreshToken) => ({
        url: '/auth/refresh-token',
        method: 'POST',
        body: refreshToken
      })
    }),
    getUserAddresses: builder.query<Address[], void>({
      query: () => ({ url: '/users/addresses' }),
      transformResponse: (response: Address[]) => {
        return response
      }
    }),
    getUserOrders: builder.query<OrderReadDto[], void>({
      query: () => ({ url: '/users/orders' }),
      transformResponse: (response: OrderReadDto[]) => {
        return response
      }
    }),
    createAddress: builder.mutation<Address, AddressCreateDto>({
      query: (credentials) => ({
        url: '/addresses',
        method: 'POST',
        body: credentials
      }),
      transformResponse: (response: Address) => {
        return response
      }
    }),
    createOrder: builder.mutation<OrderReadDto, OrderCreateDto>({
      query: (credentials) => ({
        url: '/orders',
        method: 'POST',
        body: credentials
      }),
      transformResponse: (response: OrderReadDto) => {
        return response
      }
    }),
    createReview: builder.mutation<ReviewReadDto, ReviewCreateDto>({
      query: (credentials) => ({
        url: '/reviews',
        method: 'POST',
        body: credentials
      }),
      transformResponse: (response: ReviewReadDto) => {
        return response
      }
    }),
    updateReview: builder.mutation<boolean, ReviewUpdateDto>({
      query: (request) => ({
        url: `/reviews/${request.reviewId}`,
        method: 'PUT',
        body: request
      }),
      transformResponse: (response: boolean) => {
        return response
      }
    }),
    deleteReview: builder.mutation<boolean, { id: string }>({
      query: (request) => ({
        url: `/reviews/${request.id}`,
        method: 'DELETE'
      }),
      transformResponse: (response: boolean) => {
        return response
      }
    })
  })
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useGetRefreshTokenMutation,
  useGetUserAddressesQuery,
  useCreateAddressMutation,
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useUpdateUserMutation
} = authApi

 export default authApi