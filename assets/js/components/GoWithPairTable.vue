<template>
  <div>
    <input
      type="text"
      class="form-control"
      v-model="numberFilter"
      placeholder="Filter"
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
export default {
  name: "GoWithPairTable",
  props: {
    numbers: {
      type: Array,
      default: () => [],
    },
    filterNumber: {
      type: String,
    },
  },
  data() {
    return {
      numberFilter: this.filterNumber,
    };
  },
  computed: {
    filteredNumber() {
      if (!this.numberFilter) return this.numbers;
      return this.numbers.filter((i) => i[0].indexOf(this.numberFilter) != -1);
    },
  },
  filters: {
    displayNumber(num, numberFilter = "") {
      if (!numberFilter) return num;
      return num.replace(
        new RegExp(`(.*)(${numberFilter})(.*)`, "gi"),
        "$1<b>$2</b>$3"
      );
    },
    displayWithNumber(num) {
      let match = num.match(/\[(\d)\](\d{2})/);
      let withNumber = match[1];

      return withNumber;
    },
  },
};
</script>

<style>
</style>
