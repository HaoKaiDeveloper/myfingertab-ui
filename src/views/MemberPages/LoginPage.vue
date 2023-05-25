<template>
  <section id="loginPage">
    <main>
      <h1>{{ title }}</h1>
      <form @submit.prevent="memberAuth">
        <label for="name" v-if="!isMember">
          姓名 :
          <input type="text" id="name" v-model="name" />
        </label>
        <label for="email">
          Email :
          <input type="email" id="email" v-model="email" />
        </label>
        <label for="password">
          密碼 :
          <input type="password" id="password" v-model="password" />
        </label>

        <p v-if="errMsg" class="err_msg">{{ errMsg }}</p>

        <button type="submit" class="submit_btn" v-else>
          {{ isMember ? "登入" : "註冊" }}
        </button>
        <button type="button" @click="toggleIsMember" class="toggle_btn">
          {{ isMember ? "會員註冊" : "會員登入" }}
        </button>
      </form>

      <hr />

      <div class="btns">
        <button type="button" @click="googleLogin">Google</button>
        <router-link to="/setPassword" v-if="isMember">忘記密碼</router-link>
      </div>
    </main>

    <div class="registerPop" v-if="registerStatus">
      <div class="backdrop" @click="registerStatus = !registerStatus"></div>
      <div class="text">
        <img :src="logo" alt="logo" />
        <p class="regi_msg">註冊成功，請至信箱查看確認信</p>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import logo from "../../assets/imgs/logo-b.png";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const isMember = ref(true);
    const email = ref("");
    const password = ref("");
    const name = ref("");
    const registerStatus = ref(false);
    const errMsg = ref("");

    const title = computed(() => {
      if (isMember.value) {
        return "會員登入";
      } else {
        return "會員註冊";
      }
    });

    if (Object.keys(route.query).length > 0) {
      store.dispatch("member/memberActivate", route.query.token);
    }

    async function register() {
      if (!name.value) {
        return;
      }
      try {
        const res = await store.dispatch("member/memberRegister", {
          name: name.value,
          email: email.value,
          password: password.value,
          userId: name.value,
        });
        if (!res || res.data === "該信箱已經註冊過，請更換信箱") {
          errMsg.value = "該信箱已經註冊過";
          return (registerStatus.value = false);
        }
        registerStatus.value = true;
      } catch (err) {
        registerStatus.value = false;
        console.log(err);
      }
    }

    async function login() {
      try {
        const res = await store.dispatch("member/memberLogin", {
          email: email.value,
          password: password.value,
        });
        const { accessToken, mbrID } = res;
        if (!accessToken) {
          return (errMsg.value = "登入失敗");
        }
        localStorage.setItem(
          "member",
          JSON.stringify({
            token: accessToken,
            mbrID,
          })
        );
        store.commit("member/setMemberAuthInfo", {
          token: accessToken,
          mbrID,
        });
        router.push("/");
      } catch (err) {
        errMsg.value = "登入失敗";
        console.log(err);
      }
    }

    async function memberAuth() {
      if (!email.value || !password.value) {
        return;
      }
      if (isMember.value) {
        return login();
      }
      register();
    }

    function googleLogin() {
      window.location.href =
        "https://s.intella.co/myfingertab/oauth2/authorization/google";
    }

    function toggleIsMember() {
      isMember.value = !isMember.value;
    }

    watch(
      () => errMsg.value,
      () => {
        if (errMsg.value) {
          setTimeout(() => {
            errMsg.value = "";
          }, 2000);
        }
      }
    );

    return {
      logo,
      isMember,
      memberAuth,
      name,
      password,
      email,
      title,
      errMsg,
      toggleIsMember,
      registerStatus,
      googleLogin,
    };
  },
};
</script>

<style scoped lang="scss">
#loginPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  width: 90%;
  min-height: 95vh;
  margin: 0 auto;
  color: var(--grey-4);
  padding: 0 0.5em;
  @media screen and (max-width: 1000px) {
    padding: 0 1.5em;
    width: 100%;
  }
}
.registerPop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .backdrop {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
  }

  .text {
    width: 100%;
    min-width: 250px;
    max-width: 360px;
    height: 180px;
    background-color: #fff;
    position: relative;
    z-index: 2;
    text-align: center;
    font-size: var(--f-mi);
    img {
      display: block;
      width: 200px;
      object-fit: cover;
      margin: 1em auto;
      margin-bottom: 2em;
    }
  }
}

main {
  width: 100%;
  min-width: 250px;
  max-width: 360px;
  box-shadow: var(--shodow-1);
  border-radius: 5px;
  padding: 2em;
  margin-top: 5em;

  hr {
    width: 80%;
    margin: 0 auto;
    border: 0.5px dashed var(--grey-3);
  }

  h1 {
    font-size: var(--f-l);
    text-align: center;
  }

  button {
    font-size: var(--f-mi);
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2em;
    margin-bottom: 1em;

    label {
      width: 100%;
      font-size: var(--f-mi);
      letter-spacing: 1.5px;
    }
    input {
      width: 100%;
      outline: none;
      border-bottom: 1px solid var(--grey-3);
      padding: 0.2em 0.5em;

      &:focus {
        border-bottom: 1px solid var(--d-purple-2);
      }
    }
    .submit_btn {
      border: 1px solid var(--grey-3);
      padding: 0.2em 0.5em;
      border-radius: 5px;
      &:active,
      &:hover {
        background-color: var(--d-purple-1);
        color: var(--grey-1);
      }
    }

    .toggle_btn {
      margin-top: -0.5em;
      width: auto;
      color: blue;
      border-bottom: 0.7px solid blue;
      font-size: var(--f-s);
    }
  }

  .err_msg {
    height: 30.88px;
    font-size: var(--f-mi);
  }

  .regi_msg {
    text-align: center;
    font-size: var(--f-mi);
    font-weight: 600;
  }

  .btns {
    text-align: center;
    button {
      display: block;
      width: 10rem;
      border: 1px solid var(--grey-3);
      margin: 1em auto;
      padding: 0.2em 0.5em;
      border-radius: 7px;
    }
    a {
      margin-top: -0.5em;
      width: auto;
      color: blue;
      border: none;
      border-radius: 0;
      border-bottom: 0.7px solid blue;
      font-size: var(--f-s);
    }
  }
}
</style>
