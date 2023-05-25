<template>
  <transition>
    <div class="addMsg" v-if="show">
      <p>購物車+1</p>
    </div>
  </transition>
</template>

<script>
import { useStore } from "vuex";
import { watch, ref } from "vue";
export default {
  setup() {
    const store = useStore();

    const show = ref(false);

    watch(
      () => store.getters["order/cartLength"],
      (newValue, oldValue) => {
        if (newValue > oldValue) {
          show.value = true;
        } else if (newValue < oldValue) {
          show.value = false;
        }
      }
    );

    watch(
      () => show.value,
      () => {
        if (show.value) {
          setTimeout(() => {
            show.value = false;
          }, 500);
        }
      }
    );

    return {
      show,
    };
  },
};
</script>

<style scoped lang="scss">
.addMsg {
  position: fixed;
  top: 10%;
  right: 5%;
  z-index: 2;
  background-color: var(--l-orange-1);
  font-size: 17px;
  color: var(--grey-4);
  border-radius: 5px;
  padding: 0.25em 0.7em;
}
.v-enter-from {
  opacity: 0.2;
  right: -100%;
}

.v-leave-to {
  opacity: 0.2;
  right: 20%;
}
.v-enter-active {
  transition: all 0.3s ease-in;
}
.v-leave-active {
  transition: all 0.4s ease-out;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  right: 5%;
}
</style>
