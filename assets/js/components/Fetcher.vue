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
          <input type="checkbox" v-model="selectedDate[o]" />
          {{ o }}
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
  phu_yen: "https://xskt.com.vn/rss-feed/phu-yen-xspy.rss",
  dak_lak: "https://xskt.com.vn/rss-feed/dac-lac-xsdlk.rss",
  khanh_hoa: "https://xskt.com.vn/rss-feed/khanh-hoa-xskh.rss",
  binh_dinh: "https://xskt.com.vn/rss-feed/binh-dinh-xsbdi.rss",
  quang_binh: "https://xskt.com.vn/rss-feed/quang-binh-xsqb.rss",
  gia_lai: "https://xskt.com.vn/rss-feed/gia-lai-xsgl.rss",
  quang_ngai: "https://xskt.com.vn/rss-feed/quang-ngai-xsqng.rss",
  mien_trung: "https://xskt.com.vn/rss-feed/mien-trung-xsmt.rss",
  mien_bac: "https://xskt.com.vn/rss-feed/mien-bac-xsmb.rss",
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
      selectedAlgorithm: "pair",
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
