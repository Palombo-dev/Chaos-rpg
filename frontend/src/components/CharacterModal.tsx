import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface CharacterModalProps {
  show: boolean;
  onHide: () => void;
  character: {
    id: string; // Alterado para string
    name: string;
    health: { current: number; max: number };
    stamina: { current: number; max: number };
    mana: { current: number; max: number };
  };
}

const CharacterModal: React.FC<CharacterModalProps> = ({ show, onHide, character }) => {
  // Estado para os valores do formulário
  const [health, setHealth] = useState(character.health.current);
  const [stamina, setStamina] = useState(character.stamina.current);
  const [mana, setMana] = useState(character.mana.current);

  // Efeito para atualizar os estados quando o character muda
  useEffect(() => {
    setHealth(character.health.current);
    setStamina(character.stamina.current);
    setMana(character.mana.current);
  }, [character]);

  const handleSaveChanges = async () => {
    const updatedCharacter = {
      health: { current: health, max: character.health.max }, // Mantenha o maximo original
      stamina: { current: stamina, max: character.stamina.max },
      mana: { current: mana, max: character.mana.max },
    };

    try {
      const response = await fetch(`http://localhost:5000/api/characters/${character.id}`, { // Correção na URL
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCharacter),
      });

      if (response.ok) {
        // Sucesso na atualização
        console.log('Personagem atualizado com sucesso');
        onHide(); // Fechar o modal
      } else {
        console.error('Erro ao atualizar personagem');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{character.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Vida</Form.Label>
            <Form.Control
              type="number"
              value={health}
              onChange={(e) => setHealth(Number(e.target.value))}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Stamina</Form.Label>
            <Form.Control
              type="number"
              value={stamina}
              onChange={(e) => setStamina(Number(e.target.value))}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mana</Form.Label>
            <Form.Control
              type="number"
              value={mana}
              onChange={(e) => setMana(Number(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Salvar Alterações
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CharacterModal;
