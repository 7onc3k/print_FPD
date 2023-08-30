<!-- components/Navbar.vue -->

<template>
    <nav>
      <ul>
        <li><router-link to="/">Domů</router-link></li>
        <li><router-link to="/designer">Návrh produktu</router-link></li>
        <li><router-link to="/account">Účet</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Navbar"
  };
  </script>
  
  <style scoped>
  /* Zde můžete přidat vlastní styly pro navigační panel */
  </style>
  