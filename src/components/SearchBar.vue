<template>
  <label class="filter" for="filter">
    <input
      v-model="synValue"
      class="filter__input"
      type="search"
      placeholder="全文搜尋"
    />
  </label>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    value: {
      type: String,
    },
  },

  computed: {
    synValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
        this.$emit('change', val);
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
