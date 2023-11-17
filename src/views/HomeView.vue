<template>
  <div class="currencies-layout">
    <template v-if="!isLoading">
      <v-empty v-if="!currencies.length"/>
      <template v-else>
        <div class="table-wrapper">
          <v-table>
            <thead>
            <tr>
              <th class="text-left">Название</th>
              <th class="text-left">Цена</th>
              <th class="text-right"><v-timer :seconds="60" label="Обновить цены"/></th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="item in paginatedCurrencies"
                :key="item.name"
            >
              <td class="text-left">{{ item.name }}</td>
              <td class="text-left">{{ item.value.toFixed(2) }} ₽</td>
              <td v-if="isAdded(item)" class="text-right"><v-btn color="info" @click="addCurrencyToFavorites(item)">Добавить избранное</v-btn></td>
              <td v-else class="text-right"><v-btn color="info" @click="removeCurrencyFromFavorites(item)">Удалить из избранного</v-btn></td>
            </tr>
            </tbody>
          </v-table>
          <v-pagination v-if="totalPages > 1" v-model="page" :length="totalPages" @update:model-value="setPage" color="primary"/>
        </div>
      </template>
    </template>
    <div v-else class="spinner-wrapper">
      <the-spinner  />
    </div>
  </div>
</template>

<script>
import { useCurrenciesStore } from "@/store/CurrenciesStore.js";
import { useFeaturedCurrenciesStore } from "@/store/FeaturedCurrenciesStore.js";
import { mapActions, mapState } from "pinia";
import TheSpinner from "@/components/the-spinner.vue";
import VTimer from "@/components/v-timer.vue";
import VEmpty from "@/components/v-empty.vue";

export default {
  name: "HomeView",
  components: {VEmpty, VTimer, TheSpinner },
  computed: {
    ...mapState(useCurrenciesStore, {
      currencies: 'currencies',
      page: 'page',
      totalPages: 'totalPages',
      isLoading: 'isLoading',
      paginatedCurrencies: 'paginatedCurrencies'
    }),
    ...mapState(useFeaturedCurrenciesStore, {
      selectedCurrencies: 'currencies',
    })
  },
  methods: {
    ...mapActions(useCurrenciesStore, {
      getCurrencies: 'getCurrencies',
      setPage: 'setPage',
    }),
    ...mapActions(useFeaturedCurrenciesStore, {
      addCurrencyToFavorites: 'addCurrencyToFavorites',
      removeCurrencyFromFavorites: 'removeCurrencyFromFavorites'
    }),
    isAdded(currency) {
      return !this.selectedCurrencies.find((sc) => sc.name === currency.name);
    }
  },
  created() {
    this.getCurrencies();
  }
}
</script>

<style scoped lang="scss">
.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>