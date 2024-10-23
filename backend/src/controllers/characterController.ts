import { Request, Response } from 'express';
import { db } from '../config/firebaseAdmin';

// Cria um novo personagem
export const createCharacter = async (req: Request, res: Response) => {
  try {
    const characterData = req.body;
    const newCharacterRef = await db.collection('characters').add(characterData);
    res.status(201).json({ id: newCharacterRef.id, ...characterData });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar personagem', error });
  }
};

// Lista todos os personagens
export const getCharacters = async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('characters').get();
    const characters = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar personagens', error });
  }
};

// Busca um personagem específico
export const getCharacterById = async (req: Request, res: Response) => {
  try {
    const characterId = req.params.id;
    const characterDoc = await db.collection('characters').doc(characterId).get();
    
    if (!characterDoc.exists) {
      res.status(404).json({ message: 'Personagem não encontrado' });
    } else {
      res.status(200).json({ id: characterDoc.id, ...characterDoc.data() });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar personagem', error });
  }
};

// Atualiza um personagem
export const updateCharacter = async (req: Request, res: Response) => {
  try {
    const characterId = req.params.id;
    const updatedData = req.body;
    await db.collection('characters').doc(characterId).update(updatedData);
    res.status(200).json({ message: 'Personagem atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar personagem', error });
  }
};

// Deleta um personagem
export const deleteCharacter = async (req: Request, res: Response) => {
  try {
    const characterId = req.params.id;
    await db.collection('characters').doc(characterId).delete();
    res.status(200).json({ message: 'Personagem deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar personagem', error });
  }
};
