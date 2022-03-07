import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRequest = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const baseUrl = 'http://localhost:3005';

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        setData(null);
        const response = await axios(`${baseUrl}/${endpoint}`);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (endpoint) load();
  }, [endpoint]);

  return { loading, error, data };
};
