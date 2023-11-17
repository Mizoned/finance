<template>
  <div class="currencies-layout">
    <v-empty v-if="!currencies.length"/>
    <template v-else>
      <v-card
          class="profile__budget"
          max-width="320"
          title="Общий бюджет"
          prepend-avatar="src/assets/img/icon-budget.png"
      >
        <v-card-title>{{ totalBudget }} ₽</v-card-title>
        <v-card-text>
          <v-chip
              color="green"
              text="Прибыль 3%"
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
            <th class="text-left">Название</th>
            <th class="text-left">Цена</th>
            <th class="text-left">Количество</th>
            <th class="text-left">Общая стоимость</th>
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
            <th class="text-left">
              <v-text-field
                  v-model="item.count"
                  @update:model-value="updateCurrencyValueHandler($event, item)"
                  type="number"
                  min="0"
                  variant="plain"
              />
            </th>
            <th class="text-left">{{ (item.value * item.count).toFixed(2) }} ₽</th>
            <td class="text-right">
              <v-btn color="info" @click="removeCurrencyFromFavorites(item)">Удалить</v-btn>
            </td>
          </tr>
          </tbody>
        </v-table>
        <v-pagination v-if="totalPages > 1" v-model="page" :length="totalPages" @update:model-value="setPage" color="primary"/>
      </div>
    </template>
  </div>
</template>

<script>
import { useFeaturedCurrenciesStore } from "@/store/FeaturedCurrenciesStore.js";
import { mapActions, mapState } from "pinia";
import VEmpty from "@/components/v-empty.vue";
import VTimer from "@/components/v-timer.vue";

export default {
  name: "HomeView",
  components: {VTimer, VEmpty },
  computed: {
    ...mapState(useFeaturedCurrenciesStore, {
      currencies: 'currencies',
      page: 'page',
      paginatedCurrencies: 'paginatedCurrencies',
      totalPages: 'totalPages',
      totalBudget: 'totalBudget'
    })
  },
  methods: {
    ...mapActions(useFeaturedCurrenciesStore, {
      removeCurrencyFromFavorites: 'removeCurrencyFromFavorites',
      updateCurrencyFromFavorites: 'updateCurrencyFromFavorites',
      setPage: 'setPage'
    }),
    updateCurrencyValueHandler(event, item) {
      this.updateCurrencyFromFavorites(item);
    }
  }
}
</script>

<style scoped lang="scss"></style>