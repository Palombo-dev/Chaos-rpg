import React, { useState } from 'react';
import { Button, ProgressBar } from 'react-bootstrap'; 
import './CharacterCard.css';
import CharacterModal from './CharacterModal'; 

interface CharacterProps {
  character: {
    id: string; 
    name: string;
    image: string;
    health: { current: number; max: number };
    stamina: { current: number; max: number };
    mana: { current: number; max: number };
  };
}

const CharacterCard: React.FC<CharacterProps> = ({ character }) => {
  const [modalShow, setModalShow] = useState(false);

  const handleEditClick = () => {
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    window.location.reload(); 
  };

  return (
    <div className="character-card">
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} className="character-image" />
      
      <div className="status-bar">
        <ProgressBar 
          now={(character.health.current / character.health.max) * 100} 
          variant="danger" 
          animated
        >
          <div className="progress-text">
            {character.health.current}/{character.health.max} HP
          </div>
        </ProgressBar>
      </div>
      <div className="status-bar">
        <ProgressBar 
          now={(character.stamina.current / character.stamina.max) * 100} 
          variant="warning" 
          animated
        >
          <div className="progress-text">
            {character.stamina.current}/{character.stamina.max} Stamina
          </div>
        </ProgressBar>
      </div>
      <div className="status-bar">
        <ProgressBar 
          now={(character.mana.current / character.mana.max) * 100} 
          variant="info" 
          animated
        >
          <div className="progress-text">
            {character.mana.current}/{character.mana.max} Mana
          </div>
        </ProgressBar>
      </div>
      
      <Button variant="primary" onClick={handleEditClick} className="edit-button">
        Editar
      </Button>
      
      <CharacterModal
        show={modalShow}
        onHide={handleCloseModal}
        character={{
          id: character.id,
          name: character.name,
          health: character.health,
          stamina: character.stamina,
          mana: character.mana,
        }}
      />
    </div>
  );
};

export default CharacterCard;
