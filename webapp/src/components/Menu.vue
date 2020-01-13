<template>
  <div class="menu-container">
    <header class="header">
      <img src="../assets/images/logo2.svg" alt="Ark logo" />
    </header>
    <Slide right>
      <a href="#">
        <font-awesome-icon icon="user-secret" />
        <span>Favourites</span>
      </a>
    </Slide>
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu';

export default {
  name: 'Menu',
  components: {
    Slide
  }
};
</script>

<style scoped>
.menu-container {
  padding-top: 25px;
}

.header {
  display: flex;
  max-width: 88%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
}
</style>
