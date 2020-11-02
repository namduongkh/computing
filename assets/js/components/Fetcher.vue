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
      <label for="">Number of avoid date</label>
      <input type="number" min="0" v-model="avoidDate" class="form-control" />
    </div>
    <div class="text-right">
      <button type="button" class="btn btn-primary" @click="onFetch()">
        Fetch & Check
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
  data() {
    return {
      RSS: Object.keys(RSS),
      rss: null,
      avoidDate: 0,
    };
  },
  methods: {
    onFetch() {
      this.$emit("onFetch", { rss: RSS[this.rss], avoidDate: this.avoidDate });
    },
  },
};
</script>

<style>
</style>
