<template>
  <div class="detail">
    <h1>coming soon...</h1>
    <div class="item" v-if="item">
      <div class="item-image">
        <img src="@/assets/antoine.jpg" />
      </div>

      <div class="item-content">
        <div class="title_writer">
          <h3 class="grey-text">{{item.name}}</h3>
        </div>
        <div class="divider"></div>

        <!--color pick-->
        <div class="color_pick" v-show="item.colors">
          <h4 class="sub_title">Color</h4>
          <p v-show="item.colors.includes('Red')">
            <label>
              <input name="color" type="radio" value="Red" />
              <span>Red</span>
            </label>
          </p>
          <p v-show="item.colors.includes('Yellow')">
            <label>
              <input name="color" type="radio" value="Yellow" />
              <span>Yellow</span>
            </label>
          </p>
          <p v-show="item.colors.includes('Green')">
            <label>
              <input name="color" type="radio" value="Green" />
              <span>Green</span>
            </label>
          </p>
          <p v-show="item.colors.includes('White')">
            <label>
              <input name="color" type="radio" value="White" />
              <span>White</span>
            </label>
          </p>
          <p v-show="item.colors.includes('Black')">
            <label>
              <input name="color" type="radio" value="Black" />
              <span>Black</span>
            </label>
          </p>
        </div>
        <!--size pick-->
        <div class="size_pick">
          <h4 class="sub_title">Size</h4>
          <p>
            <label>
              <input name="size" type="radio" value="S" />
              <span>S</span>
            </label>
          </p>
          <p>
            <label>
              <input name="size" type="radio" value="M" />
              <span>M</span>
            </label>
          </p>
          <p>
            <label>
              <input name="size" type="radio" value="L" />
              <span>L</span>
            </label>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",

  data() {
    return {
      moment: moment,
      item: null,
      quantityNumber: 0,
      colorValue: null,
      sizeValue: null,
      quantityValue: null,
      total: null,
      feedback: null
    };
  },
  beforeCreate() {
    this.$store.dispatch("setMenuItems");
  },

  methods: {
    addComma(num) {
      var regexp = /\B(?=(\d{3})+(?!\d))/g;
      return num.toString().replace(regexp, ",");
    },
    addQuantity() {
      if (this.quantityNumber >= 0) {
        this.quantityNumber++;
      }
    },
    subtractQuantity() {
      if (this.quantityNumber > 0) {
        this.quantityNumber--;
      }
    },
    addingList() {
      //get color value
      var colors = document.getElementsByName("color");
      var colorValue;
      for (var i = 0; i < colors.length; i++) {
        if (colors[i].checked) {
          this.colorValue = colors[i].value;
        }
      }
      //get size value
      var sizes = document.getElementsByName("size");
      var sizeValue;
      for (var j = 0; j < sizes.length; j++) {
        if (sizes[j].checked) {
          this.sizeValue = sizes[j].value;
        }
      }
      //get quantity value
      this.quantityValue = this.quantityNumber;

      if (this.colorValue && this.sizeValue && this.quantityValue) {
        this.listing_item = true;
        this.feedback = null;
        this.total = this.item.price * this.quantityValue;
      } else {
        this.feedback = " 원하시는 색상, 사이즈, 수량을 선택해주세요.";
      }
    },
    resetList() {
      this.feedback = null;
      this.colorValue = null;
      this.sizeValue = null;
      this.quantityValue = null;
      this.total = null;
      this.quantityNumber = 0;
      //document.getElementsByName('size').checked = false
      this.listing_item = false;
    },
    addCart() {
      if (this.listing_item) {
        this.feedback = null;
        db.collection("cartitems")
          .add({
            title: this.item.title,
            price: this.item.price,
            product_id: this.item.id,
            color: this.colorValue,
            size: this.sizeValue,
            quantity: this.quantityValue,
            total: this.total,
            user: this.user.id
          })
          .then(() => {
            this.$swal({
              position: "center",
              type: "success",
              title: "장바구니 담기 완료",
              showConfirmButton: false,
              timer: 1000
            });
            this.$router.push({ name: "Cart" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "장바구니 담기 실패. Try it again Please!";
      }
    },
    addWish() {
      db.collection("wishitems")
        .add({
          item_id: this.item.id,
          item_slug: this.item.slug,
          user: this.user.id
        })
        .then(() => {
          this.$swal({
            position: "center",
            type: "success",
            title: "찜 완료",
            showConfirmButton: false,
            timer: 1000
          });
          this.$router.push({ name: "Wish" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>




<style lang="scss" scoped>
.detail {
  width: 80%;
  margin: 60px auto;
}
.item {
  width: 100%;
  overflow: hidden;
}
.item .item-image img {
  width: 40%;
  float: left;
  margin-top: 50px;
}
.item .item-content {
  width: 60%;
  float: right;
  padding: 0 50px 0 50px;
}
.item .item-content h3 {
  font-size: 2em;
  display: inline-block;
  margin: 0 20px 5px 0;
}
.writer {
  display: inline-block;
  margin: 0 0 5px 0;
  color: #666;
}
.item .item-content h2 span {
  font-size: 1em;
}

.price_date .price {
  font-size: 1.6em;
  font-weight: bold;
  margin: 10px 0 0 0;
  width: 50%;
  display: inline-block;
}
.price_date .date {
  text-align: right;
  margin: 0;
  display: inline-block;
  width: 48%;
}
.divider {
  margin: 20px 0;
}
.tags li {
  display: inline-block;
  margin-right: 10px;
}
.tags li:hover {
  color: red;
  cursor: pointer;
  text-decoration: underline;
}
.color_pick span {
  padding-left: 25px;
  font-size: 1.6em;
}
.color_pick {
  margin-bottom: 20px;
}
.color_pick p {
  display: inline-block;
  margin-right: 10px;
}

.size_pick span {
  padding-left: 25px;
  font-size: 1.6em;
}
.size_pick {
  margin-bottom: 20px;
}
.size_pick p {
  display: inline-block;
  margin-right: 10px;
}

.sub_title {
  font-weight: bold;
  color: #ff7657;
  display: block;
  margin-bottom: 10px;
  font-size: 1.1em;
}

.quantity_pick .quantity_box {
  margin-top: 20px;
}
.quantity_pick .quantity_box i {
  cursor: pointer;
}
.quantity_pick .quantity_value {
  border: 1px solid #cacaca;
  padding: 6px 10px;
  font-size: 1.4em;
  border-radius: 10px;
}

.adding_btn {
  margin-top: 20px;
}

.detail_table {
  width: 80%;
  margin-left: 30px;
}
.detail_table th,
td {
  text-align: center;
}
.listing {
  overflow: hidden;
}
.listing .listing_reset {
  float: right;
  cursor: pointer;
}
.detail .icons {
  margin: 40px 0;
}
.detail .icons a {
  line-height: 36px;
  text-align: center;
  margin: 0 5px;
}
.detail .icons i {
  margin-top: 2px;
}

.description {
  width: 90%;
  margin: 20px auto;
}

#BgPreview {
  background-image: url("../assets/cover.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 60vh;
}
a {
  text-decoration: none;
}
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
#td_menuitem_img {
  max-width: 110px;
  max-height: 110px;
  margin: 0 0 60px 0;
}
</style>