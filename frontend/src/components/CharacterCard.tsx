import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './CharacterCard.css';
import CharacterModal from './CharacterModal'; // Certifique-se de importar o modal

interface CharacterProps {
  character: {
    id: number;
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
  };

  return (
    <div className="character-card">
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Health: {character.health.current}/{character.health.max}</p>
      <p>Stamina: {character.stamina.current}/{character.stamina.max}</p>
      <p>Mana: {character.mana.current}/{character.mana.max}</p>
      <Button variant="primary" onClick={handleEditClick}>
        Editar
      </Button>
      
      {/* Modal de Edição */}
      <CharacterModal
        show={modalShow}
        onHide={handleCloseModal}
        character={character}
      />
    </div>
  );
};

export default CharacterCard;
