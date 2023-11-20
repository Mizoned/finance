<template>
    <v-btn class="v-timer__button" variant="outlined" :loading="isLoading" min-width="86" @click="startHandler">
      <template v-if="isRunning" #prepend>
        <v-progress-circular :model-value="progress" :size="24" :width="2"/>
      </template>
      <span class="v-timer__text">{{ isRunning ? timeLeft : label }}</span>
    </v-btn>
</template>

<script>
export default {
  name: "v-timer",
  emits: ['start-timer', 'end-timer', 'click', 'time-left'],
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
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
      interval: null
    }
  },
  created() {
    let storageSeconds = JSON.parse(localStorage.getItem(this.name)) ?? this.seconds;

    if (storageSeconds < this.seconds) {
      this.timeLeft = storageSeconds;
    }
  },
  mounted() {
    this.startTimer();
  },
  computed: {
    progress: {
      get() {
        return Math.ceil(((this.seconds - this.timeLeft) / this.seconds) * 100);
      },
      set() {}
    }
  },
  methods: {
    startTimer() {
      this.$emit('start-timer');
      this.isRunning = true;

      this.interval = setInterval(() => {
        --this.timeLeft;
        this.$emit('time-left', this.timeLeft);

        if (this.timeLeft <= 0) {
          clearInterval(this.interval);
          this.isRunning = false;
          this.timeLeft = this.seconds;
          this.$emit('time-left', this.timeLeft);
          this.$emit('end-timer');
        }
      }, 1000);
    },
    startHandler() {
      if (this.isRunning) return;
      this.$emit('click');
      this.startTimer();
    }
  },
  watch: {
    timeLeft(value) {
      localStorage.setItem(this.name, value);
    }
  }
}
</script>

<style scoped lang="scss"></style>