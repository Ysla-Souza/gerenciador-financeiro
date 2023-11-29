<template>
  <div>
    <h2>Proventos</h2>
    <button @click="listarProventos">Listar Proventos</button>
    <button @click="toggleCadastroProventoForm">Cadastrar Provento</button>
    <form v-if="isCadastroProventoFormVisible" @submit.prevent="cadastrarProvento">
      <label for="valorDisponivel">Valor Disponível:</label>
      <input type="text" v-model="valorDisponivel" required />

      <label for="mes">Mês:</label>
      <input type="number" v-model="mes" required />

      <label for="ano">Ano:</label>
      <input type="number" v-model="ano" required />

      <button type="submit">Cadastrar</button>
    </form>

    <ul v-if="proventos.length">
      <li v-for="provento in proventos" :key="provento.id">
        {{ provento.valor_disponivel }} - {{ provento.mes }}/{{ provento.ano }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      proventos: [],
      isCadastroProventoFormVisible: false,
      valorDisponivel: '',
      mes: '',
      ano: '',
    };
  },
  methods: {
    async listarProventos() {
      try {
        const response = await api.get('/proventos');
        this.proventos = response.data;
      } catch (error) {
        console.error('Erro ao listar proventos:', error);
      }
    },
    toggleCadastroProventoForm() {
      this.isCadastroProventoFormVisible = !this.isCadastroProventoFormVisible;
    },
    async cadastrarProvento() {
      try {
        // Adicionando o cabeçalho Content-Type: application/json
        await api.post('/proventos', {
          valor_disponivel: this.valorDisponivel,
          mes: this.mes,
          ano: this.ano,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // Atualiza a lista após cadastrar
        await this.listarProventos();
        this.fecharModal();
      } catch (error) {
        console.error('Erro ao cadastrar provento:', error);
      }
    },
    fecharModal() {
      this.isCadastroProventoFormVisible = false;
      // Limpa os campos do formulário após fechar o modal
      this.valorDisponivel = '';
      this.mes = '';
      this.ano = '';
    },
  },
};
</script>
