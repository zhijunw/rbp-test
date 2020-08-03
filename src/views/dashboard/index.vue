<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      hello: {{ username }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'dashboard',
  components: {
  }
})
export default class App extends Vue {
  get username() {
    return this.$store.getters.name
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
