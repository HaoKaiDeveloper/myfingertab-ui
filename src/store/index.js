import { createStore } from "vuex";
import axios from "axios";
import db from "../../db.js";
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
      const { pageSize, kind, page, keywords } = payload;

      let url = `https://s.intella.co/myfingertab/api/Info/sheets?kind=${kind}&page=${page}&pageSize=${pageSize}`;

      if (keywords) {
        url = url + `&keywords=${keywords}`;
      }

      const res = await axios.get(url);
      const { data } = res;
      return data;
    },
    async getSingleMusicSheet(context, payload) {
      const { sheetid, userid } = payload;
      let url = `https://s.intella.co/myfingertab/api/Info/sheets/${sheetid}`;
      const res = await axios.get(url);

      console.log(res);

      const { data } = res;
      return data;
    },
    async downloadSheet(context, payload) {
      const { sheetid, mbrID, token } = payload;
      try {
        const res = await axios.get(
          `https://s.intella.co/myfingertab/api/Order/pdf?mbrId=${mbrID}&sheetId=0001`,
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
  },
});

export default store;