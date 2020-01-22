<template>
  <div class="header-container">
    <header class="header">
      <img src="@/assets/images/logo2.svg" alt="ARK logo" />
    </header>
    <Menu />
  </div>
</template>

<script>
import Menu from '@/components/Menu';

export default {
  name: 'Header',
  components: {
    Menu
  }
};
</script>

<style scoped>
.header-container {
  padding-top: 25px;
}

.header-container .header {
  max-width: 88%;
  margin-bottom: 50px;
  @apply .flex .mx-auto;
}
</style>
