<template>
  <div>
      <v-container class="mt-5" id="Rectangle">
        <v-layout fill-height wrap>
          <v-flex xs12 lg6>
            <v-img class="img" :src="require('../assets/about.jpg')"></v-img>
          </v-flex>
          <v-flex class="pa-4" xs12 lg6>
            <h1 id="Headline" class="pb-3 px-3">ABOUT</h1>

            <p id="pf" class="px-3">
                Antoine Pour Elle 🌸🌸 is a smell for women- an excellent fragrance-based composition that is enhanced by the feminine scents of pink.

At first, you only smell feminine perfumes, but it soon turns out that a man's aroma will not look far. Dominant scent notes: amber and petals. <br> Secondary scents: cedar, incense, rose, flint.

Antoine Pour Elle laundry detergents
- Concentrated product (3: 1);
- One cap (20 ml) is enough to wash 10 t-shirts or 3 kg clothes;
- Can be washed at 30 degrees; -
- If you want to avoid unwanted mixing of two different odors, we recommend using equally fragrant products (detergent + softener).
Capacity: 750 ml. About 30 washes will be enough.
<br><br>
                Cereria Molla 🌸🌸 1899 created its first home scent in 1899. Handmade candles made from natural vegetable wax.
                 It is a Spanish product of very high quality and subtle smell.
              Home Fragrances will offer unique, exclusive and natural fragrances, produced in France and Spain, which you are going to love it.
               For further information, you are welcome to contact us. Delivering is available by post in Denmark.

            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
</template>

<style lang="scss" scoped>
  .info_box:first-child .flex h1 {
    font-size: 150%;
    padding: 50px;
    
  }
  #Info_1 {
    /*background-image: url("../assets/about.jpg");*/
    background-repeat: no-repeat;
    background-size: cover;
    height: 80vh;
   
}
#pf {
  font-size: 16px;
}

#Headline {
  text-align: left;
}
h1 {
  text-align: center;
}
#Rectangle {
  padding: 0px !important;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px var(--light-periwinkle);
  background-color: white;
  margin-bottom: 2%;
}
.img {
  border-radius: 8px;
}
</style>
