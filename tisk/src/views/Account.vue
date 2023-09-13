<template>
  <div>
    <!-- Pokud není uživatel přihlášen -->
    <div v-if="!user">
      <h2>Přihlášení</h2>
      <form @submit.prevent="login">
        <input v-model="email" placeholder="E-mail" required />
        <input type="password" v-model="password" placeholder="Heslo" required />
        <button type="submit">Přihlásit se</button>
      </form>

      <h2>Registrace</h2>
      <form @submit.prevent="signup">
        <input v-model="registerEmail" placeholder="E-mail" required />
        <input type="password" v-model="registerPassword" placeholder="Heslo" required />
        <button type="submit">Registrovat</button>
      </form>

      <p v-if="error">{{ error }}</p>
    </div>

    <!-- Pokud je uživatel přihlášen -->
    <div v-else>
      <h2>Vítejte, {{ user.email }}</h2>
      <button @click="logout">Odhlásit se</button>
      <UserDesigns />
    </div>
  </div>
</template>
  
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import UserDesigns from '../components/UserDesigns.vue'


export default {
  name: "Authentication",
  components: {
    UserDesigns
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.auth.user);
    const email = ref("");
    const password = ref("");
    const registerEmail = ref("");
    const registerPassword = ref("");
    const error = ref("");

    const login = async () => {
      const result = await store.dispatch("auth/signIn", {
        email: email.value,
        password: password.value,
      });

      if (result.error) {
        error.value = result.error.message;
      }
    };

    const signup = async () => {
      const { data, error } = await store.dispatch("auth/signUp", {
        email: registerEmail.value,
        password: registerPassword.value,
      });

      if (error) {
        error.value = error.message;
      } else if (data && !data.session) {
        error.value = "Prosím, ověřte svůj e-mailový účet.";
      }
    };

    const logout = () => {
      store.dispatch("auth/signOut");
    };

    return {
      user,
      email,
      password,
      registerEmail,
      registerPassword,
      login,
      signup,
      logout,
      error,
    };
  },
};
</script>
  