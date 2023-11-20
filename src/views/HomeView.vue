<template>
  <div class="currencies-layout">
    <div v-if="isLoading" class="spinner">
      <the-spinner  />
    </div>
    <template v-else>
      <v-empty v-if="!currencies.length"/>
      <template v-else>
        <div class="table-wrapper">
          <v-table>
            <thead>
            <tr>
              <th class="text-left text-no-wrap">Название</th>
              <th class="text-left text-no-wrap">Цена</th>
              <th class="text-left text-no-wrap">Изменения (24ч)</th>
              <th class="text-right">
                <v-timer @click="startTimerHandler" :name="timerName" :seconds="timerSeconds" label="Обновить данные" />
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="item in paginatedCurrencies"
                :key="item.id"
            >
              <td class="text-left currencies-table__cell">
                <div class="currencies-table-cell-name">
                  <img class="currencies-table-cell-name__icon" :src="item.images['60x60']" :alt="item.name">
                  <div class="currencies-table-cell-name__content">
                    <div class="currencies-table-cell-name__name font-weight-bold h-6">{{ item.name }}</div>
                    <div class="currencies-table-cell-name__symbol text-lg-subtitle-2 text-grey-darken-1">{{ item.symbol }}</div>
                  </div>
                </div>
              </td>
              <td class="text-left text-no-wrap">$ {{ item.values.USD.price.toFixed(2) }}</td>
              <td class="text-left">
                <v-chip
                    :prepend-icon="item.values.USD.percentChange24h > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down'"
                    :color="item.values.USD.percentChange24h > 0 ? 'green' : 'red'"
                    :text="`${Math.abs(item.values.USD.percentChange24h.toFixed(2))}%`"
                    class="text-uppercase"
                    label
                    size="small"
                />
              </td>
              <td v-if="isAdded(item)" class="text-right"><v-btn color="info" @click="addCurrencyToFavorites(item)">Добавить избранное</v-btn></td>
              <td v-else class="text-right"><v-btn color="info" @click="removeCurrencyFromFavorites(item)">Удалить из избранного</v-btn></td>
            </tr>
            </tbody>
          </v-table>
          <v-pagination v-if="totalPages > 1" size="32" :model-value="page" @update:modelValue="setPage" total-visible="4" :length="totalPages" color="primary"/>
        </div>
      </template>
    </template>
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
  components: { VEmpty, VTimer, TheSpinner },
  created() {
    this.getCurrencies();
  },
  computed: {
    ...mapState(useCurrenciesStore, {
      currencies: 'currencies',
      page: 'page',
      totalPages: 'totalPages',
      isLoading: 'isLoading',
      timerName: 'timerName',
      timerSeconds: 'timerSeconds',
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
    },
    startTimerHandler() {
      this.getCurrencies();
    }
  }
}
</script>

<style scoped lang="scss"></style>