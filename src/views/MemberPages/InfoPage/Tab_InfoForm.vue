<template>
  <form class="basic_info" @submit.prevent="setMemberInfo">
    <div>
      <label>Email</label>
      <p>{{ info.email }}</p>
    </div>
    <div>
      <label for="name">姓名</label>
      <input
        type="text"
        id="name"
        :placeholder="info.name"
        v-model="info.name"
      />
    </div>
    <div>
      <label for="tel">聯絡電話</label>
      <input type="tel" id="tel" :placeholder="info.tel" v-model="info.tel" />
    </div>
    <div class="gender">
      <label for="gender">性別</label>
      <label for="man">
        <input
          type="radio"
          name="gender"
          id="man"
          value="M"
          v-model="info.gender"
          :checked="info.gender === 'M'"
        />
        男
      </label>
      <label for="woman">
        <input
          type="radio"
          name="gender"
          id="woman"
          value="F"
          v-model="info.gender"
          :checked="info.gender === 'F'"
        />
        女
      </label>
    </div>
    <div>
      <label for="address">聯絡地址</label>
      <input
        type="text"
        id="address"
        :placeholder="info.addr"
        v-model="info.addr"
      />
    </div>
    <div>
      <label for="birthday">生日 </label>
      <input
        type="date"
        id="birthday"
        :placeholder="info.birth"
        v-model="info.birth"
      />
    </div>
    <p class="msg">{{ msg }}</p>
    <button type="submit">
      儲存會員資料 <v-icon icon="mdi-arrow-right" class="i" />
    </button>
    <button type="button" @click="logout">登出</button>
  </form>
</template>

<script>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const msg = ref("");
    const info = ref({
      addr: "",
      birth: "",
      name: "",
      tel: "",
      gender: "",
      email: "",
    });

    const menubarAuthInfo = computed(() => {
      return store.getters["member/menubarAuthInfo"];
    });

    getMemberInfo();
    async function getMemberInfo() {
      try {
        const data = await store.dispatch(
          "member/getMemberInfo",
          menubarAuthInfo.value
        );
        info.value = { ...info.value, ...data };
      } catch (err) {
        console.log(err);
      }
    }

    async function setMemberInfo() {
      try {
        await store.dispatch("member/setMemberInfo", {
          info: { ...info.value },
          ...menubarAuthInfo.value,
        });
        store.commit("member/setMemberName", info.value.name);
        msg.value = "資料更新完成";
      } catch (err) {
        console.log(err);
      }
    }

    function logout() {
      store.commit("member/logout");
      router.push("/");
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
      info,
      setMemberInfo,
      msg,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
.basic_info {
  width: 100%;
  max-width: 40em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  margin: 0 auto;
  padding: 0 0.7em;
  font-size: calc(0.9rem + 0.2vw);
  word-break: break-all;

  .msg {
    font-size: var(--f-mi);
    height: 2rem;
    color: var(--d-purple-1);
  }
  div {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 2em;
  }
  input {
    flex: 1;
    background-color: var(--grey-1);
    padding: 0.3em 0.5em;
    font-size: 1rem;
    border-radius: 7px;
    outline: none;
  }
  label {
    width: 4.5rem;
  }

  div.gender {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    label:not(:first-child) {
      width: 3em;
      display: flex;
      align-items: center;
    }
  }
  button {
    font-size: var(--f-mi);
    padding: 0.4em 2em;
    border-radius: 7px;
    color: var(--grey-4);
    letter-spacing: 1.5px;
    background-color: var(--grey-2);
    &:hover,
    &:active {
      color: var(--grey-1);
      background-color: var(--d-purple-1);
    }
  }

  @media screen and (max-width: 500px) {
    gap: 1em;
    padding: 0 0em;
    div {
      width: 100%;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 0.5em;

      input {
        width: 100%;
      }
    }
    button {
      margin: 1em 0;
    }
  }
}
</style>
