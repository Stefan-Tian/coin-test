import { useState, useEffect, useRef, useLayoutEffect } from 'react';

const useApiRequest = <P, R>(
  serviceCall: (params: P) => Promise<R>,
  serviceParams: P
) => {
  const [params, setParams] = useState<P>(serviceParams);
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    serviceCall(params)
      .then((data) => {
        if (!mountedRef.current) return;
        setLoading(false);
        setData(data);
      })
      .catch((error) => {
        if (!mountedRef.current) return;
        setLoading(false);
        setError(error);
      });
  }, [params]);

  return { data, loading, error, params, setParams };
};

export default useApiRequest;
