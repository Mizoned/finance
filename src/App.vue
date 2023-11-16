<template>
  <div class="header">
    <v-btn variant="text" to="/" color="blue">Валюты</v-btn>
    <v-btn variant="text" to="/profile" color="blue">Избранные валюты</v-btn>
  </div>
  <div class="content">
    <router-view/>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
  padding: 20px;
  border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.content {
  display: flex;
  width: 100%;
  padding: 20px 0;
}
</style>
