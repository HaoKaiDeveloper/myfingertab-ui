<template>
  <section id="smallNavbar">
    <div
      class="backbround"
      @click="toggleNavbar"
      :class="{ show: showNavbar }"
    ></div>

    <div :class="navShadow" class="small-nav">
      <p>{{ pageTitle }}</p>
      <router-link to="/">
        <img :src="logoIcon" alt="logo" />
      </router-link>
      <div
        class="toggle_btn"
        :class="{ show: showNavbar }"
        @click="toggleNavbar"
      >
        <div class="toggle"></div>
      </div>
    </div>

    <div class="info" :class="{ show: showNavbar }">
      <nav>
        <li v-for="nav in navInfo" :key="nav.text" @click="toggleNavbar">
          <router-link :to="nav.path">
            {{ nav.text }}
          </router-link>
        </li>
      </nav>

      <div class="btns">
        <router-link
          to="/wishlist"
          class="iconBtn"
          @click="toggleNavbar"
          v-if="menubarAuthInfo.mbrID"
        >
          <button><v-icon icon="mdi-cards-heart " />追蹤清單</button>
        </router-link>
        <button class="member" @click="checkMemberLogin">
          <v-icon icon="mdi-account" />
          {{ memberName ? `Hi ${memberName}` : "會員專區" }}
        </button>
        <router-link to="/mycart" @click="toggleNavbar">
          <button class="cart">
            <v-icon icon="mdi-cart" /> 購物車
            <p>{{ cartLength }}</p>
          </button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import logoIcon from "../../assets/imgs/logo-b.png";
export default {
  setup() {
    const store = useStore();
    const showNavbar = ref(false);
    const route = useRoute();
    const router = useRouter();
    const navShadow = ref("");

    const menubarAuthInfo = computed(() => {
      return store.getters["member/menubarAuthInfo"];
    });

    const memberName = computed(() => {
      return store.getters["member/memberName"];
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        navShadow.value = "scroll";
      } else {
        navShadow.value = "";
      }
    });

    async function checkMemberLogin() {
      // 確認是否已經登入
      if (menubarAuthInfo.value.mbrID) {
        router.replace("/member");
      } else {
        router.replace("/login");
      }
      showNavbar.value = false;
    }

    const cartLength = computed(() => {
      return store.getters["order/cartLength"];
    });
    function toggleNavbar() {
      showNavbar.value = !showNavbar.value;
    }
    const navInfo = ref([
      {
        text: "首頁",
        path: "/",
      },
      {
        text: "創作者",
        path: "/creators",
      },
      {
        text: "指彈樂譜",
        path: "/sheetMusic",
      },
      {
        text: "聯絡我們",
        path: "/contact",
      },
      {
        text: "提出申請",
        path: "/application",
      },
    ]);
    const pageTitle = computed(() => {
      switch (route.name) {
        case "home":
          return "首頁";
        case "news":
          return "最新消息";
        case "creators":
          return "創作者";
        case "singleCreator":
          return "創作者";
        case "sheetMusic":
          return "指彈樂譜";
        case "contact":
          return "聯絡我們";
        case "application":
          return "提出申請";
        case "member":
          return "會員專區";
        case "wishlist":
          return "追蹤清單";
      }
    });

    return {
      showNavbar,
      toggleNavbar,
      navInfo,
      checkMemberLogin,
      pageTitle,
      logoIcon,
      navShadow,
      cartLength,
      menubarAuthInfo,
      memberName,
    };
  },
};
</script>

<style lang="scss" scoped>
#smallNavbar {
  display: none;

  .small-nav {
    width: 100%;
    height: 3.5rem;
    background-color: #fff;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    padding: 1em 1.2em;

    display: flex;
    justify-content: space-between;
    align-items: center;
    &.scroll {
      box-shadow: var(--shodow-1);
    }

    p {
      font-size: var(--f-mi);
    }

    img {
      height: 3.2rem;
      object-fit: cover;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .toggle_btn {
      width: 3.5em;
      height: 3.5em;
      border-radius: 3px;
      display: flex;
      align-items: center;
      padding: 0.1em;
      box-shadow: var(--shodow-1);
      .toggle {
        width: 3em;
        height: 2.3px;
        background-color: var(--d-purple-1);
        position: relative;
        transition: all 0.3s;
        &::before,
        &::after {
          content: "";
          width: 100%;
          height: 2.3px;
          background-color: var(--d-purple-1);
        }
        &::before {
          position: absolute;
          top: 0.7em;
        }
        &::after {
          position: absolute;
          bottom: 0.7em;
        }
      }
    }

    .toggle_btn.show {
      .toggle {
        transform: rotate(45deg);
        &::before {
          transform: rotate(-90deg);
          top: 0;
        }
        &::after {
          display: none;
        }
      }
    }
  }

  .backbround {
    width: 100%;
    height: 100%;
    background-color: var(--grey-5);
    opacity: 0;
    visibility: hidden;
    translate: all 0.5s ease;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
  }
  .backbround.show {
    opacity: 0.7;
    visibility: visible;
  }
  .info {
    width: 30vw;
    min-width: 220px;
    height: 100%;
    position: fixed;
    top: 0;
    right: -100%;
    background-color: var(--grey-1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem 0;
    transition: all 0.5s ease;
    z-index: 3;
    nav {
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 1em;

      li {
        width: 100%;
      }
      a {
        display: block;
        width: 100%;
        padding: 0.7em 1em;
        font-size: var(--f-mi);
        color: var(--d-purple-1);
        border-radius: 5px;
        letter-spacing: 1px;
        &.router-link-exact-active {
          color: var(--grey-1);
          background-color: var(--d-purple-1);
        }
      }
    }
    .btns {
      button {
        width: 100%;
        font-size: var(--f-mi);
        color: var(--grey-4);
        padding: 0.7em 1em;
        margin-bottom: 0.5em;
        text-align: left;
        background-color: #eeeeee;
        display: flex;
        align-items: center;
        gap: 0.5em;
      }
      .cart {
        p {
          width: 1.4rem;
          height: 1.4rem;
          border-radius: 50%;
          background-color: red;
          color: var(--grey-1);
          font-size: 15px;
          text-align: center;
        }
      }
    }
  }
  .info.show {
    right: 0%;
  }

  @media screen and (max-width: 860px) {
    display: block;
  }
}
</style>
