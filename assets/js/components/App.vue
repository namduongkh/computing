<template>
  <div class="container">
    <Fetcher @onFetch="fetch" :rssDates="rssDates" />
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
          >Go With</a
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
          >Feed</a
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
  </div>
</template>

<script>
import NumberFetcher from "../services/number_fetcher";
import NumberChecker from "../services/number_checker";
import PairTable from "./PairTable.vue";
import Fetcher from "./Fetcher.vue";
import Feed from "./Feed.vue";
import GoWithPairTable from "./GoWithPairTable.vue";

export default {
  name: "App",
  data() {
    return {
      fetcher: null,
      checker: null,
      feedNumber: {},
      rssDates: [],
    };
  },
  computed: {
    numberResult() {
      return (this.checker && this.checker.result) || {};
    },
    topNumbers() {
      return (this.checker && this.checker.top10ResultNumber()) || [];
    },
    feedNumberArray() {
      return Object.entries(this.feedNumber);
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
    async fetch(data) {
      this.fetcher = NumberFetcher.getInstance(data.rss, data.selectedDate);
      await this.fetcher.perform();

      this.feedNumber = this.fetcher.number;
      this.rssDates = this.fetcher.allDates();

      this.checker = new NumberChecker(this.fetcher.number);
      this.checker.perform();
    },
  },
};
</script>

<style>
</style>
