const { useState } = require("react");

export const useFetch = (cb) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await cb(...args);
     
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };



  return {  loading, error, fn };
};
