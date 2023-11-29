// src/components/GastosList.vue
<template>
  <div>
    <h2>Gastos</h2>
    <button @click="listarGastos">Listar Gastos</button>
    <ul v-if="gastos.length">
      <li v-for="gasto in gastos" :key="gasto.id">
        {{ gasto.nome }} - R$ {{ gasto.preco }} - {{ gasto.data }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      gastos: [],
    };
  },
  methods: {
    async listarGastos() {
      try {
        const response = await api.get('/gastos');
        this.gastos = response.data;
      } catch (error) {
        console.error('Erro ao listar gastos:', error);
      }
    },
  },
};
</script>
