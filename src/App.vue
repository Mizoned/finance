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
  padding: 20px;
  border-bottom: 1px solid lightgray;
}

.content {
  display: flex;
  width: 100%;
  padding: 20px 0;
}
</style>
