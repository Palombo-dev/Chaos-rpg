import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importando o hook de navegação

interface CreateCharacterFormProps {
  onSubmit?: (character: {
    id: string;
    name: string;
    image: string;
    attributes: {
      charisma: number;
      constitution: number;
      dexterity: number;
      intelligence: number;
      strength: number;
      wisdom: number;
    };
    health: { current: number; max: number };
    stamina: { current: number; max: number };
    mana: { current: number; max: number };
    inventory: Array<{ item: string; quantity: number }>;
    race: string;
  }) => void;
}

const CreateCharacterForm: React.FC<CreateCharacterFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate(); // Usando o hook para navegação
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [attributes, setAttributes] = useState({
    charisma: 0,
    constitution: 0,
    dexterity: 0,
    intelligence: 0,
    strength: 0,
    wisdom: 0,
  });
  const [health, setHealth] = useState({ current: 100, max: 100 });
  const [stamina, setStamina] = useState({ current: 50, max: 50 });
  const [mana, setMana] = useState({ current: 50, max: 50 });
  const [inventory, setInventory] = useState([{ item: '', quantity: 0 }]);
  const [race, setRace] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newCharacter = {
      id: '', // Você pode gerar ou deixar vazio, dependendo da lógica
      name,
      image,
      attributes,
      health,
      stamina,
      mana,
      inventory,
      race,
    };

    try {
      // Enviando dados para o backend
      const response = await axios.post('http://localhost:5000/api/characters', newCharacter);
      console.log('Personagem criado com sucesso:', response.data);
      if (onSubmit) {
        onSubmit(response.data); // Chamando a função onSubmit se definida
      }
      // Redirecionando para a dashboard após o sucesso
      navigate("/"); 
    } catch (error) {
      console.error('Erro ao criar personagem:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Criar Novo Personagem</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCharacterName" className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do personagem"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCharacterImage" className="mb-3">
              <Form.Label>URL da Imagem</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL da imagem do personagem"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>

            {Object.keys(attributes).map((key) => (
              <Form.Group key={key} className="mb-3">
                <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                <Form.Control
                  type="number"
                  value={attributes[key as keyof typeof attributes]}
                  onChange={(e) => setAttributes({ ...attributes, [key]: Number(e.target.value) })}
                />
              </Form.Group>
            ))}

            <Form.Group controlId="formCharacterHealth" className="mb-3">
              <Form.Label>Vida (HP)</Form.Label>
              <Form.Control
                type="number"
                value={health.current}
                onChange={(e) => setHealth({ ...health, current: Number(e.target.value) })}
              />
            </Form.Group>

            <Form.Group controlId="formCharacterStamina" className="mb-3">
              <Form.Label>Stamina</Form.Label>
              <Form.Control
                type="number"
                value={stamina.current}
                onChange={(e) => setStamina({ ...stamina, current: Number(e.target.value) })}
              />
            </Form.Group>

            <Form.Group controlId="formCharacterMana" className="mb-3">
              <Form.Label>Mana</Form.Label>
              <Form.Control
                type="number"
                value={mana.current}
                onChange={(e) => setMana({ ...mana, current: Number(e.target.value) })}
              />
            </Form.Group>

            <Form.Group controlId="formCharacterRace" className="mb-3">
              <Form.Label>Raça</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a raça do personagem"
                value={race}
                onChange={(e) => setRace(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Criar Personagem
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCharacterForm;
