import { useState, useEffect } from 'react';

const useApiRequest = <P, R>(
  serviceCall: (params: P) => Promise<R>,
  serviceParams: P
) => {
  const [params, setParams] = useState<P>(serviceParams);
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    serviceCall(params)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [params]);

  return { data, loading, error, setParams };
};

export default useApiRequest;
