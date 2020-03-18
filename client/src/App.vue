<template>
  <div>
    <nav>
      <router-link to="/">Main</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue';
export default class App extends Vue {}
</script>
