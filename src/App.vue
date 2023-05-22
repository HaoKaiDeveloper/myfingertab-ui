<template>
  <div class="layout">
    <Navbar />
    <SmallNavber />
    <router-view class="views"></router-view>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/layout/Navbar.vue";
import SmallNavber from "./components/layout/SmallNavbar.vue";
import Footer from "./components/layout/Footer.vue";
import {useStore} from 'vuex'
export default {
  name: "App",
  components: {
    Navbar,
    SmallNavber,
    Footer,
  },
  setup(){
    const store=useStore()
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300 & display 家庭 = Noto+Sans+TC:wght@300;400;500;700 & swap");
:root {
  --d-purple-1: #6200ea;
  --d-purple-2: #651fff;

  --l-orange-1: #ffd54f;

  --grey-1: #fafafa;
  --grey-2: #eeeeee;
  --grey-3: #9e9e9e;
  --grey-4: #424242;
  --grey-5: #212121;

  --f-xl: calc(1.4rem + 0.2vw);
  --f-l: calc(1.2rem + 0.2vw);
  --f-mi: 0.95rem;
  --f-s: 0.8rem;
  --f-xs: 0.5rem;

  --shodow-1: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: "Noto Sans TC", sans-serif;
  font-size: 62.5%;
  width: 100%;
}

.layout {
  width: 100%;
  padding: 1rem;
  @media screen and (max-width: 870px) {
    padding: 4rem 1rem 1rem 1em;
  }
  @media screen and (max-width: 500px) {
    padding: 4rem 0.2rem 1rem 0.2em;
    font-size: 80%;
  }
  .views {
    width: 100%;
    max-width: 2000px;
    min-height: 95vh;
  }
}

a {
  text-decoration: none;
}
li {
  list-style: none;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  margin: 80px 0 5px 0;
}

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 4px;
  border-radius: 4px;
  background: var(--grey-3);
}
</style>
