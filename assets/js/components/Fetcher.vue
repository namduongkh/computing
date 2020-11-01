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
  quang_ngai: "https://xskt.com.vn/rss-feed/quang-ngai-xsqng.rss",
  khanh_hoa: "https://xskt.com.vn/rss-feed/khanh-hoa-xskh.rss",
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
