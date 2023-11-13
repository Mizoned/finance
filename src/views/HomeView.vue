<template>
  <div class="table-wrapper" v-if="!isLoading">
    <v-table>
      <thead>
      <tr>
        <th class="text-left">Название</th>
        <th class="text-left">Цена</th>
        <th class="text-right"></th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in paginatedCurrencies"
          :key="item.name"
      >
        <td class="text-left">{{ item.name }}</td>
        <td class="text-left">{{ item.value }} ₽</td>
        <td class="text-right"><v-btn color="info">Добавить</v-btn></td>
      </tr>
      </tbody>
    </v-table>
    <v-pagination v-model="page" :length="totalPages" @update:model-value="setPage" color="primary"></v-pagination>
  </div>
  <div v-else class="spinner-wrapper">
    <the-spinner  />
  </div>
</template>

<script>
import { useCurrenciesStore } from "@/store/CurrenciesStore.js";
import { mapActions, mapState } from "pinia";
import TheSpinner from "@/components/the-spinner.vue";

export default {
  name: "HomeView",
  components: {TheSpinner},
  computed: {
    ...mapState(useCurrenciesStore, {
      currencies: 'currencies',
      page: 'page',
      totalPages: 'totalPages',
      isLoading: 'isLoading',
      paginatedCurrencies: 'paginatedCurrencies'
    })
  },
  methods: {
    ...mapActions(useCurrenciesStore, {
      getCurrencies: 'getCurrencies',
      setPage: 'setPage'
    })
  },
  created() {
    this.getCurrencies();
  }
}
</script>

<style scoped lang="scss">
.table-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}
.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>