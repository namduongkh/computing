<template>
  <div>
    <table class="table table-bordered table-sm">
      <thead>
        <tr>
          <th>Number</th>
          <th>With number</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in numbers" :key="'tr' + n">
          <td>{{ n[0] | displayNumber }}</td>
          <td>{{ n[0] | displayWithNumber }}</td>
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
  },
  data() {
    return {};
  },
  filters: {
    displayNumber(num) {
      let match = num.match(/\[(\d)\](\d{2})/);
      let number = match[2];

      return number;
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
