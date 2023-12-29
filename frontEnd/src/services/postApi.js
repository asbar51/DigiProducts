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
        getMyProducts: builder.query({
            query: () => '/my_products'
        }),
        getPost: builder.query({
            query: (id) => `/${id}`
        }),
        addPost: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'post',
                body
            })
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
        }),
        UpdatePost: builder.mutation({
            query: ({id,formData}) => ({
                url: `/${id}`,
                method: 'PUT',
                body : formData
            })
        }),
        addToCart: builder.mutation({
            query: (id) => ({
                url: `/add_to_cart/${id}`,
                method: 'post'
            })
        }),
        getFromCart: builder.query({
            query: () => ({
                url: `/get_from_cart`
            })
        }),
        removeFromCart: builder.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'delete'
            })
        }),
    })
})

export const {useGetAllPostsQuery,useGetPostQuery,useAddPostMutation,useDeletePostMutation,
    useUpdatePostMutation,useGetMyProductsQuery,useAddToCartMutation,useGetFromCartQuery,useRemoveFromCartMutation} = postApi