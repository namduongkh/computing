import NumberFetcher from "./number_fetcher";

export default {
  state: {
    selectedProvince: null,
    feed: {},
    selectedFeed: {},
    selectedDate: [],
    filterNumber: null
  },
  mutations: {
    addFeed(state, data) {
      let { province, number } = data;
      state.feed[province] = number;
      state.selectedFeed = number;
    },
    selectProvince(state, data) {
      state.selectedProvince = data;
    },
    selectDate(state, data) {
      state.selectedDate = data;
    },
    selectFilterNumber(state, number) {
      state.filterNumber = number;
    }
  },
  actions: {
    addFeed({ commit }, data) {
      commit('addFeed', data);
    },
    selectFilterNumber({ commit }, data) {
      commit('selectFilterNumber', data);
    },
    selectDate({ commit }, data) {
      commit('selectDate', data);
    },
    async selectProvince({ commit, state }, province) {
      commit('selectProvince', province);
      if (state.feed[province]) return;

      let fetcher = new NumberFetcher(province)
      let number = await fetcher.perform();

      commit('addFeed', {
        province,
        number
      });
    }
  },
  getters: {
    selectedProvince: state => state.selectedProvince,
    feed: state => state.feed,
    selectedFeed: state => state.selectedFeed,
    filterNumber: state => state.filterNumber,
    selectedDate: state => state.selectedDate,
    numberFilteredByDate: state => {
      let number = {};
      for (let i in state.selectedFeed) {
        if (state.selectedDate.indexOf(i) !== -1) {
          number[i] = state.selectedFeed[i];
        }
      }

      return number
    },
  }
}
