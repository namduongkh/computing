<template>
  <div>
    <div class="form-group">
      <label for="">Province</label>
      <select v-model="rss" class="form-control">
        <option v-for="o in RSS" :key="o" :value="o">
          {{ o }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <div v-for="o in rssDates" :key="o" :value="o">
        <input type="checkbox" v-model="selectedDate[o]" />
        {{ o }}
      </div>
    </div>
    <div class="text-right">
      <button
        type="button"
        class="btn btn-primary"
        @click="onFetch()"
        v-if="showFetchButton"
      >
        Check
      </button>
    </div>
  </div>
</template>

<script>
const RSS = {
  phu_yen: "https://xskt.com.vn/rss-feed/phu-yen-xspy.rss",
  dak_lak: "https://xskt.com.vn/rss-feed/dac-lac-xsdlk.rss",
  khanh_hoa: "https://xskt.com.vn/rss-feed/khanh-hoa-xskh.rss",
  binh_dinh: "https://xskt.com.vn/rss-feed/binh-dinh-xsbdi.rss",
  quang_binh: "https://xskt.com.vn/rss-feed/quang-binh-xsqb.rss",
  gia_lai: "https://xskt.com.vn/rss-feed/gia-lai-xsgl.rss",
  quang_ngai: "https://xskt.com.vn/rss-feed/quang-ngai-xsqng.rss",
  mien_trung: "https://xskt.com.vn/rss-feed/mien-trung-xsmt.rss",
};

export default {
  name: "Fetcher",
  props: {
    rssDates: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      RSS: Object.keys(RSS),
      rss: null,
      selectedDate: {},
    };
  },
  computed: {
    showFetchButton() {
      return this.rssDates.length > 0;
    },
    selectedDateArray() {
      return Object.entries(this.selectedDate)
        .filter((i) => i[1] == true)
        .map((i) => i[0]);
    },
  },
  methods: {
    onFetch() {
      this.$emit("onFetch", {
        rss: RSS[this.rss],
        selectedDate: this.selectedDateArray,
      });
    },
  },
  watch: {
    rss(val) {
      this.selectedDate = {};
      this.onFetch();
    },
  },
};
</script>

<style>
</style>
