<template>
  <v-app fluid id="app">
    <navigation  />
   
    <v-content  fluid id>
      <v-container  fluid id>
        <router-view></router-view>
  
      <Footer />
      </v-container>
    </v-content>
   
  </v-app>
</template>

<script>

import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';


  export default {
     components: {
     Navigation,
     Footer
  },
    name: 'App',
    props: {
      source: String,
    },
    
  }
</script>

<style lang="scss">
main{
  background-image: url('./assets/marble.jpg');
  background-size: cover;
}
.col h1 {
  @include infobox_mixin(
    5px,
    map-get($colorz, white),
    10px,
    5px,
    map-get($colorz, white)
  );
  font-weight: bold;
  text-transform: uppercase;
  font-size: 16px;
  text-align: right;
}
.col:last-child h1 {
  text-align: left;
}
#info {
  background-color: white;
}
</style>