import axios from 'axios';

const BASE_URL = 'http://viacep.com.br/ws';

export const getAddressByCep = async (cep) => {
    try {
        const response = await axios.get(`${BASE_URL}/${cep}/json`);
        const data = response.data;
        if (response.status === 200) {
            return data;
        } else {
            throw new Error('CEP não encontrado');
        }
    } catch (error) {
        throw new Error('Ocorreu um erro na busca do CEP. Verifique sua conexão de internet e tente novamente.');
    }
};
