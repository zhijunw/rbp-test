<template>
  <div>
    <keep-alive
      :include="cachedViews"
      :max="maxVue">
      <router-view
        :key="key" />
    </keep-alive>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
})
export default class extends Vue {
  private maxVue: number = 15
  get cachedViews() {
    return this.$store.state.tagsView.cachedViews
  }

  get key() {
    // return this.$route.path
    return this.$route.fullPath
  }
}
</script>
<style scoped>
</style>
