import { useEffect, useState } from 'react';
import axios from 'axios';

const useBestChampion = (websocket) => {
  const [bestChampion, setBestChampion] = useState(null);

  useEffect(() => {
    const fetchBestChampion = () => {
      websocket.send(JSON.stringify({ command: 'gethighestwinrate' }));
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'bestChampion') {
        setBestChampion(data.result);
      }
    };

    fetchBestChampion();
    
    return () => {
      websocket.onmessage = null;
    };
  }, [websocket]);

  return bestChampion;
};

export default useBestChampion;
