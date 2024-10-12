import { useEffect, useState } from 'react';

const useLastConnection = (websocket) => {
  const [lastConnection, setLastConnection] = useState(null);

  useEffect(() => {
    const fetchLastConnection = () => {
      websocket.send(JSON.stringify({ command: 'getLastConnection' }));
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'lastConnection') {
        setLastConnection(data.result.lastConnection);
      }
    };

    fetchLastConnection();
    
    return () => {
      websocket.onmessage = null;
    };
  }, [websocket]);

  return lastConnection;
};

export default useLastConnection;
