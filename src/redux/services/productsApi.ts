import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  endpoints: builder => ({
    getAllProducts: builder.query<any, void>({
      query: () => `/products`,
    }),
    getProductById: builder.query<any, number>({
      query: productId => `/products/${productId}`,
    }),
    getProductsByCategory: builder.query<any, string>({
      query: productCategory => `/products/${productCategory}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery, useGetProductsByCategoryQuery } =
  productsApi;
