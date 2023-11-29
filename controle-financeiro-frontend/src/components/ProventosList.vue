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
        <button @click="iniciarEdicao(provento)">Editar</button>
      </li>
    </ul>

    <!-- Modal de Edição de Provento -->
    <div v-if="isEdicaoProventoModalVisible">
      <label for="valorDisponivelEdicao">Novo Valor Disponível:</label>
      <input type="text" v-model="proventoEmEdicao.valorDisponivel" required />

      <label for="mesEdicao">Novo Mês:</label>
      <input type="number" v-model="proventoEmEdicao.mes" required />

      <label for="anoEdicao">Novo Ano:</label>
      <input type="number" v-model="proventoEmEdicao.ano" required />

      <button @click="editarProvento">Salvar</button>
      <button @click="fecharEdicaoModal">Cancelar</button>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      proventos: [],
      isCadastroProventoFormVisible: false,
      isEdicaoProventoModalVisible: false,
      proventoEmEdicao: null,
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
        await api.post('/proventos', {
          valorDisponivel: this.valorDisponivel,
          mes: this.mes,
          ano: this.ano,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        await this.listarProventos();
        this.fecharModal();
      } catch (error) {
        console.error('Erro ao cadastrar provento:', error);
      }
    },
    fecharModal() {
      this.isCadastroProventoFormVisible = false;
      this.valorDisponivel = '';
      this.mes = '';
      this.ano = '';
    },
    iniciarEdicao(provento) {
      // Cria uma cópia do provento para evitar alterar o original diretamente
      this.proventoEmEdicao = { ...provento };
      // Exibe o modal de edição
      this.isEdicaoProventoModalVisible = true;
    },
    async editarProvento() {
      try {
        // Faz a requisição para editar o provento usando this.proventoEmEdicao
        await api.put(`/proventos/${this.proventoEmEdicao.id}`, this.proventoEmEdicao, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // Atualiza a lista após editar
        await this.listarProventos();
        this.fecharEdicaoModal();
      } catch (error) {
        console.error('Erro ao editar provento:', error);
      }
    },
    fecharEdicaoModal() {
      // Limpa o provento em edição
      this.proventoEmEdicao = null;
      // Fecha o modal de edição
      this.isEdicaoProventoModalVisible = false;
    },
  },
};
</script>
