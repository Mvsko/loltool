import React from 'react';
import '../styles/style.css';

const Documentation = () => {
  return (
    <div className="documentation">
      <h1>Documentation de LoLTool</h1>
      <p>Cette documentation vous guidera à travers les fonctionnalités de LoLTool et comment les utiliser.</p>
      <h2>Fonctionnalités</h2>
      <ul>
        <li><strong>Meilleur champion:</strong> Affiche le champion avec le meilleur taux de victoire.</li>
        <li><strong>Derniers champions ajoutés:</strong> Affiche les derniers champions ajoutés.</li>
        <li><strong>Actualités:</strong> Liens vers les dernières notes de patch.</li>
      </ul>
    </div>
  );
};

export default Documentation;
