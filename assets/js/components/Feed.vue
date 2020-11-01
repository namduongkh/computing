<template>
  <div>
    <ul>
      <li v-for="(f, i) in feed" :key="'feed' + i">
        <h6>
          <a :href="f[0]" target="_blank">{{ f[0] }}</a>
        </h6>
        <blockquote>
          {{ f[1].join(", ") }}
        </blockquote>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Feed",
  props: {
    feed: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
</style>
