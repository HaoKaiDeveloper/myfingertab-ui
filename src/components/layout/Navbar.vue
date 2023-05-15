<template>
  <section id="navbar">
    <router-link to="/">
      <img :src="logo" alt="logo" class="logo" />
    </router-link>
    <nav>
      <li>
        <router-link to="/">首頁</router-link>
      </li>
      <li>
        <router-link to="/creators">創作者</router-link>
      </li>
      <li>
        <router-link to="/sheetMusic">指彈樂譜</router-link>
      </li>
      <li>
        <router-link to="/contact">聯絡我們</router-link>
      </li>
      <li>
        <router-link to="/application">提出申請</router-link>
      </li>
    </nav>
    <router-link to="/wishlist" class="iconBtn" v-if="menubarAuthInfo.mbrID">
      <button>
        <v-icon icon="mdi-cards-heart" />
      </button>
    </router-link>
    <button class="member iconBtn" @click="checkMemberLogin">
      <v-icon icon="mdi-account" />
    </button>
    <router-link to="/mycart">
      <button class="cart iconBtn" :cartItems="cartLength">
        <v-icon icon="mdi-cart" />
      </button>
    </router-link>

    <div class="line"></div>
  </section>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import logo from "../../assets/imgs/logo-b.png";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const cartLength = computed(() => {
      return store.getters["order/cartLength"];
    });
    const menubarAuthInfo = computed(() => {
      return store.getters["member/menubarAuthInfo"];
    });

    async function checkMemberLogin() {
      // 確認是否已經登入
      if (menubarAuthInfo.value.mbrID) {
        router.replace("/member");
      } else {
        router.replace("/login");
      }
    }

    return {
      cartLength,
      checkMemberLogin,
      logo,
      menubarAuthInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
#navbar {
  width: 100%;
  max-width: 2000px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: calc(1rem + 0.2vw);
  position: relative;
  margin: 0 auto 2em auto;
  color: var(--grey-4);

  @media screen and (max-width: 870px) {
    display: none;
  }
}
nav {
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 0.5em;

  a {
    padding: 0.2rem 1rem;
    color: var(--d-purple-1);
    border-radius: 7px;
    letter-spacing: 1px;
    &:hover {
      background-color: var(--d-purple-1);
      color: var(--grey-1);
    }
    &.router-link-exact-active {
      color: var(--grey-1);
      background-color: var(--d-purple-1);
    }
  }
}

.iconBtn {
  color: var(--grey-4);
}
.cart {
  position: relative;
  &::before {
    content: attr(cartItems);
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    position: absolute;
    right: -0.5rem;
    top: -0.5rem;
    z-index: 1;
    background-color: red;
    color: var(--grey-1);
    font-size: 15px;
    text-align: center;
  }
}
.logo {
  width: 180px;
}

.line {
  width: 90%;
  height: 1px;
  background-color: var(--grey-5);
  position: absolute;
  bottom: -0.5em;
  left: 50%;
  transform: translateX(-50%);
}
</style>
