import { useState, useCallback, useEffect } from "react";

export default function useSectionContent(sectionId) {
  const [sectionContent, setSectionContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState(0);
  useEffect(() => {
    setLoading(true);
    fetch("/api/section-content")
      .then(res => res.json())
      .then(setSectionContent)
      .then(() => {
        console.log(sectionContent);
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
  }, [sectionContent]);

  return {
    sectionContent,
    loading
  };
}
