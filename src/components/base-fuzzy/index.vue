<template>
  <el-select
    v-model="selectedVal"
    :disabled="disabled"
    clearable
    :loading="loading"
    filterable
    collapse-tags
    remote
    :multiple="fuzzyConfig.multiple"
    :remote-method="remoteMethod"
    style="width:100%"
    :placeholder="$t('form.placeholder.input',{msg: ''})"
    @focus="selectFocus"
    @change="handleChange">
    <el-option
      v-for="(item,index) in optionsData"
      :key="index"
      :label="item.label"
      :value="item.value" />
  </el-select>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { FuzzyConfig, Options, Response } from '@/typings'
import { transformFields } from '@/utils'
interface FuzzyOptions {
  label: string
  value: string | number
  [propName: string]: any
}
  @Component({
    name: 'fuzzy'
  })
export default class App extends Vue {
    @Prop({ default: false }) disabled

    @Prop({ required: true }) fuzzyConfig: FuzzyConfig

    @Prop() value

    @Watch('value', { immediate: true, deep: true })
    onValueChanged(val: string, oldVal: string) {
      this.selectedVal = val || ''
    }
    // data
    selectedVal = ''
    loading: boolean = true
    optionsData: any[] = []
    query: string = ''

    selectFocus() {
      this.getData(this.query || '')
    }
    // method
    async getData(query) { // 获取模糊搜索数据
      this.$emit('getFilterOptions', { query })
      console.log('query', query)
      const res: Response = await this._post({
        url: this.fuzzyConfig.apiUrl!,
        params: {
          keyWord: query
        }
      })

      if (res.code === 0) {
        this.loading = false
        this.optionsData = transformFields(res.data, { label: 'name', value: 'id' }, true)
      }
    }

    remoteMethod(query) { // 模糊搜索
      this.query = query.trim()
      if (this.query !== '') {
        const f = this._debounce(() => { this.getData(this.query) }, 500)
        f()
      }
    }

    handleChange(value) {
      // this.$set(this.fuzzyConfig, 'value', value)
      // const chooseObj = this.optionsData.find((item) => item.value === value)
      // 因为这里是多选 value 是数组 如果是单选也要转换数组 进行匹配
      // const valArr = Array.from()
      // if(!Array.isArray(value)) {

      // }
      const valueArr = Array.isArray(value) ? value : [value]
      const matchValArr = this.optionsData.filter((item) => valueArr.includes(item.value))
      //   这里只是做 模糊搜索 的话  直接更新数据
      this.$emit('update:value', value)
      this.$emit('fuzzyChange', { value, matchValArr })

      // this.selectedVal = ''
      // this.optionsData = []
    }
}

</script>

<style scoped lang="scss">
</style>
