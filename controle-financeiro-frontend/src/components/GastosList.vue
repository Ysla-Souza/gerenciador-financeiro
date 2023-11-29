<template>
    <div>
      <h2>Gastos</h2>
      <button @click="listarGastos">Listar Gastos</button>
      <button @click="toggleCadastroGastoForm">Cadastrar Gasto</button>
      <form v-if="isCadastroGastoFormVisible" @submit.prevent="cadastrarGasto">
        <label for="nome">Nome:</label>
        <input type="text" v-model="nome" required />
  
        <label for="preco">Preço:</label>
        <input type="number" v-model="preco" required />

        <label for="data">Data:</label>
        <input type="date" v-model="data" required />
  
        <button type="submit">Cadastrar</button>
      </form>
  
      <ul v-if="gastos.length">
        <li v-for="gasto in gastos" :key="gasto.id">
          {{ gasto.nome }} - R$ {{ gasto.preco }} - {{ gasto.data }}
          <button @click="iniciarEdicao(gasto)">Editar</button>
        </li>
      </ul>
  
      <div v-if="isEdicaoGastoModalVisible">
        <label for="nomeEdicao">Novo Nome:</label>
        <input type="text" v-model="gastoEmEdicao.nome" required />
  
        <label for="precoEdicao">Novo Preço:</label>
        <input type="number" v-model="gastoEmEdicao.preco" required />
  
        <label for="dataEdicao">Nova Data:</label>
        <input type="date" v-model="gastoEmEdicao.data" required />
  
        <button @click="editarGasto">Salvar</button>
        <button @click="fecharEdicaoModal">Cancelar</button>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../api';

export default {
  data() {
    return {
      gastos: [],
      isCadastroGastoFormVisible: false,
      isEdicaoGastoModalVisible: false,
      gastoEmEdicao: null,
      nome: '',
      preco: '',
      data: '',
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
    toggleCadastroGastoForm() {
      this.isCadastroGastoFormVisible = !this.isCadastroGastoFormVisible;
    },
    async cadastrarGasto() {
      try {
        await api.post('/gastos', {
          nome: this.nome,
          preco: this.preco,
          data: this.data,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        await this.listarGastos();

        this.fecharModal();
      } catch (error) {
        console.error('Erro ao cadastrar gasto:', error);
      }
    },
    fecharModal() {
      this.isCadastroGastoFormVisible = false;
      this.nome = '';
      this.preco = '';
      this.data = '';
    },
    iniciarEdicao(gasto) {
      this.gastoEmEdicao = { ...gasto };
      this.isEdicaoGastoModalVisible = true;
    },
    async editarGasto() {
      try {
        await api.put(`/gastos/${this.gastoEmEdicao.id}`, {
          nome: this.gastoEmEdicao.nome,
          preco: this.gastoEmEdicao.preco,
          data: this.gastoEmEdicao.data,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        await this.listarGastos();

        this.fecharEdicaoModal();
      } catch (error) {
        console.error('Erro ao editar gasto:', error);
      }
    },
    fecharEdicaoModal() {
      this.gastoEmEdicao = null;
      this.isEdicaoGastoModalVisible = false;
    },
  },
  };
  </script>
  