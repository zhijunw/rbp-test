<template>
  <report />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Provide } from 'vue-property-decorator'

@Component({
  name: 'router-130001',
  components: {
    report: () => import('../report-components/report-index.vue')
  }
})
export default class App extends Vue {
@Provide('reportId') reportId = 130001
}
</script>

<style scoped>

</style>
