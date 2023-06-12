import axios from "axios";

const loaclMemberData = localStorage.getItem("member")
  ? JSON.parse(localStorage.getItem("member"))
  : {
      mbrID: "",
      token: "",
    };

export default {
  namespaced: true,
  state() {
    return {
      member: loaclMemberData,
      memberName: "",
      wishList: [],
      reloginState: false,
    };
  },
  getters: {
    menubarAuthInfo(state) {
      return state.member;
    },
    wishList(state) {
      return state.wishList;
    },
    memberName(state) {
      return state.memberName;
    },
  },
  mutations: {
    setMemberAuthInfo(state, payload) {
      state.member = payload;
    },
    logout(state) {
      state.member = {
        mbrID: "",
        token: "",
      };
      state.wishList = [];
      state.reloginState = false;
      state.memberName = "";
      localStorage.removeItem("member");
    },
    setMemberName(state, payload) {
      state.memberName = payload;
    },
  },
  actions: {
    async memberRegister(context, payload) {
      try {
        const res = await axios.post(
          "https://s.intella.co/myfingertab/api/Member/register",
          payload
        );
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async memberLogin(context, payload) {
      try {
        const res = await axios.post(
          "https://s.intella.co/myfingertab/api/Member/login",
          payload
        );
        const { data } = res;
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    async memberActivate(context, payload) {
      try {
        const res = await axios.get(
          `https://s.intella.co/myfingertab/api/Member/activate?token=${payload}`
        );
      } catch (err) {
        console.log(err);
      }
    },
    async checkEmailExist(context, payload) {
      try {
        const res = await axios.post(
          `https://s.intella.co/myfingertab/api/Member/forgotpassword`,
          { email: payload }
        );
        const { data } = res;
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    async resetPassword(context, payload) {
      try {
        console.log(payload);
        const res = await axios.post(
          `https://s.intella.co/myfingertab/api/Member/resetpassword?token=${payload.token}`,
          payload
        );
        const { data } = res;
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    async getMemberInfo(context, payload) {
      const { mbrID, token } = payload;
      try {
        const res = await axios.get(
          `https://s.intella.co/myfingertab/api/Member/attributes/${mbrID}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { data } = res;
        if (data.error) {
          return;
        }

        return data;
      } catch (err) {
        console.log(err);
      }
    },
    async authCheck(context, payload) {
      try {
        const res = await axios.get(
          `https://s.intella.co/myfingertab/api/Member/getUserbytoken?token=${payload}`
        );
        if (Object.keys(res.data).length > 0) {
          return res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async setMemberInfo(context, payload) {
      const { mbrID, token, info } = payload;
      try {
        const res = await axios.put(
          `https://s.intella.co/myfingertab/api/Member/attributes/${mbrID}`,
          info,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = res;
        if (data.error) {
          return;
        }
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    async getWishList(context, payload) {
      let mbAuth = localStorage.getItem("member");
      if (!mbAuth) {
        return;
      }
      mbAuth = JSON.parse(mbAuth);
      const { mbrID, token } = mbAuth;
      try {
        const res = await axios.get(
          `https://s.intella.co/myfingertab/api/WishList/${mbrID}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200 && res.data.SheetInfo) {
          context.state.wishList = res.data.SheetInfo;
          return res.data.SheetInfo;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async toggleFollowStatus(context, payload) {
      const { mbrID, token, sheets } = payload;
      try {
        const res = await axios.post(
          `https://s.intella.co/myfingertab/api/WishList/${mbrID}`,
          sheets,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200 && res.data.SheetInfo) {
          context.state.wishList = res.data.SheetInfo;
          return res.data.SheetInfo;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
