<template>
  <div class="h-full flex justify-center items-center">
    <div class="w-full flex flex-col" style="max-width: 300px;">
      <img src="@/assets/images/logo.svg" alt="Ark logo" />
      <h3 class="my-2 font-bold text-center uppercase">ARK Wallet</h3>
      <div class="my-10 text-center">
        <h1 class="text-3xl">Ooops!</h1>
        <p>Sorry, page not found</p>
        <button type="button" class="btn btn-secondary px-6 mt-2" @click="$router.go(-1)">← Back</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
};
</script>
