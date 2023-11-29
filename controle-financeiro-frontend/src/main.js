import { createApp } from 'vue'; // Importa createApp do Vue.js versão 3
import App from './App.vue';
import axios from 'axios';

const app = createApp(App);
app.config.productionTip = false;

app.mount('#app');
