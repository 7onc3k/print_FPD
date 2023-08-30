import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { supabase } from './supabaseClient';
import store from './store';



const app = createApp(App);

app.provide('supabase', supabase);

app.use(router);
app.use(store); // Using the Vuex store
store.dispatch('auth/fetchUser').then(() => {
    app.mount('#app');
});
