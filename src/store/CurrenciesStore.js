import { defineStore } from 'pinia';
import CryptoRank from "@/api/CryptoRank.js";

export const useCurrenciesStore = defineStore('currenciesStore', {
    state: () => {
        return {
            currencies: [],
            page: 1,
            limit: 10,
            totalPages: 0,
            isLoading: false,
        }
    },
    getters: {
        offset() {
            return this.page * this.limit;
        },
        paginatedCurrencies() {
            return this.currencies?.slice(this.offset - this.limit, this.offset)
        }
    },
    actions: {
        async getCurrencies() {
            let localCurrencies = JSON.parse(localStorage.getItem('currencies'));

            if (localCurrencies) {
                this.currencies = localCurrencies;
            } else {
                this.isLoading = true;

                await CryptoRank.getCurrencies()
                    .then((response) => {
                        this.setCurrencies(response?.data?.data ?? []);
                        this.totalPages = Math.ceil(this.currencies.length / this.limit);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            }
        },
        setCurrencies(array) {
            this.currencies = array;
            localStorage.setItem('currencies', JSON.stringify(array));
        },
        setPage(page) {
            this.page = page;
        }
    }
});
