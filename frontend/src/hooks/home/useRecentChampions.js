import { useEffect, useState } from 'react';

const useRecentChampions = (websocket) => {
  const [recentChampions, setRecentChampions] = useState([]);

  useEffect(() => {
    const fetchRecentSearches = () => {
      websocket.send(JSON.stringify({ command: 'getlastsearch' }));
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'recentSearches') {
        setRecentChampions(data.result);
      }
    };

    fetchRecentSearches();
    
    return () => {
      websocket.onmessage = null;
    };
  }, [websocket]);

  return recentChampions;
};

export default useRecentChampions;
