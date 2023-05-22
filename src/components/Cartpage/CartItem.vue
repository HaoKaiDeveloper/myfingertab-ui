<template>
  <div class="item">
    <div class="avatar">
      <img :src="item.avatar" alt="img" v-if="item.avatar" />
      <span v-else>
        <v-icon icon="mdi-account" />
      </span>
    </div>
    <div class="info">
      <h1>{{ item.sheetName }}</h1>
      <p>創作者 {{ item.creatorname }}</p>
      <p>售價 {{ item.saleprice }}</p>
      <button type="button" @click="removeItem(item.sheetid)">取消</button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  props: ["item"],
  setup() {
    const store = useStore();

    function removeItem(sheetid) {
      store.commit("order/removeCartItem", sheetid);
    }
    return {
      removeItem,
    };
  },
};
</script>

<style scoped lang="scss">
.item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1em;
  border-bottom: 1px solid var(--grey-3);
  padding-bottom: 0.7em;
  margin-bottom: 1.5em;
  font-size: var(--f-mi);
  @media screen and (max-width: 350px) {
    gap: 0.5em;
  }

  .avatar {
    width: 100px;
    height: 100px;
    background-color: var(--grey-2);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    overflow: hidden;
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
    span {
      font-size: 1.5rem;
      color: var(--grey-4);
    }
  }

  .info {
    flex: 1;
    h1 {
      font-size: var(--f-s);
    }
    button {
      float: right;
      white-space: nowrap;
      border-bottom: 1px solid var(--grey-3);
      letter-spacing: 2px;

      &:hover,
      &:active {
        font-weight: 600;
        color: var(--d-purple-1);
        border-bottom: 1px solid var(--d-purple-1);
      }
    }
  }
}
</style>
