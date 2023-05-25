import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {};
  },
  getters: {},
  mutations: {},
  actions: {
    async getAllCreator() {
      const res = await axios.get(
        "https://s.intella.co/myfingertab/api/Info/creators"
      );
      console.log(res);
      const { data } = res;
      return data;
    },
    async getSingleCreator(context, payload) {
      const { id } = payload;
      const res = await axios.get(
        `https://s.intella.co/myfingertab/api/Info/creators/${id}`
      );
      const { data } = res;
      console.log(data);
      return data;
    },
    async getSingleCreatorAllMusic(context, payload) {
      const { id } = payload;
      const res = await axios.get(
        `https://s.intella.co/myfingertab/api/Info/sheets/creator?creatorAccount=${id}`
      );

      // console.log(res);
      const { data } = res;
      return data;
    },
  },
};
