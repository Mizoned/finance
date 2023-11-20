import { defineStore } from 'pinia';
import CryptoRank from "@/api/CryptoRank.js";

const timerName = 'timerFeaturedCurrencies';
const timerSeconds = 60;

export const useFeaturedCurrenciesStore = defineStore('featuredCurrenciesStore', {
    state: () => {
        return {
            currencies: JSON.parse(localStorage.getItem('featuredCurrencies')) ?? [],
            oldCurrencies: JSON.parse(localStorage.getItem('oldFeaturedCurrencies')) ?? [],
            lastUpdateTime: JSON.parse(localStorage.getItem('lastUpdatedTimeFeaturedCurrencies')) ?? null,
            timerName: timerName,
            timerSeconds: timerSeconds,
            timerSecondsLeft: Number.parseInt(localStorage.getItem(timerName)) ?? timerSeconds,
            page: 1,
            limit: 10,
            isLoading: false
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
            return this.currencies?.reduce((accumulator, currency) =>
                accumulator + (currency.values.USD.price * currency.count), 0)?.toFixed(2) ?? 0;
        },
        totalOldBudget() {
            return this.oldCurrencies?.reduce((accumulator, currency) =>
                accumulator + (currency.values.USD.price * currency.count), 0)?.toFixed(2) ?? 0;
        },
        totalPercent() {
            let result = (((this.totalBudget - this.totalOldBudget) / this.totalOldBudget) * 100)?.toFixed(2);

            if (isNaN(result)) return 0;

            return result;
        }
    },
    actions: {
        async getCurrenciesByIds() {
            if (this.currencies.length && this.timerSeconds === this.timerSecondsLeft) {
                this.isLoading = true;
                let arrayOfIds = this.currencies.map((currency) => currency.id);

                await CryptoRank.getCurrenciesByIds(arrayOfIds)
                    .then((response) => {
                        if (response.data.status.time === this.lastUpdateTime) return;

                        this.setLastUpdateTime(response.data.status.time);

                        this.setOldCurrencies(this.currencies);

                        let currencyData = response?.data?.data ?? [];
                        currencyData = this.mergeCountOfCurrencies(currencyData);
                        this.setCurrencies(currencyData);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            }
        },
        addCurrencyToFavorites(currency) {
            let isAdded = this.currencies.find((sc) => sc.id === currency.id);

            if (!isAdded) {
                currency.count = 0;
                this.pushCurrency(currency);
            }
        },
        removeCurrencyFromFavorites({ id }) {
            let currencies = [...this.currencies].filter((currency) => currency.id !== id);
            this.setCurrencies(currencies);

            let oldCurrencies = [...this.oldCurrencies].filter((currency) => currency.id !== id);
            this.setOldCurrencies(oldCurrencies);
        },
        updateCurrencyFromFavorites(currency) {
            const indexCurrency = this.currencies.findIndex((sc) => sc.id === currency.id);
            this.updateCountCurrencyByIndex(indexCurrency, currency.count);

            const indexOldCurrency = this.oldCurrencies.findIndex((sc) => sc.id === currency.id);
            this.updateCountOldCurrencyByIndex(indexOldCurrency, currency.count);
        },
        setPage(page) {
            this.page = page;
        },
        mergeCountOfCurrencies(currencies) {
            let tmpCurrencies = this.currencies.reduce((accumulator, item) => {
                accumulator[item.id] = item;
               return accumulator;
            }, {});

            return currencies.map((currency) => {
               currency.count = tmpCurrencies[currency?.id]?.count ?? 0
                return currency;
            });
        },
        setCurrencies(array) {
            this.currencies = array;
            localStorage.setItem('featuredCurrencies', JSON.stringify(array));
        },
        pushCurrency(currency) {
            this.currencies.push(currency);
            this.oldCurrencies.push(currency);
            localStorage.setItem('featuredCurrencies', JSON.stringify(this.currencies));
            localStorage.setItem('oldFeaturedCurrencies', JSON.stringify(this.oldCurrencies));
        },
        updateCountCurrencyByIndex(index, count) {
            if (this.currencies[index]) {
                this.currencies[index].count = count;
                localStorage.setItem('featuredCurrencies', JSON.stringify(this.currencies));
            }
        },
        setOldCurrencies(array) {
            this.oldCurrencies = array;
            localStorage.setItem('oldFeaturedCurrencies', JSON.stringify(array));
        },
        updateCountOldCurrencyByIndex(index, count) {
            if (this.oldCurrencies[index]) {
                this.oldCurrencies[index].count = count;
                localStorage.setItem('oldFeaturedCurrencies', JSON.stringify(this.oldCurrencies));
            }
        },
        setLastUpdateTime(string) {
            this.lastUpdateTime = string;
            localStorage.setItem('lastUpdatedTimeFeaturedCurrencies', JSON.stringify(string));
        },
        setTimerSecondsLeft(seconds) {
            this.timerSecondsLeft = seconds;
        }
    }
});
