<!-- Designer.vue -->
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
    <div v-else>
      <FancyDesigner ref="fancyDesigner" />
      <button @click="saveProduct">Uložit</button>
    </div>
  </div>
</template>

<script>
import FancyDesigner from "../components/ProductDesigner.vue";
import { supabase } from "../supabaseClient";
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
  methods: {
    async saveProduct() {
      if (!this.isLoggedIn) {
        alert("Musíte být přihlášeni, abyste mohl(a) uložit produkt.");
        return;
      }

      const productData = this.$refs.fancyDesigner.getProductData();
      console.log("Product data:", productData); // Vypište data produktu

      const { data, error } = await supabase
        .from("user_designs")
        .insert([{ user_id: this.user.id, design_data: productData }], { returning: 'representation' });
      console.log("Supabase response data:", data);
      if (error) {
        console.error("Error:", error);
        console.error("Supabase error:", error.message);
      } else if (data && data[0]) {
        console.log("Product stored with ID:", data[0].id);
      } else {
        console.log("Product stored, but ID not available");
      }
    },
  },
};
</script>





