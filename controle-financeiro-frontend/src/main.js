import { createApp } from 'vue'; // Importa createApp do Vue.js versão 3
import App from './App.vue';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App);
app.config.productionTip = false;

app.mount('#app');
