<template>
  <form class="basic_info" @submit.prevent="setMemberInfo">
    <div>
      <label>Email</label>
      <p>{{ basicInfo.email }}</p>
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
    <button type="submit">
      儲存會員資料 <v-icon icon="mdi-arrow-right" class="i" />
    </button>
  </form>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  props: ["authInfo", "basicInfo"],
  setup(props) {
    const store = useStore();

    const info = ref({
      name: "",
      tel: "",
      gender: "",
      addr: "",
      birth: "",
    });

    async function setMemberInfo() {
      try {
        await store.dispatch("member/setMemberInfo", {
          info: { ...info.value },
          ...props.authInfo,
        });
      } catch (err) {
        console.log(err);
      }
    }
    watch(
      () => props.basicInfo,
      () => {
        info.value = { ...info.value, ...props.basicInfo };
      }
    );

    return {
      info,
      setMemberInfo,
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
  gap: 1.5em;
  margin: 0 auto;
  padding: 0 0.7em;
  font-size: calc(0.9rem + 0.2vw);
  word-break: break-all;
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
    padding: 0.46em 2.7em;
    border-radius: 20px;
    color: var(--grey-4);
    border: 1px solid var(--d-purple-1);
    letter-spacing: 1.5px;
    &:hover,
    &:active {
      background-color: var(--d-purple-1);
      color: var(--grey-1);
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
      margin: 2em 0;
    }
  }
}
</style>
