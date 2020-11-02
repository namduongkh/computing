<template>
  <div>
    <div>
      <strong>Top 10:</strong>
      <span
        class="badge badge-pill badge-success"
        v-for="n in topNumbers"
        :key="'top' + n"
        >{{ n }}</span
      >
    </div>
    <table class="table table-bordered table-sm table-striped">
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
            :class="{ 'text-success': topNumbers.includes(`${n}${nSub}`) }"
            v-for="nSub in nums"
            :key="'td' + nSub"
          >
            {{ numbers[`${n}${nSub}`] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
    };
  },
};
</script>

<style>
</style>
