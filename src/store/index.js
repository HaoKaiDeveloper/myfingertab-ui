import { createStore } from "vuex";
import axios from "axios";
import creatorModule from "./creator.js";
import memberModule from "./member.js";
import orderModule from "./order.js";

const store = createStore({
  modules: {
    creator: creatorModule,
    member: memberModule,
    order: orderModule,
  },
  state() {
    return {};
  },
  mutations: {},
  getters: {},
  actions: {
    async getCarouselImgs() {
      const res = await axios.get(
        "https://s.intella.co/myfingertab/api/Info/carousel"
      );
      const { data } = res;
      return data;
    },

    async getAllNews() {
      const res = await axios.get(
        "https://s.intella.co/myfingertab/api/Info/news"
      );
      const { data } = res;
      return data;
    },
    async getAllMusic(context, payload) {
      const { pageSize, kind, page } = payload;

      let url = `https://s.intella.co/myfingertab/api/Info/sheets?kind=${kind}&page=${page}&pageSize=${pageSize}`;
      const res = await axios.get(url);
      console.log(res);
      const { data } = res;
      return data;
    },
    async searchMusicSheet(context, payload) {
      const { keyword } = payload;
      try {
        const res = await axios.get(
          `https://s.intella.co/myfingertab/api/Info/sheets/search?keyword=${keyword}`
        );
        if (res.status === 200) {
          return res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getSingleMusicSheet(context, payload) {
      const { sheetid } = payload;
      let url = `https://s.intella.co/myfingertab/api/Info/sheets/${sheetid}`;
      const res = await axios.get(url);

      console.log(res);

      const { data } = res;
      return data;
    },
    async downloadSheet(context, payload) {
      const { sheetId, mbrID, token } = payload;
      try {
        const res = await axios.get(
          `https://s.intella.co/myfingertab/api/Order/pdf?mbrId=${mbrID}&sheetId=${sheetId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200 && res.data.length) {
          return res.data;
        } else {
          throw new Error();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getAboutInfo(context, payload) {
      try {
        const res = await axios.get(
          "https://s.intella.co/myfingertab/api/Info/about"
        );
        if (res.status === 200) {
          return res.data;
        } else {
          throw new Error();
        }
      } catch (err) {}
    },
  },
});

export default store;
