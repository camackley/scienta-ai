<template>
  <div class="home">
    <nav-bar />
    <div class="body">
      <start-analysis/>
      <analysis-list />
    </div>
    <simple-footer />
  </div>
</template>

<router>
  {
    name: 'home',
    path: '/',
  }
</router>

<script src='./home.ts' lang='ts'></script>
<style src='./home.scss' lang='scss' scoped></style>
