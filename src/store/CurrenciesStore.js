import { defineStore } from 'pinia';
import CryptoRank from "@/api/CryptoRank.js";

const timerName = 'timerCurrencies';
const timerSeconds = 60;

export const useCurrenciesStore = defineStore('currenciesStore', {
    state: () => {
        return {
            currencies: [],
            page: 1,
            limit: 10,
            isLoading: false,
            timerName: timerName,
            timerSeconds: timerSeconds,
            timerSecondsLeft: Number.parseInt(localStorage.getItem(timerName)) ?? timerSeconds
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
        }
    },
    actions: {
        async getCurrencies() {
            let localCurrencies = JSON.parse(localStorage.getItem('currencies'));

            if (localCurrencies && this.timerSeconds > this.timerSecondsLeft) {
                this.currencies = localCurrencies;
            } else {
                this.isLoading = true;

                await CryptoRank.getCurrencies()
                    .then((response) => {
                        this.setCurrencies(response?.data?.data ?? []);
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
        },
        setTimerSecondsLeft(seconds) {
            this.timerSecondsLeft = seconds;
        }
    }
});
