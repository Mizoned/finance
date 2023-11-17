import { defineStore } from 'pinia';

export const useFeaturedCurrenciesStore = defineStore('featuredCurrenciesStore', {
    state: () => {
        return {
            currencies: JSON.parse(localStorage.getItem('featuredCurrencies')) ?? [],
            page: 1,
            limit: 10
        }
    },
    getters: {
        offset() {
            return this.page * this.limit;
        },
        paginatedCurrencies() {
            return this.currencies?.slice(this.offset - this.limit, this.offset)
        },
        totalPages() {
            return Math.ceil(this.currencies.length / this.limit);
        },
        totalBudget() {
            return this.currencies?.reduce((accumulator, currency) => accumulator + (currency.value * currency.count), 0).toFixed(2)
        }
    },
    actions: {
        addCurrencyToFavorites(currency) {
            console.log(currency)
            let isAdded = this.currencies.find((sc) => sc.name === currency.name);
            console.log(this.currencies.indexOf((sc) => sc.name === currency.name))
            if (!isAdded) {
                currency.count = 0;
                this.currencies.push(currency);
                localStorage.setItem('featuredCurrencies', JSON.stringify(this.currencies));
            }
        },
        removeCurrencyFromFavorites({ name }) {
            this.currencies = [...this.currencies].filter((currency) => currency.name !== name);
            localStorage.setItem('featuredCurrencies', JSON.stringify(this.currencies));
        },
        updateCurrencyFromFavorites(currency) {
            const index = this.currencies.findIndex((sc) => sc.name === currency.name);
            if (index !== -1) {
                this.currencies[index] = currency;
                localStorage.setItem('featuredCurrencies', JSON.stringify(this.currencies));
            }
        },
        setPage(page) {
            this.page = page;
        }
    }
});
