<template>
  <div
    id="fpd-target"
    class="fpd-sidebar fpd-shadow-2 fpd-views-inside-right"
  ></div>
</template>

<script>
// Import your Supabase client

export default {
  name: "ProductDesigner",
  data() {
    return {
      fpd: null,
    };
  },
  mounted() {
    // Initialize Fancy Product Designer
    const appOptions = {
      productsJSON: "./data/products/product-categories.json",
      designsJSON: "./data/designs/design-categories.json",
      layouts: "./data/layouts/data.json",
      langJSON: "./data/langs/default.json",
      initialActiveModule: "products",
      toolbarPlacement: "sidebar",
      mainBarModules: [
        "products",
        "images",
        "text",
        "designs",
        "manage-layers",
        "text-layers",
        "save-load",
      ],
      fonts: [
        { name: "Lobster", url: "google" },
        {
          name: "Aller",
          url: "fonts/Aller.ttf",
          variants: {
            n7: "fonts/Aller__bold.ttf",
            i4: "fonts/Aller__italic.ttf",
            i7: "fonts/Aller__bolditalic.ttf",
          },
        },
        { name: "Pacifico", url: "fonts/Pacifico.ttf" },
      ],
      textTemplates: [
        {
          text: "Text Template Content",
          properties: {
            fontSize: 30,
            fontFamily: "Lobster",
          },
        },
        {
          text: "Another Text Template",
          properties: {
            fontSize: 50,
            fontFamily: "Pacifico",
          },
        },
      ],
      fileServerURL: "", //enter the url to the file-handler.php, see https://github.com/radykal/fpd-js-server
      facebookAppId: "",
      instagramClientId: "",
      instagramRedirectUri: "./data/html/instagram_auth.html",
      instagramTokenUri: "", //enter the url to the instagram-token.php, see https://github.com/radykal/fpd-js-server
      colorPickerPalette: [
        "#000",
        "#f4cccc",
        "#fce5cd",
        "#fff2cc",
        "#d9ead3",
        "#d0e0e3",
        "#cfe2f3",
        "#d9d2e9",
        "#ead1dc",
        "#5f27cd",
        "#222f3e",
        "#10ac84",
      ],
      pixabayApiKey: "",
      pixabayLang: "en",
      pixabayHighResImages: false,
      elementParameters: {},
      customImageParameters: {
        removable: true,
        draggable: true,
        resizable: true,
        autoCenter: true,
        price: 10,
        maxSize: 10,
        autoSelect: true,
        advancedEditing: true,
      },
      customTextParameters: {
        autoCenter: true,
        draggable: true,
        removable: true,
        colors: true,
      },
    };
    this.fpd = new FancyProductDesigner(this.$el, appOptions);
  },
  // ProductDesigner.vue
  methods: {
    getProductData() {
      return this.fpd.getProduct();
    },
    loadDesign(designData) {
      this.fpd.loadProduct(designData);
    },
    getCanvas() {
      return this.fpd.getProductDataURL()
    },
  },
};
</script>
