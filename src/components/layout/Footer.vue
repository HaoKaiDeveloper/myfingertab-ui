<template>
  <section id="footer">
    <router-link to="/">
      <img :src="logoIcon" alt="logo" class="logo" />
    </router-link>

    <div class="about">
      <h3>關於</h3>
      <li v-for="item in aboutItems" :key="item.text">
        <router-link :to="`/about/${item.routeParam}`">
          {{ item.text }}
        </router-link>
      </li>
    </div>

    <div class="contact">
      <h3>聯絡方式</h3>
      <p><v-icon icon="mdi-email" /> ifinger2023@gmail.com</p>
      <p><v-icon icon="mdi-phone" /> 0934-063-074</p>
    </div>

    <div class="follow">
      <h3>追蹤我們</h3>
      <a href="https://www.facebook.com/">
        <v-icon icon="mdi-facebook" />
      </a>
      <a href="https://www.facebook.com/">
        <v-icon icon="mdi-instagram" />
      </a>
      <a href="https://www.facebook.com/">
        <v-icon icon="mdi-youtube" />
      </a>
      <a href="https://www.facebook.com/">
        <img :src="lineIcon" alt="line" />
      </a>
    </div>

    <div class="partner">
      <h3>合作夥伴</h3>
      <img :src="partner1" alt="partner" />
      <img :src="partner2" alt="partner" />
    </div>

    <div class="defray">
      <h3>付款方式</h3>
      <img v-for="(icon, i) in payicons" :key="i" :src="icon" alt="pay" />
    </div>

    <p class="coptright">&copy; 愛指彈 All Copyright</p>
  </section>
</template>

<script>
import logoIcon from "../../assets/imgs/logo-w.png";
import lineIcon from "../../assets/imgs/lineIcon.png";
import partner1 from "../../assets/imgs/partenr-01.png";
import partner2 from "../../assets/imgs/partenr-02.png";
import pay01 from "../../assets/imgs/pay-01.png";
import pay02 from "../../assets/imgs/pay-02.png";
import pay03 from "../../assets/imgs/pay-03.png";
import pay04 from "../../assets/imgs/pay-04.png";
import pay05 from "../../assets/imgs/pay-05.png";
import pay06 from "../../assets/imgs/pay-06.png";
import pay07 from "../../assets/imgs/pay-07.png";
import pay08 from "../../assets/imgs/pay-08.png";
import pay09 from "../../assets/imgs/pay-09.png";
import pay10 from "../../assets/imgs/pay-10.png";
import pay11 from "../../assets/imgs/pay-11.png";
import pay12 from "../../assets/imgs/pay-12.png";
import pay13 from "../../assets/imgs/pay-13.png";

export default {
  setup() {
    const aboutItems = [
      { text: "關於我們", routeParam: "about" },
      { text: "會員條款", routeParam: "membership" },
      { text: "買譜說明", routeParam: "buying" },
      { text: "隱私權政策", routeParam: "privacyPolicy" },
      { text: "法律資訊", routeParam: "legal" },
      { text: "Q&A", routeParam: "QA" },
    ];
    const payicons = {
      pay01,
      pay02,
      pay03,
      pay04,
      pay05,
      pay06,
      pay07,
      pay08,
      pay09,
      pay10,
      pay11,
      pay12,
      pay13,
    };

    return {
      logoIcon,
      lineIcon,
      partner1,
      partner2,
      payicons,
      aboutItems,
    };
  },
};
</script>

<style scoped lang="scss">
#footer {
  padding: 1rem;
  border-top: 1px solid var(--grey-5);
  margin-top: 2em;
  background-color: rgb(50, 48, 47);
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1em;
}

h3 {
  display: block;
  font-size: var(--f-l);
}

.logo {
  width: 180px;
  object-fit: cover;
}

a,
p {
  color: #fff;
  font-size: var(--f-mi);
}

.about {
  a {
    display: block;
  }
}

.follow {
  a:not(:last-child) {
    font-size: var(--f-l);
    margin: 0 0.4em;
  }
  img {
    margin-bottom: -7px;
    width: 30px;
    object-fit: cover;
  }
}
.partner {
  img {
    width: 80px;
    margin: 0 0.5em;
    background: #fff;
  }
}

.defray {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;

  h3 {
    width: 100%;
  }
  img {
    width: 80px;
  }
}

@media screen and (max-width: 650px) {
  #footer {
    justify-content: flex-start;
  }
}
@media screen and (max-width: 400px) {
  div {
    width: 100%;
  }
}
</style>
