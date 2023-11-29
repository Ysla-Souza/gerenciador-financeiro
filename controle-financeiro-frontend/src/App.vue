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
app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 100vh;
  font-family: "Poppins", sans-serif;
  background: #093028;
  background: -webkit-linear-gradient(to bottom, #237a57, #093028);
  background: linear-gradient(to bottom, #237a57, #093028);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.btn:focus {
  box-shadow: none !important;
}

[id*="overflow"]::-webkit-scrollbar,
.code::-webkit-scrollbar {
  width: 5px;
}

[id*="overflow"]::-moz-scrollbar,
.code::-moz-scrollbar {
  width: 5px;
}

[id*="overflow"]::-ms-scrollbar,
.code::-ms-scrollbar {
  width: 5px;
}

[id*="overflow"]::-o-scrollbar,
.code::-o-scrollbar {
  width: 5px;
}

[id*="overflow"]::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.6);
  -webkit-border-radius: 10px;
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5);
}

[id*="overflow"]::-moz-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.6);
  -moz-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5);
  -ms-border-radius: 10px;
}

[id*="overflow"]::-ms-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.6);
  -moz-border-radius: 10px;
  -ms-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5);
}

[id*="overflow"]::-o-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.6);
  -o-border-radius: 10px;
  -o-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5);
}

.code::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.6);
  -webkit-border-radius: 10px;
  -webkit-box-shadow: inset 0 0 1px rgba(255, 255, 255, 0.5);
}

.code::-moz-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.6);
  -moz-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5);
  -ms-border-radius: 10px;
}

.code::-ms-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.6);
  -moz-border-radius: 10px;
  -ms-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5);
}

.code::-o-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.6);
  -o-border-radius: 10px;
  -o-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5);
}
</style>
