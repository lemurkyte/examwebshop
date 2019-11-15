<template>
  
  <div>
    <v-navigation-drawer temporary absolute class="hidden-md-and-up" color="primary" v-model="drawer" >

      <!--This is a comment. Comments are not displayed in the browser
      <div v-if="currentUser">
        <v-card class="mx-auto" max-width="200" tile>
          <v-img height="100%" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg">
            <v-row align="end" class="fill-height">
              <v-col align-self="start" class="pa-0" cols="12">
                <v-avatar class="profile" color="grey" size="65" tile>
                  <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                </v-avatar>
              </v-col>
              <v-col class="py-0">
                <v-list-item color="rgba(0, 0, 0, .4)" dark>
                  <v-list-item-content>
                    <v-list-item-title class="title">{{ currentUser.email }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </div>-->

     <v-list>
       <v-list-tile active-class="pink lighten-2 white--text">
         <router-link tag="li" to="/">
          <v-icon color="orange">home</v-icon>Home
        </router-link>

        <router-link tag="li" to="/about">
          <v-icon color="inprogress">info</v-icon>About
        </router-link>
        <router-link tag="li" to="/login">
          <v-icon color="inprogress">info</v-icon>Login
        </router-link>
        <router-link tag="li" to="/admin">
          <v-icon color="inprogress">lock</v-icon>Admin
        </router-link>
        <router-link tag="li" v-if="currentUser" to="/orders" class="complete--text">
          <v-icon color="complete">assignment</v-icon>Orders
        </router-link>
        <router-link tag="li" to="/basket">
          <v-icon  color="inprogress">shopping_cart 
            </v-icon>Basket
        </router-link>
       </v-list-tile>
     </v-list>
    </v-navigation-drawer>

    <v-toolbar app>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
      
      <v-toolbar-title to="/" class="headline">
         <router-link to="/home" >
        <span>HOME FRAGRANCES</span>
           </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text class="hidden-sm-and-down"  to="/">Home</v-btn>
      <v-btn text class="hidden-sm-and-down" to="/about">About</v-btn>
      <v-btn text class="hidden-sm-and-down" to="/login">Login</v-btn>
      <v-btn text class="hidden-sm-and-down" v-if="currentUser" to="/admin">Admin</v-btn>
      <v-btn text class="hidden-sm-and-down" v-if="currentUser" to="/orders">Orders</v-btn>
      <v-btn text class="hidden-sm-and-down" to="/basket"><v-icon color="black">shopping_cart</v-icon></v-btn>
      
      

      <div class="text-center hidden-sm-and-down " v-if="currentUser">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="100"
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn
          text
          v-on="on"
        >
        <v-icon color="black">person</v-icon>
        </v-btn>
      </template>
      

      <v-card tile>
        
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://scontent.faar2-1.fna.fbcdn.net/v/t1.0-9/66212434_2544525385571357_3407157750159900672_n.jpg?_nc_cat=104&_nc_oc=AQn5SQ_hrLkNW2YpN7rTUcAqGuweH7dqlcSs-vX3c4itEdR_FSW3tDOWaofspxeb7hU&_nc_ht=scontent.faar2-1.fna&oh=78dc1e6e00d1e72e8ac420f7d17678c0&oe=5E5E2E5B" alt="avatar">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ currentUser.email }}</v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </v-list>
        

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>

                    <v-btn  text to="/home">
                    <v-icon left >mdi-settings-outline</v-icon>Settings</v-btn>
                    <v-btn text to="/home">
                    <v-icon left color="red" >mdi-heart</v-icon>Wishlist</v-btn>
                    <v-btn text to="/login" @click.prevent="signOut()">
                    <v-icon left >mdi-logout</v-icon>Sign out</v-btn>

           </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
  

    </v-toolbar>
  </div>
  
</template>

<script>
import { db } from "../../firebase";

import firebase from "firebase";
import "firebase/firestore";
import store from "../store.js";
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch("setUser", user);
  } else {
    store.dispatch("setUser", null);
  }
});
export default {
  data: () => ({
    
    drawer: null
  }),
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    signOut() {
        firebase.auth().signOut().then(() => {
          alert('Logged Out');
          this.$router.replace('/')
        }).catch(error => {
          
        })
      }
  }
  
};

</script>

<style lang="scss" scoped>
a {  text-decoration: none;}

.v-btn:before{
background-color: white;
}
</style>