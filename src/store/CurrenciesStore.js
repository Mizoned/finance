import { defineStore } from 'pinia';
import CoinLayer from "@/api/CoinLayer.js";

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
            let currencies = [];

            if (localCurrencies) {
                currencies = localCurrencies;
            } else {
                this.isLoading = true;

                await CoinLayer.getCurrencies()
                    .then((response) => {
                        currencies = this.prepareCurrencies(response?.data?.rates ?? {});
                        localStorage.setItem('currencies', JSON.stringify(currencies));
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            }

            this.totalPages = Math.ceil(currencies.length / this.limit);
            this.setCurrencies(currencies);
        },
        prepareCurrencies(currencies) {
            let tmp = [];

            Object.keys(currencies).forEach(key => {
                tmp.push({
                    name: key,
                    value: currencies[key]
                })
            });

            return tmp;
        },
        setCurrencies(array) {
            this.currencies = array;
        },
        setPage(page) {
            this.page = page;
        }
    }
});
