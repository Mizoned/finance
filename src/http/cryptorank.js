import axios from 'axios'

export const API_URL = 'https://api.cryptorank.io/v1/';

const ACCESS_KEY = 'bc3715c587310368acbe32f9d00315e82f0aca40957645c8bc2be803f40f'

const $cryptorank = axios.create({
    baseURL: API_URL,
    params: {
        api_key: ACCESS_KEY
    }
});

export default $cryptorank;

