<template>
  <div>
    <div>
      <strong>Top 10:</strong>
      <span
        class="badge badge-pill"
        v-for="n in computedTopNumbers"
        :key="'top' + n"
        :class="{
          'badge-primary': selectedNumber == n,
          'badge-success': selectedNumber !== n,
        }"
        @click="selectNumber(n)"
        >{{ n }}</span
      >
    </div>
    <table class="table table-bordered table-sm table-striped pair-table">
      <thead>
        <tr>
          <th></th>
          <th class="text-center" v-for="n in nums" :key="'th' + n">{{ n }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in nums" :key="'tr' + n">
          <th class="text-center">{{ n }}</th>
          <td
            class="text-center"
            :class="{
              'text-success': computedTopNumbers.includes(`${n}${nSub}`),
              selected: selectedNumber == `${n}${nSub}`,
            }"
            v-for="nSub in nums"
            :key="'td' + nSub"
            @click="selectNumber(`${n}${nSub}`)"
            :style="
              'font-size:' +
              $options.filters.numberFontSize(numbers[`${n}${nSub}`]) +
              'em'
            "
          >
            {{ numbers[`${n}${nSub}`] || 0 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PairTable",
  props: {
    numbers: {
      type: Object,
      default: () => {},
    },
    topNumbers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      nums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      selectedNumber: null,
    };
  },
  computed: {
    ...mapGetters(["selectedDate"]),
    computedTopNumbers() {
      if (!this.selectedDate || !this.selectedDate.length) return [];

      return this.topNumbers;
    },
  },
  filters: {
    numberFontSize(num) {
      if (!Number.isSafeInteger(num)) return 1;

      let size = num / 8;
      size = size < 0.3 ? 0.3 : size;
      size = size > 1 ? 1 : size;

      return size;
    },
  },
  methods: {
    ...mapActions(["selectFilterNumber"]),
    selectNumber(number) {
      if (number !== this.selectedNumber) {
        this.selectedNumber = number;
      } else {
        this.selectedNumber = null;
      }

      this.selectFilterNumber(this.selectedNumber);
    },
  },
};
</script>

<style>
.pair-table td.selected {
  background-color: #007bff;
  color: #fff !important;
}
.pair-table td {
  vertical-align: middle;
}
</style>
