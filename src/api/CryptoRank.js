import $api from "@/http/cryptorank.js";

export default class CryptoRank {
    static async getCurrencies() {
        return $api.get('/currencies', {
            params: {
                optionalFields: 'images'
            }
        });
    }

    static async getCurrenciesByIds(arrayOfIds) {
        return $api.get('/currencies', {
            params: {
                optionalFields: 'images',
                ids: arrayOfIds.join(',')
            }
        });
    }
}