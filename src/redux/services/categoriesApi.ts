import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PRODUCTS_BASE_API_URL } from '@env';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com',
  }),
  endpoints: builder => ({
    getAllCategories: builder.query<any, void>({
      query: () => '/products/categories',
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesApi;
