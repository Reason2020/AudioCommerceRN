import { useEffect, useState } from 'react';

import { useGetAllProductsQuery } from '../redux/services/productsApi';

export const useFetchAllProducts = () => {
  const [products, setProducts] = useState([]);

  const { data, isLoading, error } = useGetAllProductsQuery();

  useEffect(() => {
    setProducts(data);
  }, [data]);

  return { products, isLoading, error };
};
