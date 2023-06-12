<template>
  <section id="cartPage">
    <p class="title">購物車</p>
    <div class="cart_items" v-if="cartItems.length > 0">
      <CartItem v-for="item in cartItems" :key="item.sheetId" :item="item" />

      <p class="totalPrice">總計 : {{ totalPrice }}</p>

      <button
        type="button"
        class="checkout"
        @click="createNewOrder"
        v-if="menubarAuthInfo.token"
      >
        結帳
      </button>
      <router-link to="/login" class="login_btn" v-else>
        <button type="button">登入後結帳</button>
      </router-link>
    </div>
    <h1 v-else class="alert">購物車暫無商品</h1>
    <QrcodePop v-show="qrcodeUrl" :url="qrcodeUrl" @close-popup="closePopup" />
  </section>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { CartItem, QrcodePop } from "../../components/Cartpage/index";
import { UAParser } from "ua-parser-js";
export default {
  components: { CartItem, QrcodePop },
  setup() {
    const store = useStore();
    const uaparser = new UAParser();
    const qrcodeUrl = ref("");
    const menubarAuthInfo = computed(() => {
      return store.getters["member/menubarAuthInfo"];
    });

    const cartItems = computed(() => {
      return store.getters["order/cartItems"];
    });

    const totalPrice = computed(() => {
      if (cartItems.value.length > 0) {
        return cartItems.value.reduce((acc, prev) => {
          return (acc += Number(prev.saleprice));
        }, 0);
      }
    });

    const isMobile = computed(() => {
      return uaparser.getDevice();
    });

    async function createNewOrder() {
      try {
        const res = await store.dispatch("order/createNewOrder", {
          ...menubarAuthInfo.value,
          cartItems: cartItems.value,
        });

        if (res.status === 200) {
          const url = res.data;

          if (isMobile.value.type === "mobile") {
            window.location = url;
          } else {
            //彈出視窗
            qrcodeUrl.value = url;
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    function closePopup() {
      qrcodeUrl.value = "";
    }

    return {
      cartItems,
      totalPrice,
      menubarAuthInfo,
      createNewOrder,
      qrcodeUrl,
      closePopup,
    };
  },
};
</script>

<style scoped lang="scss">
section {
  padding: 0 5em;
  min-height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  margin: 0 auto;
  color: var(--grey-4);

  @media screen and (max-width: 1000px) {
    padding: 0 1em;
  }
}

.title {
  align-self: flex-start;
  font-size: var(--f-l);
  margin-bottom: 0.5em;
  margin-left: 1.5rem;
  @media screen and (max-width: 600px) {
    margin-left: 0rem;
  }
}

.alert {
  font-size: var(--f-l);
}

.cart_items {
  width: 100%;
  max-width: 600px;

  .checkout,
  .login_btn {
    text-align: center;
    color: var(--grey-4);
    font-size: var(--f-mi);
    font-weight: 600;
    background-color: var(--grey-2);
    padding: 0.5em 1em;
    display: block;
    width: 10em;
    margin: 0 auto;
    border-radius: 7px;
    letter-spacing: 2px;

    &:hover,
    &:active {
      background-color: var(--d-purple-1);
      color: var(--grey-1);
    }
  }

  .totalPrice {
    text-align: right;
    font-size: var(--f-l);
    margin-bottom: 1em;
  }
}
</style>
