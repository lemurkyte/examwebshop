<template >
<div >
     <v-container fluid id="BgPreview">
    </v-container>

  <v-container >
    <v-row  >
      <v-col id="menu-table" >
              <tr v-for="item in menuItems" :key="item.name" class="product">
                <td id="td_menuitem_img">
                  <v-img height="150px" v-bind:src="item.image"></v-img>
                </td>
                <td>
                   <router-link to="/product-details" >
                  <span id="td_name">{{ item.name }}</span>
                     </router-link>
                  <br />
                  <span id="menu_item_description">{{ item.description }}</span>
                </td>
                <td>{{ item.price }} DKK</td>
                <td>
                  <v-btn small  v-on:click="addToBasket(item)">ADD TO CART  <br>
                    <v-icon color="black">shopping_cart</v-icon> 
                    
                  </v-btn>
                </td>
              </tr>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>


<script>

import {dbMenuAdd} from '../../firebase'


export default {
  data() {
    return {
      basketDump:[],
  
    }
  },
  beforeCreate(){
    this.$store.dispatch('setMenuItems')
  },
  methods: {
    addCheckoutItem() {
      this.$store.dispatch('setCheckoutItem')
    },
    addToBasket(item) {
  /*    if (this.basket.find(itemInArray => item.name === itemInArray.name)) {
        item = this.basket.find(itemInArray => item.name === itemInArray.name);
        this.increaseQtn(item);
      } else {
        this.basket.push({
          name: item.name,
          price: item.price,
          quantity: 1
        });
      } */
      this.basketDump.push({
          name: item.name,
          price: item.price,
          quantity: 1
        });
        this.$store.commit('addBasketItems', this.basketDump);
        this.basketDump = [];
    },
    increaseQtn(item) {
      item.quantity++;
    },
    decreaseQtn(item) {
      item.quantity--;

      if (item.quantity === 0) {
        this.basket.splice(this.basket.indexOf(item), 1);
      }
    }
  },
  computed: {
      basket() {
       // return this.$store.state.basketItems
       return this.$store.getters.getBasketItems
      },
      menuItems(){
        return this.$store.getters.getMenuItems
      },
      subTotal () {
          var subCost = 0;
          for( var items in this.basket) {
              var individualItem = this.basket[items];
              subCost += individualItem.quantity * individualItem.price;
          }
          return subCost
      },
      total () {
          var deliveryPrice = 10;
          var totalCost = this.subTotal
          return totalCost + deliveryPrice
      }
  }
};
</script>




<style lang="scss" scoped>
#BgPreview {
    background-image: url("../assets/cover.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
    height: 60vh;
    
}
a {  text-decoration: none;}
#menu-table {
   width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0;
}
 .product {
    width: 300px;
    background-color: #fff;
    list-style: none;
    box-sizing: border-box;
    padding: 1em;
    margin: 1em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 7px;
  }
.col h1 {
  @include infobox_mixin(
    5px,
    map-get($colorz, rgb(73, 73, 73)),
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

#td_name {
  font-size: 1.2em;
  font-weight: normal;
}
tr td {
  padding: 10px 0 5px 0;
  margin: 0 0 0 20px;
  
}
#menu_item_description {
    width: 100%;
    font-weight: 300;
    font-size: 14px;
    font-style: italic;
    align-self: flex-start;
    display: flex;
    justify-content: space-between;
}
#td_menuitem_img{
  max-width: 110px;
  max-height: 110px;
  margin: 0 0 60px 0;
}

</style>