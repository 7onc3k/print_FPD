<!-- Designer.vue -->
<template>
  <div>
    <!-- Pokud není uživatel přihlášen -->
    <div v-if="!isLoggedIn">
      <p>
        Musíte být přihlášeni, abyste mohl(a) používat náš návrhář.
        <router-link to="/account">Přihlaste se zde</router-link>.
      </p>
    </div>

    <!-- Pokud je uživatel přihlášen -->
    <FancyDesigner v-else />
  </div>
</template>

<script>
import FancyDesigner from "../components/ProductDesigner.vue";
import { mapState } from 'vuex';
export default {
  components: {
    FancyDesigner,
  },
  computed: {
    ...mapState('auth', ['user', 'session']),
    isLoggedIn() {
      return !!this.user;
    }
  },
};
</script>





