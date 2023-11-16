<template>
  <div class="profile">
    <v-empty v-if="!selectedCurrencies.length"/>
    <template v-else>
      <v-card
          class="profile__budget"
          max-width="320"
          title="Общий бюджет"
          prepend-avatar="src/assets/img/icon-budget.png"
      >
        <v-card-title>{{ total }} ₽</v-card-title>
        <v-card-text>прибыль (%) с прошлых данных</v-card-text>
      </v-card>
      <div class="table-wrapper">
        <v-table>
          <thead>
          <tr>
            <th class="text-left">Название</th>
            <th class="text-left">Цена</th>
            <th class="text-left">Количество</th>
            <th class="text-left">Общая стоимость</th>
            <th class="text-right"></th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="item in selectedCurrencies"
              :key="item.id"
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
                  suffix="₽"/>
            </th>
            <th class="text-left">{{ (item.value * item.count).toFixed(2) }} ₽</th>
            <td class="text-right">
              <v-btn color="info" @click="removeSelectedCurrencies(item)">Удалить</v-btn>
            </td>
          </tr>
          </tbody>
        </v-table>
        <!--    <v-pagination v-model="page" :length="totalPages" @update:model-value="setPage" color="primary"></v-pagination>-->
      </div>
    </template>
  </div>
</template>

<script>
import {useCurrenciesStore} from "@/store/CurrenciesStore.js";
import {mapActions, mapState} from "pinia";
import VEmpty from "@/components/v-empty.vue";

export default {
  name: "HomeView",
  components: {VEmpty},
  computed: {
    ...mapState(useCurrenciesStore, {
      selectedCurrencies: 'selectedCurrencies'
    }),
    total() {
      return this.selectedCurrencies.reduce((accumulator, currency) => accumulator + (currency.value * currency.count), 0).toFixed(2);
    }
  },
  methods: {
    ...mapActions(useCurrenciesStore, {
      removeSelectedCurrencies: 'removeSelectedCurrencies',
      updateSelectedCurrencies: 'updateSelectedCurrencies'
    }),
    updateCurrencyValueHandler(event, item) {
      this.updateSelectedCurrencies(item);
    }
  }
}
</script>

<style scoped lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  &__budget {

  }
}

.table-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}
</style>