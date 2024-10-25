import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Chaos RPG</Navbar.Brand>
        <Link to="/create">
          <Button variant="primary">Criar Novo Personagem</Button>
        </Link>
      </Container>
    </Navbar>
  );
};

export default Header;
