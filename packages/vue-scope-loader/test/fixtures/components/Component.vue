<template>
  <div class="host">
    <div class="title">Title</div>
  </div>
</template>

<style>
  [scope].host {
    font-size: 15px;
  }

  [scope].host [scope='./Component2.vue'].host {
    font-size: 15px;
  }
</style>
