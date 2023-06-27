import { createStore } from "vuex";
import { authFetch, basicFetch } from "../api/api";
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
      const res = await basicFetch.get("/Info/carousel");
      const { data } = res;
      return data;
    },

    async getAllNews() {
      const res = await basicFetch.get("/Info/news");
      const { data } = res;
      return data;
    },
    async getAllMusic(context, payload) {
      const { pageSize, kind, page } = payload;

      let url = `/Info/sheets?kind=${kind}&page=${page}&pageSize=${pageSize}`;
      const res = await basicFetch.get(url);
      console.log(res);
      const { data } = res;
      return data;
    },
    async searchMusicSheet(context, payload) {
      const { keyword } = payload;
      try {
        const res = await basicFetch.get(
          `/Info/sheets/search?keyword=${keyword}`
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
      const res = await basicFetch.get(`/Info/sheets/${sheetid}`);
      const { data } = res;
      return data;
    },
    async downloadSheet(context, payload) {
      const { sheetId, mbrID, token } = payload;
      try {
        const res = await authFetch.get(
          `/Order/pdf?mbrId=${mbrID}&sheetid=${sheetId}`,
          {
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
        const res = await basicFetch.get("/Info/about");
        if (res.status === 200) {
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
