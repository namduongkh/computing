<template>
  <div class="container">
    <Fetcher @onFetch="fetch" @onCheck="onCheck" />
    <PairTable :numbers="numberResult" :topNumbers="topNumbers" />

    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="pills-gowith-pair-table-tab"
          data-toggle="pill"
          href="#pills-gowith-pair-table"
          role="tab"
          aria-controls="pills-gowith-pair-table"
          aria-selected="true"
          >Gợi ý</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="pills-feed-tab"
          data-toggle="pill"
          href="#pills-feed"
          role="tab"
          aria-controls="pills-feed"
          aria-selected="false"
          >KQXS</a
        >
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="pills-gowith-pair-table"
        role="tabpanel"
        aria-labelledby="pills-gowith-pair-table-tab"
      >
        <GoWithPairTable :numbers="rangeResultToPairs" />
      </div>
      <div
        class="tab-pane fade"
        id="pills-feed"
        role="tabpanel"
        aria-labelledby="pills-feed-tab"
      >
        <Feed :feed="feedNumberArray" />
      </div>
    </div>

    <div class="loading-wrapper">
      <div class="content">
        <div class="lds-dual-ring"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Separation from "../services/algorithms/separation";
import Pair from "../services/algorithms/pair";
import PairTable from "./PairTable.vue";
import Fetcher from "./Fetcher.vue";
import Feed from "./Feed.vue";
import GoWithPairTable from "./GoWithPairTable.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {
      fetcher: null,
      checker: null,
      feedNumber: {},
    };
  },
  computed: {
    ...mapGetters([
      "feed",
      "selectedProvince",
      "selectedFeed",
      "numberFilteredByDate",
    ]),
    numberResult() {
      return (this.checker && this.checker.result) || {};
    },
    topNumbers() {
      return (this.checker && this.checker.top10ResultNumber()) || [];
    },
    feedNumberArray() {
      return Object.entries(this.selectedFeed);
    },
    rangeResultToPairs() {
      return (this.checker && this.checker.rangeResultToPairs()) || [];
    },
  },
  components: {
    PairTable,
    Fetcher,
    Feed,
    GoWithPairTable,
  },
  methods: {
    ...mapActions(["selectProvince", "selectDate"]),
    fetch(data) {
      this.selectProvince(data.rss);
    },
    async onCheck(data) {
      this.selectDate(data.selectedDate);
      this.checker = new {
        pair: Pair,
        separation: Separation,
      }[data.selectedAlgorithm](this.numberFilteredByDate);

      this.checker.perform();
    },
  },
};
</script>

<style>
</style>
