import express from 'express';
import { GetAnimalsService } from '../services/animalService';
import { Animal } from '../models/Animal';

export const GetAnimals = async (req, res) => {
    try {
        const filters = req.query;
        const animals = await GetAnimalsService(filters);

        if (animals.message) {
            return res.status(404).json(animals);
        }

        return res.status(200).json(animals);
    } catch (error) {
        console.log('Erro ao buscar animais: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno. Tente novamente mais tarde' });
    }
}
