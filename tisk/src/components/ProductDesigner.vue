<template>
  <div id="fpd-target" class="fpd-sidebar"></div>
</template>

<script>
export default {
  name: "ProductDesigner",
  mounted() {
    // Zde inicializujeme Fancy Product Designer
    const appOptions = {
      productsJSON: "/products.json",
      designsJSON: "/designs.json",
    }; // Vaše konfigurace
    new FancyProductDesigner(this.$el, appOptions);
  },
};
</script>
