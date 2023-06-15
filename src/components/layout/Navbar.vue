<template>
  <section id="navbar" :class="navScroll">
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
    <button
      class="member iconBtn"
      :class="{ active: memberName }"
      @click="checkMemberLogin"
    >
      <v-icon icon="mdi-account" />
      <p>{{ memberName }}</p>
    </button>
    <router-link to="/mycart">
      <button class="cart iconBtn" :cartItems="cartLength">
        <v-icon icon="mdi-cart" />
      </button>
    </router-link>
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
    const navScroll = ref("");

    const cartLength = computed(() => {
      return store.getters["order/cartLength"];
    });

    const menubarAuthInfo = computed(() => {
      return store.getters["member/menubarAuthInfo"];
    });

    const memberName = computed(() => {
      return store.getters["member/memberName"];
    });

    async function checkMemberLogin() {
      // 確認是否已經登入
      if (menubarAuthInfo.value.mbrID) {
        router.replace("/member");
      } else {
        router.replace("/login");
      }
    }

    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        navScroll.value = "scroll";
      } else {
        navScroll.value = "";
      }
    });

    return {
      cartLength,
      checkMemberLogin,
      logo,
      menubarAuthInfo,
      memberName,
      navScroll,
    };
  },
};
</script>

<style lang="scss" scoped>
#navbar {
  width: 100%;
  max-width: 2000px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: calc(1rem + 0.2vw);
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  padding: 0 1em;
  color: var(--grey-4);

  @media screen and (max-width: 860px) {
    display: none;
  }

  &.scroll {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
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
.member {
  position: relative;
  p {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: var(--f-s);
    width: 100%;
    white-space: nowrap;
  }
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
</style>
