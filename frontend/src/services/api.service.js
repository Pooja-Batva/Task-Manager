import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

export const getAllItems = async (filters = {}) => {
    try {
        const response = await api.get('/tasks', {
            params: filters
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

export const getItemById = async (id) => {
    try {
        const response = await api.get(`/tasks/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching item with id ${id}:`, error);
        throw error;
    }
};

export const createItem = async (itemData) => {
    try {
        const response = await api.post('/tasks', itemData);
        return response.data;
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
};

export const updateItem = async (id, itemData) => {
    try {
        const response = await api.put(`/tasks/${id}`, itemData);
        return response.data;
    } catch (error) {
        console.error(`Error updating item with id ${id}:`, error);
        throw error;
    }
};

export const deleteItem = async (id) => {
    try {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting item with id ${id}:`, error);
        throw error;
    }
};