<template>
  <div class="currencies-layout">
    <div v-if="isLoading" class="spinner">
      <the-spinner  />
    </div>
    <template v-else>
      <v-empty v-if="!currencies.length"/>
      <template v-else>
        <v-card
            class="profile__budget"
            max-width="320"
            title="Общий бюджет"
            prepend-avatar="images/icon-budget.png"
        >
          <v-card-title class="d-flex align-center">
            $ {{ totalBudget }}
            <v-chip
                :text="`$ ${totalOldBudget}`"
                class="text-uppercase text-decoration-line-through"
                variant="text"
            />
          </v-card-title>
          <v-card-text>
            <v-chip
                :prepend-icon="totalPercent > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down'"
                :color="totalPercent > 0 ? 'green' : 'red'"
                :text="`${Math.abs(totalPercent)}%`"
                class="text-uppercase"
                label
                size="small"
            />
          </v-card-text>
        </v-card>
        <div class="table-wrapper">
          <v-table>
            <thead>
            <tr>
              <th class="text-left text-no-wrap">Название</th>
              <th class="text-left text-no-wrap">Цена</th>
              <th class="text-left text-no-wrap">Изменения (24ч)</th>
              <th class="text-left text-no-wrap">Количество</th>
              <th class="text-left text-no-wrap">Общая стоимость</th>
              <th class="text-right">
                <v-timer ref="timer" @click="startTimerHandler" name="featured-currencies" :is-loading="isLoading" :seconds="seconds" label="Обновить данные"/>
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
              <td class="text-left">
                <v-text-field
                    v-model="item.count"
                    @update:model-value="updateCurrencyValueHandler($event, item)"
                    type="number"
                    min="0"
                    variant="plain"
                />
              </td>
              <td class="text-left">$ {{ (item.values.USD.price * item.count).toFixed(2) }}</td>
              <td class="text-right">
                <v-btn color="info" @click="removeCurrencyFromFavorites(item)">Удалить</v-btn>
              </td>
            </tr>
            </tbody>
          </v-table>
          <v-pagination v-if="totalPages > 1" v-model="page" size="32" :length="totalPages" total-visible="4" @update:model-value="setPage" color="primary"/>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { useFeaturedCurrenciesStore } from "@/store/FeaturedCurrenciesStore.js";
import { mapActions, mapState } from "pinia";
import VEmpty from "@/components/v-empty.vue";
import VTimer from "@/components/v-timer.vue";
import TheSpinner from "@/components/the-spinner.vue";

export default {
  name: "HomeView",
  components: {TheSpinner, VTimer, VEmpty },
  data() {
    return {
      seconds: 60
    }
  },
  created() {
    this.getCurrenciesByIds();
  },
  computed: {
    ...mapState(useFeaturedCurrenciesStore, {
      currencies: 'currencies',
      page: 'page',
      isLoading: 'isLoading',
      paginatedCurrencies: 'paginatedCurrencies',
      totalPages: 'totalPages',
      totalBudget: 'totalBudget',
      totalOldBudget: 'totalOldBudget',
      totalPercent: 'totalPercent'
    })
  },
  methods: {
    ...mapActions(useFeaturedCurrenciesStore, {
      removeCurrencyFromFavorites: 'removeCurrencyFromFavorites',
      updateCurrencyFromFavorites: 'updateCurrencyFromFavorites',
      getCurrenciesByIds: 'getCurrenciesByIds',
      setPage: 'setPage'
    }),
    updateCurrencyValueHandler(event, item) {
      this.updateCurrencyFromFavorites(item);
    },
    startTimerHandler() {
      this.getCurrenciesByIds();
    }
  }
}
</script>

<style scoped lang="scss"></style>