<template>
  <section id="forgotpassword">
    <main>
      <h1>{{ title }}</h1>
      <form v-if="!emailExist" @submit.prevent="checkEmailExist">
        <label for="email">
          Email :
          <input type="email" id="email" v-model="email" />
        </label>
        <p>
          <span v-if="msg">{{ msg }}</span>
        </p>
        <button type="submit">確認</button>
      </form>

      <form v-else @submit.prevent="resetPassword">
        <label for="newPassword">
          密碼:
          <input type="password" id="newPassword" v-model="password" />
        </label>
        <p>
          <span v-if="msg">{{ msg }}</span>
        </p>
        <button type="submit">確認</button>
      </form>
    </main>
  </section>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const title = ref("請輸入Eamil");
    const email = ref("");
    const password = ref("");
    const emailExist = ref(false);
    const msg = ref("");

    if (Object.keys(route.query).length > 0) {
      emailExist.value = true;
      title.value = "請重新設定密碼";
    }

    async function resetPassword() {
      if (!password.value || !emailExist.value) return;

      try {
        const res = await store.dispatch("member/resetPassword", {
          token: route.query.token,
          newPassword: password.value,
        });

        msg.value = res + "5秒後將重新轉跳";
        if (res === "密碼更改成功，請重新登入") {
          setTimeout(() => {
            title.value = "請輸入Eamil";
            emailExist.value = false;
            msg.value = "";
            router.push("/login");
          }, 5000);
        }
      } catch (err) {
        console.log(err);
      }
    }

    async function checkEmailExist() {
      if (!email.value) return;
      try {
        const res = await store.dispatch("member/checkEmailExist", email.value);
        msg.value = res;
      } catch (err) {
        console.log(err);
      }
    }

    watch(
      () => msg.value,
      () => {
        if (msg.value) {
          setTimeout(() => {
            msg.value = "";
          }, 2000);
        }
      }
    );

    return {
      title,
      password,
      email,
      emailExist,
      msg,
      checkEmailExist,
      resetPassword,
    };
  },
};
</script>

<style scoped lang="scss">
#forgotpassword {
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

main {
  width: 100%;
  min-width: 250px;
  max-width: 360px;
  box-shadow: var(--shodow-1);
  border-radius: 5px;
  padding: 2em;
  margin-top: 5em;

  h1 {
    font-size: var(--f-l);
    text-align: center;
  }

  p {
    height: 10px;
    font-size: var(--f-mi);
    color: blue;
  }

  button {
    font-size: var(--f-mi);
    display: block;
    width: 10rem;
    border: 1px solid var(--grey-3);
    margin: 1em auto;
    padding: 0.2em 0.5em;
    border-radius: 7px;
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
  }
}
</style>
