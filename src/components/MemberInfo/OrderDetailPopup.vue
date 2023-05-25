<template>
  <section>
    <transition>
      <div class="order_detail" v-if="show">
        <p>
          訂購日期: <span>{{ order.orderDate }}</span>
        </p>
        <p>
          訂購編號: <span>{{ order.transNo }}</span>
        </p>
        <p>購買明細:</p>
        <div
          v-for="sheet in order.sheets"
          :key="sheet.sheetId"
          class="order_sheet"
        >
          <p>
            名稱: <span>{{ sheet.sheetName }}</span>
          </p>
          <p>
            售價: <span>{{ sheet.salePrice }}</span>
          </p>
        </div>
        <p>
          訂單金額: <span>{{ order.amount }}</span>
        </p>
        <p>
          訂單狀態: <span>{{ order.status }}</span>
        </p>
        <button type="button" @click="closePopup">關閉</button>
      </div>
    </transition>
  </section>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["order", "transNo"],
  setup(props, context) {
    const show = ref(false);

    setTimeout(() => {
      show.value = true;
    }, 0);

    function closePopup() {
      show.value = false;
      setTimeout(() => {
        context.emit("close-popup");
      }, 250);
    }

    return { closePopup, show };
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
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}
.order_detail {
  width: 100%;
  max-width: 400px;
  min-width: 250px;
  height: 80%;
  max-height: 400px;
  background-color: var(--grey-1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2em;
  letter-spacing: 1px;
  overflow-y: auto;
  p {
    font-size: var(--f-mi);
  }
  .order_sheet {
    margin-left: 1em;
  }
  button {
    align-self: center;
    background-color: var(--grey-2);
    font-size: var(--f-mi);
    padding: 0.3em 0.7em;
    border-radius: 15px;
    font-weight: 600;
    &:hover,
    &:active {
      background-color: var(--d-purple-1);
      color: var(--grey-1);
    }
    &:active {
      transform: translate(2px, 1px);
    }
  }
}

.v-enter-from,
.v-leave-to {
  opacity: 0.5;
  transform: translateY(50px);
}

.v-enter-active {
  transition: all 0.25s ease-in;
}

.v-leave-active {
  transition: all 0.25s ease-out;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateY(-20px);
}
</style>
