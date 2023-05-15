<template>
  <section>
    <transition>
      <div v-show="show">
        <h1>請用手機掃描Qr code 付款</h1>
        <QrcodeVue :value="url" :size="200" level="H" />
        <button type="button" @click="closePopup">關閉</button>
      </div>
    </transition>
  </section>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import { ref, watch } from "vue";
export default {
  props: ["url"],
  components: { QrcodeVue },
  setup(props, context) {
    const show = ref(false);

    function closePopup() {
      show.value = false;
      setTimeout(() => {
        context.emit("close-popup");
      }, 250);
    }
    watch(
      () => props.url,
      () => {
        if (props.url) {
          show.value = true;
        }
      }
    );

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
div {
  width: 100%;
  max-width: 400px;
  min-width: 250px;
  height: 80%;
  max-height: 400px;
  background-color: var(--grey-1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2em;
  padding: 2em;
  letter-spacing: 1px;

  h1 {
    color: var(--grey-4);
    font-size: var(--f-l);
  }
  button {
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
