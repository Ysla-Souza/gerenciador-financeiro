<template>
  <div id="app">
    <h1>Controle Financeiro</h1>

    <ProventosList />
    <GastosList />
  </div>
</template>

<script>
import ProventosList from './components/ProventosList.vue';
import GastosList from './components/GastosList.vue';

export default {
  components: {
    ProventosList,
    GastosList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#h1 {
  font-size: 2em;
  margin-bottom: 20px;
}
#header {
  background-color: #333;
  color: white;
  padding: 10px;
  text-align: center;
}
</style>
