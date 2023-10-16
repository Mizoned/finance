<template>
  <div class="header">
    <v-btn variant="text" to="/" color="blue">Home</v-btn>
    <v-btn variant="text" to="/profile" color="blue">Profile</v-btn>
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
  height: 60px;
}
</style>
