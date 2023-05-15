<template>
  <section>
    <p class="title">
      創作者 <span>{{ creators.length }}</span
      >位
    </p>
    <div class="creator_cards">
      <CreatorCard
        v-for="creator in creators"
        :key="creator.id"
        :creator="creator"
      />
    </div>
  </section>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import { CreatorCard } from "../../components/Creatorpage/index.js";
export default {
  components: { CreatorCard },
  setup() {
    const store = useStore();
    const creators = ref([]);
    init();
    async function init() {
      const allCreator = await store.dispatch("creator/getAllCreator");
      creators.value = allCreator;
    }

    return {
      creators,
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  padding: 0 5em;
  min-height: 95vh;
  margin: 0 auto;
  color: var(--grey-4);
  position: relative;

  @media screen and (max-width: 1000px) {
    padding: 0 1em;
  }
}
.title {
  align-self: flex-start;
  font-size: var(--f-l);
  margin-bottom: 0.5em;
  margin-left: 1.5rem;
  @media screen and (max-width: 600px) {
    margin-left: 0rem;
  }
}

.creator {
  &_cards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3em;

    @media screen and (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1em;
    }
    @media screen and (max-width: 550px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
