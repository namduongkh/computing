<template>
  <div>
    <input
      type="text"
      class="form-control"
      v-model="numberFilter"
      placeholder="Filter"
      @change="changeNumberFilter"
    />
    <table class="table table-bordered table-sm">
      <thead>
        <tr>
          <th>Number</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in filteredNumber" :key="'tr' + n">
          <td v-html="$options.filters.displayNumber(n[0], numberFilter)"></td>
          <td>{{ n[1] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "GoWithPairTable",
  props: {
    numbers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      numberFilter: this.filterNumber,
    };
  },
  computed: {
    ...mapGetters(["filterNumber"]),
    filteredNumber() {
      if (!this.numberFilter) return this.numbers;
      return this.numbers.filter(
        (i) => i[0].replace(/(\[|\])/gi, "").indexOf(this.numberFilter) != -1
      );
    },
  },
  filters: {
    displayNumber(num, numberFilter = "") {
      // if (!numberFilter) {
      return num.replace(/\[(\d+)\]/gi, "<u>$1</u>");
      // }

      // return num
      //   .replace(/(\[|\])/gi, "")
      //   .replace(new RegExp(`(${numberFilter})`, "gi"), "<b>$1</b>");
    },
    displayWithNumber(num) {
      let match = num.match(/\[(\d)\](\d{2})/);
      let withNumber = match[1];

      return withNumber;
    },
  },
  methods: {
    ...mapActions(["selectFilterNumber"]),
    changeNumberFilter() {
      this.selectFilterNumber(this.numberFilter);
    },
  },
  watch: {
    filterNumber(val) {
      this.numberFilter = val;
    },
  },
};
</script>

<style>
</style>
