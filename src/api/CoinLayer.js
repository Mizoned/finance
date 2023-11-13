import $api from "@/http/coinlayer.js";

export default class CoinLayer {
    static async getCurrencies() {
        return $api.get('/live', {
            params: {
                target: 'RUB'
            }
        });
    }
}