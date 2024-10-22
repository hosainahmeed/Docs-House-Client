import { useState, useEffect } from 'react';
import useAxiosPublic from "./useAxiosPublic";

export default function useDocs() {
  const [axiosPublic] = useAxiosPublic();
  const [docsData, setDocsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await axiosPublic.get("/doctorsProfile");
        setDocsData(response.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching doctors data');
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, [axiosPublic]);

  return { docsData, loading, error };
}
