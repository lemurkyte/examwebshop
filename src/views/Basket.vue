<template>
  <v-container> 
    <v-row>
          <v-col offset-md="7" md="4">
        <h1>Current Cart</h1>
        <div class="pa-2" id="info">
          <v-simple-table id="menu-table" v-if="basket.length > 0">
            <thead>
              <tr>
                <th class="text-left" style="width:30%">Quantity</th>
                <th class="text-left" style="width:50%">Name of item</th>
                <th class="text-left" style="width:20%">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in basket" :key="item.name">
                <td>
                  <v-icon color="grey" @click="increaseQtn(item)">add_box</v-icon>
                  {{ item.quantity }}
                  <v-icon color="grey" @click="decreaseQtn(item)">indeterminate_check_box</v-icon>
                </td>
                <td>{{ item.name }}</td>
                <td>{{item.price}}</td>
              </tr>
            </tbody>
          </v-simple-table>

          <v-simple-table v-else>
            <p>The cart is empty</p>
          </v-simple-table>

          <v-divider></v-divider>
          <v-row id="basket_checkout" class="mt-4" style="margin:0;">
            <v-col>
              <p>Subtotal:</p>
              <p>Delivery:</p>
              <p>Total amount:</p>
            </v-col>
            <v-col class="text-right">
              <p>{{subTotal}} DKK</p>
              <p>10 DKK</p>
              <p>
                <b>{{total}} DKK</b>
              </p>
            </v-col>
          </v-row>
          <v-row style="margin:0;">
            <v-spacer></v-spacer>
            <v-btn color="grey" @click="addCheckoutItem()">Checkout</v-btn>
          </v-row>
        </div>
      </v-col>
        </v-row>
    </v-container>
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
tr th {
  font-weight: 300;
}
#td_name {
  font-weight: bold;
}
tr td {
  padding: 10px 10px 10px 16px;
}
#menu_item_description {
  font-style: italic;
  font-weight: 300;
  color: map-get($colorz, darkgrey);
  font-size: 13px;
}
#td_menuitem_img{
  max-width: 40px;
  max-height: 40px;
  padding:0;
}
#basket_checkout {
  font-size: 13px;
}
#basket_checkout p:first-child {
  line-height: 2px;
}
</style>