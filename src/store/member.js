import { basicFetch, authFetch } from "../api/api";

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
      tokenExpired: false,
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
    tokenExpired(state) {
      return state.tokenExpired;
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
      state.memberName = "";
      state.tokenExpired = false;
      localStorage.removeItem("member");
    },
    setMemberName(state, payload) {
      state.memberName = payload;
    },
    setTokenExpired(state, payload) {
      state.tokenExpired = payload;
    },
  },
  actions: {
    async memberRegister(context, payload) {
      try {
        const res = await basicFetch.post("/Member/register", payload);
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async memberLogin(context, payload) {
      try {
        const res = await basicFetch.post("/Member/login", payload);
        const { data } = res;
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    async memberActivate(context, payload) {
      try {
        const res = await basicFetch.get(`/Member/activate?token=${payload}`);
      } catch (err) {
        console.log(err);
      }
    },
    async checkEmailExist(context, payload) {
      try {
        const res = await basicFetch.post(`/Member/forgotpassword`, {
          email: payload,
        });
        const { data } = res;
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    async resetPassword(context, payload) {
      try {
        console.log(payload);
        const res = await basicFetch.post(
          `/Member/resetpassword?token=${payload.token}`,
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
        const res = await authFetch.get(`/Member/attributes/${mbrID}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = res;
        if (data.error) {
          return;
        }

        return data;
      } catch (err) {
        console.log(err);
      }
    },
    async googleAuthCheck(context, payload) {
      console.log("googleCheck", payload);
      try {
        const res = await basicFetch.get(
          `/Member/getUserbytoken?token=${payload}`
        );
        console.log(res);
        if (Object.keys(res.data).length > 0) {
          return res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async facebookAuthCheck(context, payload) {
      console.log("facebookChack", payload);
      try {
        const res = await basicFetch.get(
          `/Member/getFaceBookUserbytoken?token=${payload}`
        );
        console.log(res);
        if (Object.keys(res.data).length > 0) {
          return res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async setMemberInfo(context, payload) {
      const { mbrID, token, info } = payload;
      console.log(info);
      try {
        const res = await authFetch.put(`/Member/attributes/${mbrID}`, info, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = res;
        console.log(res);
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
        const res = await authFetch.get(`/WishList/${mbrID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
        const res = await authFetch.post(`/WishList/${mbrID}`, sheets, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
