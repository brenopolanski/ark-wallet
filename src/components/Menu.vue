<template>
  <div class="menu-container">
    <Slide right>
      <a href="#">
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

<style>
.menu-container {
  padding-top: 25px;
}

.bm-overlay {
  background: #f5f5f5 !important;
}

.bm-burger-button {
  right: 6% !important;
}
</style>
