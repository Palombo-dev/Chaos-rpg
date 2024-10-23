import { Router } from 'express';
import { createCharacter, getCharacters, getCharacterById, updateCharacter, deleteCharacter } from '../controllers/characterController';

const router = Router();

// Cria um novo personagem
router.post('/characters', createCharacter);

// Lista todos os personagens
router.get('/characters', getCharacters);

// Busca um personagem específico por ID
router.get('/characters/:id', getCharacterById);

// Atualiza um personagem
router.put('/characters/:id', updateCharacter);

// Deleta um personagem
router.delete('/characters/:id', deleteCharacter);

export default router;
