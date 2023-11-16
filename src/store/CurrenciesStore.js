import { defineStore } from 'pinia';
import CoinLayer from "@/api/CoinLayer.js";
import { v4 as uuidv4 } from 'uuid';

export const useCurrenciesStore = defineStore('currenciesStore', {
    state: () => {
        return {
            currencies: [],
            selectedCurrencies: JSON.parse(localStorage.getItem('selectedCurrencies')) ?? [],
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
                    id: uuidv4(),
                    name: key,
                    value: currencies[key]
                })
            });

            return tmp;
        },
        setCurrencies(array) {
            this.currencies = array;
        },
        addSelectedCurrencies(currency) {
            let isAdded = this.selectedCurrencies.find((sc) => sc.id === currency.id);

            if (!isAdded) {
                currency.count = 0;
                this.selectedCurrencies.push(currency);
                localStorage.setItem('selectedCurrencies', JSON.stringify(this.selectedCurrencies));
            }
        },
        removeSelectedCurrencies({ id }) {
            this.selectedCurrencies = [...this.selectedCurrencies].filter((currency) => currency.id !== id);
            localStorage.setItem('selectedCurrencies', JSON.stringify(this.selectedCurrencies));
        },
        updateSelectedCurrencies(currency) {
            const index = this.selectedCurrencies.findIndex((sc) => sc.id === currency.id);
            if (index !== -1) {
                this.selectedCurrencies[index] = currency;
                localStorage.setItem('selectedCurrencies', JSON.stringify(this.selectedCurrencies));
            }
        },
        setPage(page) {
            this.page = page;
        }
    }
});
