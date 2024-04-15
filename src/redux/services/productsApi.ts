import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { PRODUCTS_BASE_API_URL } from '@env';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: PRODUCTS_BASE_API_URL }),
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
