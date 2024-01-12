<template>
  <span class="home">
    <nav-bar />
    <span class="body">
      <start-report/>
    </span>
  </span>
</template>

<router>
  {
    name: 'home',
    path: '/',
  }
</router>

<script src='./home.ts' lang='ts'></script>
<style src='./home.scss' lang='scss' scoped></style>
