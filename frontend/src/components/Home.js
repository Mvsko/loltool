import React, { useEffect, useState } from 'react';
import '../styles/style.css';

const Home = () => {
  const [bestChampion, setBestChampion] = useState(null);
  const [recentChampions, setRecentChampions] = useState([]);
  const [lastConnection, setLastConnection] = useState(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:5000');

    websocket.onopen = () => {
        console.log('WebSocket connection established');
        setWs(websocket);
        fetchBestChampion(websocket);
        fetchRecentSearches(websocket);
        fetchLastConnection(websocket, true);
    };

    websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Message from server:', data);

        if (data.type === 'bestChampion') {
            setBestChampion(data.result);
        } else if (data.type === 'recentSearches') {
            setRecentChampions(data.result);
        } else if (data.type === 'lastConnection') {
            setLastConnection(data.result.lastConnection);
        } else if (data.type === 'championUpdated') {
            fetchBestChampion(websocket);
            fetchRecentSearches(websocket);
        }
    };

    websocket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    return () => {
        websocket.close();
    };
}, []);


  const fetchBestChampion = (websocket) => {
    websocket.send(JSON.stringify({ command: 'gethighestwinrate' }));
  };

  const fetchRecentSearches = (websocket) => {
    websocket.send(JSON.stringify({ command: 'getlastsearch' }));
  };

  const fetchLastConnection = (websocket, shouldSet = false) => {
    console.log('Fetching last connection...');
    websocket.send(JSON.stringify({ command: 'getlastconnection', args: { shouldSet } }));
};



  return (
    <div className="home">
      <section className="intro">
        <h1>Bienvenue sur LoLTool</h1>
        <p>Ceci est une application dédiée aux champions de League of Legends.<br />
          Ici, vous pouvez consulter des statistiques, créer des données et naviguer
          à travers les différentes fonctionnalités de l'application.</p>
      </section>

      <section className="best-champion">
        <h2>Personnage du moment</h2>
        {bestChampion ? (
          <div>
            <p>Champion: {bestChampion.name}</p>
            <p>Taux de victoire: {bestChampion.winRate}</p>
            <p>Pick rate: {bestChampion.matches}</p>
          </div>
        ) : (
          <p>Chargement du meilleur champion...</p>
        )}
      </section>

      <section className="recent-champions">
        <h2>Derniers Champions Ajoutés</h2>
        <ul>
          {recentChampions.length > 0 ? (
            recentChampions.map((champion, index) => (
              <li key={index}>
                <h3>{champion.name}</h3>
                <p>Taux de victoire: {champion.winRate}</p>
                <p>Pick rate: {champion.matches}</p>
              </li>
            ))
          ) : (
            <p>Aucun champion récent ajouté.</p>
          )}
        </ul>
      </section>

      <section className="news">
        <h2>Actualités</h2>
        <p>Pour les dernières informations sur les patchs de League of Legends, consultez les liens suivants:</p>
        <ul>
          <div className='news-patch'>
            <li><a href="https://www.leagueoflegends.com/fr-fr/news/game-updates/patch-11-23-notes/">Patch 11.23</a></li>
            <li><a href="https://www.leagueoflegends.com/fr-fr/news/game-updates/patch-11-24-notes/">Patch 11.24</a></li>
            <li><a href="https://www.leagueoflegends.com/fr-fr/news/game-updates/patch-11-25-notes/">Patch 11.25</a></li>
          </div>
        </ul>
      </section>

      <section className="last-connection">
        <h2>Dernière Connexion</h2>
        <p>Vous vous êtes connecté le: {lastConnection ? new Date(lastConnection).toLocaleString() : 'Chargement...'}</p>
      </section>
    </div>
  );
};

export default Home;
