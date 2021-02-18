import { useState, useCallback, useEffect } from "react";

export default function useSection() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState(0);
  useEffect(() => {
    setLoading(true);
    fetch("/api/bulletin")
      .then(res => res.json())
      .then(setSections)
      .then(() => {
        console.log(sections);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [requestId]);
  const refresh = useCallback(() => {
    setRequestId(requestId + 1);
  }, [requestId]);

  useEffect(() => {
    if (!loading) {
      refresh();
    }
  }, [sections]);

  return {
    sections
  };
}
