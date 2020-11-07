<template>
  <div class="feed">
    <ul>
      <li v-for="(f, i) in feed" :key="'feed' + i">
        <h6>
          <a :href="f[0]" target="_blank">{{ f[0] }}</a>
        </h6>
        <blockquote
          v-html="$options.filters.displayFeed(f[1].join(', '), filterNumber)"
        ></blockquote>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Feed",
  props: {
    feed: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(["filterNumber"]),
  },
  filters: {
    displayFeed(numStr, filterNumber) {
      return numStr.replace(
        new RegExp(`(${filterNumber})`, "gi"),
        "<span class='selected'>$1</span>"
      );
    },
  },
};
</script>

<style>
.feed .selected {
  background: yellow;
  font-weight: 700;
}
</style>
