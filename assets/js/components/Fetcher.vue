<template>
  <div>
    <div class="form-group">
      <strong for="">Tỉnh:</strong>
      <select v-model="rss" class="form-control">
        <option v-for="o in RSS" :key="o" :value="o">
          {{ o }}
        </option>
      </select>
    </div>
    <div v-if="rssDates.length">
      <div class="form-group">
        <strong for="">Ngày gần nhất:</strong>
        <div v-for="o in rssDates" :key="o" :value="o">
          <input type="checkbox" v-model="selectedDate[o]" :id="o" />
          <label :for="o">{{ o }}</label>
        </div>
      </div>

      <div class="form-group">
        <strong for="">Thuật toán:</strong>
        <select
          v-model="selectedAlgorithm"
          class="form-control"
          @change="onCheck"
        >
          <option v-for="o in algorithms" :key="o[0]" :value="o[0]">
            {{ o[1] }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

const RSS = {
  "Phú Yên": "https://xskt.com.vn/rss-feed/phu-yen-xspy.rss",
  Daklak: "https://xskt.com.vn/rss-feed/dac-lac-xsdlk.rss",
  "Khánh Hoà": "https://xskt.com.vn/rss-feed/khanh-hoa-xskh.rss",
  "Bình Định": "https://xskt.com.vn/rss-feed/binh-dinh-xsbdi.rss",
  "Quảng Bình": "https://xskt.com.vn/rss-feed/quang-binh-xsqb.rss",
  "Gia Lai": "https://xskt.com.vn/rss-feed/gia-lai-xsgl.rss",
  "Quảng Ngãi": "https://xskt.com.vn/rss-feed/quang-ngai-xsqng.rss",
  "Miền Trung": "https://xskt.com.vn/rss-feed/mien-trung-xsmt.rss",
  "Miền Bắc": "https://xskt.com.vn/rss-feed/mien-bac-xsmb.rss",
};

export default {
  name: "Fetcher",
  data() {
    return {
      RSS: Object.keys(RSS),
      rss: null,
      selectedDate: {},
      algorithms: [
        ["pair", "Cặp đôi hoàn hảo"],
        ["separation", "Đôi ngã chia ly"],
      ],
      selectedAlgorithm: "separation",
    };
  },
  computed: {
    ...mapGetters(["selectedProvince", "selectedFeed"]),
    showFetchButton() {
      return this.rssDates.length > 0;
    },
    selectedDateArray() {
      return Object.entries(this.selectedDate)
        .filter((i) => i[1] == true)
        .map((i) => i[0]);
    },
    rssDates() {
      return Object.keys(this.selectedFeed || {});
    },
  },
  methods: {
    onFetch() {
      this.$emit("onFetch", {
        rss: RSS[this.rss],
      });
    },
    onCheck() {
      this.$emit("onCheck", {
        selectedDate: this.selectedDateArray,
        selectedAlgorithm: this.selectedAlgorithm,
      });
    },
  },
  watch: {
    rss(val) {
      this.selectedDate = {};
      this.onFetch();
    },
    selectedDateArray() {
      this.onCheck();
    },
  },
};
</script>

<style>
</style>
