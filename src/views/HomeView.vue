<template>
  <div>Home view {{ counter }}</div>
  <div class="buttons">
    <base-button
        @click="increment"
        label="increment"
        color="default"
    />
    <base-button
        @click="decrement"
        label="decrement"
        color="default"
    />
  </div>
</template>

<script>
import {useCounterStore} from "@/store/CounterStore.js";
import {mapActions, mapState} from "pinia";
import BaseButton from "@/components/ui/base-button.vue";

export default {
  name: "HomeView",
  components: {BaseButton},
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
}
</style>