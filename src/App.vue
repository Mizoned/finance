<template>
  <div class="header">
    <router-link to="/">Home</router-link>
    <router-link to="/profile">Profile</router-link>
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
