<template>
  <div class="buttons">
    <v-btn color="info" @click="getCurrencies" :block="true">get currencies</v-btn>
  </div>
  <div>
    <v-table v-if="!isLoading">
      <thead>
      <tr>
        <th class="text-center">Name</th>
        <th class="text-center">Value</th>
        <th class="text-center">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(name, key) in currencies"
          :key="key"
      >
        <td>{{ key }}</td>
        <td>{{ name }}</td>
        <td><v-btn color="info">Add</v-btn></td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import { useCurrenciesStore } from "@/store/CurrenciesStore.js";
import { mapActions, mapState } from "pinia";

export default {
  name: "HomeView",
  computed: {
    ...mapState(useCurrenciesStore, {
      currencies: "currencies",
      isLoading: 'isLoading'
    })
  },
  methods: {
    ...mapActions(useCurrenciesStore, {
      getCurrencies: 'getCurrencies'
    })
  },
  created() {
    this.getCurrencies();
  }
}
</script>

<style scoped lang="scss">
.buttons {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}
</style>