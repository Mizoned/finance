<template>
    <v-btn class="v-timer__button" variant="outlined" @click="startHandler">
      <template v-if="isRunning" #prepend>
        <v-progress-circular :model-value="progress" :size="24" :width="2"/>
      </template>
      <span class="v-timer__text">{{ isRunning ? timeLeft : label }}</span>
    </v-btn>
</template>

<script>
export default {
  name: "v-timer",
  emits: ['start'],
  props: {
    seconds: {
      type: Number,
      default: 60
    },
    label: {
      type: String,
      default: 'Обновить'
    }
  },
  data() {
    return {
      isRunning: false,
      timeLeft: this.seconds,
      interval: null,
      progress: 0
    }
  },
  methods: {
    startTimer() {
      this.timeLeft = this.seconds;
      this.progress = 0;

      this.interval = setInterval(() => {
        this.timeLeft--;

        this.progress =  Math.ceil(((this.seconds - this.timeLeft) / this.seconds) * 100);

        if (this.timeLeft <= 0) {
          clearInterval(this.interval);
          this.isRunning = false;
        }
      }, 1000);
    },
    startHandler() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.startTimer();
      this.$emit('start');
    }
  }
}
</script>

<style scoped lang="scss">
.v-timer {
}
</style>