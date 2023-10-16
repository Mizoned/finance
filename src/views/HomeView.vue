<template>
  <div>Home view counter: {{ counter }}</div>
  <div class="buttons">
    <v-btn color="info" @click="increment">Increment</v-btn>
    <v-btn color="error" @click="decrement">decrement</v-btn>
  </div>
</template>

<script>
import { useCounterStore } from "@/store/CounterStore.js";
import { mapActions, mapState } from "pinia";

export default {
  name: "HomeView",
  computed: {
    ...mapState(useCounterStore, {
      counter: "count"
    })
  },
  methods: {
    ...mapActions(useCounterStore, {
      increment: 'increment',
      decrement: 'decrement'
    })
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