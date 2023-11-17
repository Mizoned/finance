import axios from 'axios'

export const API_URL = import.meta.env.PROD ? 'https://api.coinlayer.com/' : 'http://api.coinlayer.com/';

const ACCESS_KEY = '4948ab833e6226e699a64ebc3b3d9400'

const $coinlayer = axios.create({
    baseURL: API_URL,
    params: {
        access_key: ACCESS_KEY
    }
});

export default $coinlayer;

