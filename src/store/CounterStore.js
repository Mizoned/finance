import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counterStore', {
    state: () => {
        return {
            count: 0
        }
    },
    actions: {
        increment() {
            this.count++;
        },
        decrement() {
            this.count--;
        }
    }
});
