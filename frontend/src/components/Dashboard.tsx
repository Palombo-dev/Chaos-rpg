import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CharacterCard from './CharacterCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Certifique-se que o caminho está correto

const Dashboard: React.FC = () => {
  // State para armazenar os personagens vindos do Firestore
  const [characters, setCharacters] = useState<any[]>([]);

  // Função para buscar os personagens do Firestore
  useEffect(() => {
    const fetchCharacters = async () => {
      const querySnapshot = await getDocs(collection(db, 'characters'));
      const charactersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCharacters(charactersData);
    };

    fetchCharacters();
  }, []);

  return (
    <Container>
      <Row>
        {characters.map((character) => (
          <Col key={character.id} sm={6} md={4}>
            <CharacterCard character={character} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
