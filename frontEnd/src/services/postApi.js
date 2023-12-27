import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/posts',
        credentials: 'include'
}),
    // keepUnusedDataFor:0,
    tagTypes: ['getAllPosts'],
    endpoints: (builder) => ({
        // CRUD
        getAllPosts: builder.query({
            query: () => '/'
        }),
        getPost: builder.query({
            query: (id) => `/${id}`
        }),
        addPost: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'post',
                body
            }),
            invalidatesTags: ['getAllPosts']
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['getAllPosts'],
        }),
        UpdatePost: builder.mutation({
            query: ({id,formData}) => ({
                url: `/${id}`,
                method: 'PUT',
                body : formData
            }),
            invalidatesTags: ['getAllPosts'],
        })
    })
})

export const {useGetAllPostsQuery,useGetPostQuery,useAddPostMutation,useDeletePostMutation,useUpdatePostMutation} = postApi