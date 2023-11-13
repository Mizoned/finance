import { defineStore } from 'pinia';
import CoinLayer from "@/api/CoinLayer.js";

export const useCurrenciesStore = defineStore('currenciesStore', {
    state: () => {
        return {
            currencies: {},
            isLoading: false
        }
    },
    getters: {

    },
    actions: {
        async getCurrencies() {
            this.isLoading = true;
            let response = await CoinLayer.getCurrencies();
            this.setCurrencies(response?.data?.rates ?? {});
            this.isLoading = false;
        },
        setCurrencies(array) {
            this.currencies = array;
        }
    }
});
