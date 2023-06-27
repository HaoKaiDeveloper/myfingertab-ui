<template>
  <section>
    <div></div>
    <main>
      <p>登入已過時，請重新登入</p>
      <button @click="logout">確認</button>
    </main>
  </section>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    function logout() {
      store.commit("member/logout");
      store.commit("member/setTokenExpired", false);
      router.push("/login");
    }

    return {
      logout,
    };
  },
};
</script>

<style scoped lang="scss">
section {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
div {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
main {
  width: 230px;
  height: 130px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 1.7em;
  font-size: var(--f-mi);
  border-radius: 5px;
  p {
    margin-bottom: 1.5em;
  }
  button {
    background-color: var(--grey-2);
    padding: 0.2em 0.5em;
    border-radius: 7px;
    &:hover,
    &:active {
      background-color: var(--d-purple-2);
      color: var(--grey-1);
    }
  }
}
</style>
