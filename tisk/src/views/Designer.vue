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
      <button @click="downloadDesign">Stáhnout design</button>
      <button @click="fetchDesigns">Load Designs</button>
      <div v-for="design in designs" :key="design.id">
        <img :src="design.thumbnail" alt="Design preview" />
        <p>ID: {{ design.id }}</p>
        <button @click="$refs.fancyDesigner.loadDesign(design.design_data)">
          Load Design
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FancyDesigner from "../components/ProductDesigner.vue";
import { supabase } from "../supabaseClient";
import { mapState } from "vuex";
export default {
  components: {
    FancyDesigner,
  },
  data() {
    return {
      designs: [],
    };
  },
  computed: {
    ...mapState("auth", ["user", "session"]),
    isLoggedIn() {
      return !!this.user;
    },
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
        .insert([{ user_id: this.user.id, design_data: productData }], {
          returning: "representation",
        });
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
    async fetchDesigns() {
      const { data, error } = await supabase
        .from("user_designs")
        .select("*")
        .eq("user_id", this.user.id);

      if (error) {
        console.error("Error fetching designs:", error);
      } else {
        this.designs = data;
      }
    },
    downloadDesign() {
    const canvas = this.$refs.fancyDesigner.getCanvas();
    canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2, // Zvětšete obrázek pro lepší kvalitu tisku
      callback: function (imageDataURL) {
        const link = document.createElement('a');
        link.href = imageDataURL;
        link.download = 'design.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    });
  },
  },
};
</script>
