<template>
  <div class="customTheme-container">
    <el-row>
      <h4>主题名字：</h4>
      <el-input
        v-model="themeName"
        placeholder="请输入主题名字"
        clearable />
    </el-row>
    <el-row>
      <h4>上传element-UI主题文件</h4>
      <el-upload
        class="upload-demo"
        :action="uploadCssFile"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :on-remove="handleRemove"
        accept="css"
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button
          size="small"
          type="primary">
          点击上传
        </el-button>
        <div
          slot="tip"
          class="el-upload__tip">
          只能上传CSS文件
        </div>
      </el-upload>
    </el-row>
    <el-row v-if="config.btn">
      <h4>D01-主要按钮颜色</h4>
      <ul class="btnUl">
        <li
          v-for="(item, index) in config.btn"
          :key="'color' + index">
          <div>
            <el-button :id="item.id">
              {{ item.name }}
            </el-button>
          </div>
          <div
            v-for="(cssItem,i) in item.children"
            :key="i"
            class="colorDiv">
            <span>{{ cssItem.name }}</span>
            <el-color-picker
              size="small"
              :value="cssItem.cssList['background-color']"
              @change="colorChange($event, 'btn', index,i)" />
          </div>
        </li>
      </ul>
    </el-row>
    <el-row v-if="config.btn_g">
      <h4>D02-幽灵按钮颜色</h4>
      <ul class="btnUl">
        <li
          v-for="(item, index) in config.btn_g"
          :key="'color' + index">
          <div>
            <el-button
              :id="item.id">
              {{ item.name }}
            </el-button>
          </div>
          <div
            v-for="(cssItem,i) in item.children"
            :key="i"
            class="colorDiv">
            <span>{{ cssItem.name }}</span>
            <el-color-picker
              size="small"
              :value="cssItem.cssList['color']"
              @change="colorChange($event, 'btn_g', index,i)" />
          </div>
        </li>
      </ul>
    </el-row>
    <el-row v-if="config.btn_t">
      <h4>文本按钮颜色</h4>
      <ul class="btnUl">
        <li
          v-for="(item, index) in config.btn_t"
          :key="'color' + index">
          <div>
            <el-button
              :id="item.id"
              type="text">
              {{ item.name }}
            </el-button>
          </div>
          <div
            v-for="(cssItem,i) in item.children"
            :key="i"
            class="colorDiv">
            <span>{{ cssItem.name }}</span>
            <el-color-picker
              size="small"
              :value="cssItem.cssList['color']"
              @change="colorChange($event, 'btn_t', index,i)" />
          </div>
        </li>
      </ul>
    </el-row>
    <el-row v-if="config.leftTab">
      <h4>左侧导航栏修改</h4>
      <ul class="tabUl">
        <div
          v-for="(item,index) in config.leftTab"
          :key="'leftTab'+index"
          class="ulItem">
          <div class="f14">
            {{ item.name }}
          </div>
          <div
            v-for="(children,i) in item.children"
            :key="'children'+i">
            <span>{{ children.name }}</span>
            <el-color-picker
              size="small"
              :value="config.leftTab[index].children[i].cssList[children.name]"
              @change="leftTabChange($event,index,i,children.name)" />
          </div>
        </div>
      </ul>
    </el-row>
    <el-row>
      <el-button
        class="right"
        style="margin-left:10px;"
        size="small"
        @click="cancle">
        取消
      </el-button>
      <el-button
        class="right"
        size="small"
        type="primary"
        @click="submit">
        确认
      </el-button>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import themeConfig from './config'
import apiUrl from '@/api/customer-theme'

@Component({
  name: 'customTheme',
  components: {
  }
})
export default class customTheme extends Vue {
  config: any = themeConfig || []
  oldConfig = JSON.parse(JSON.stringify(themeConfig))
  paramObj: object = {}
  fileList: any = []
  elementurl:string = ''
  themeName:string = ''
  uploadCssFile: string = apiUrl.uploadCssFile || ''
  param = {
    custom: [],
    createBy: '',
    createDate: '',
    customJson: '',
    guid: '',
    elementurl: '',
    lastmodBy: '',
    lastmodDate: '',
    sort: null,
    status: 0,
    styleFileName: '',
    styleUrl: '',
    themeName: ''
  }
  cssContent:string = ''
  colorChange(val, type, index, i) {
    if (type === 'btn') {
      this.config[type][index].children[i].cssList['background-color'] = val
      this.config[type][index].children[i].cssList['border-color'] = val
    } else if (type === 'btn_g') {
      this.config[type][index].children[i].cssList['color'] = val
      this.config[type][index].children[i].cssList['border-color'] = val
    } else if (type === 'btn_t') {
      this.config[type][index].children[i].cssList['color'] = val
    }
    this.setStyleFn()
    this.config = Object.assign({}, this.config)
  }

  leftTabChange(val, index, i, name) {
    this.config.leftTab[index].children[i].cssList[name] = val + ' !important'
    this.setStyleFn()
  }

  changeToArr(obj) {
    const newList: any = []
    obj.map(item => {
      for (const key in item.cssList) {
        newList.push({
          key: key,
          value: item.cssList[key],
          idName: item.id,
          name: item.name
        })
      }
    })
    return newList
  }

  setStyleFn() {
    const cssObj = ''
    for (const key in this.config) {
      this.config[key].map(item => {
        if (!item.children) {
          return
        }
        item.children.map((i, index) => {
          const id = `#${i.id}`
          for (const key in i.cssList) {
            this.cssContent += `${id}{${key}: ${i.cssList[key]}}`
          }
        })
      })
    }
    const themeStyle = document.createElement('style')
    const themeObj = document.getElementsByClassName('themeStyle')
    if (themeObj.length > 0) {
      document.head.removeChild(themeObj[0])
    }
    themeStyle.setAttribute('class', 'themeStyle')
    themeStyle.innerHTML = this.cssContent
    document.head.appendChild(themeStyle)
  }

  changeToObj(arr) {
    const newObj: any = {}
    arr.map((item) => {
      newObj[item.key] = item.value
    })
    return newObj
  }
  changeDataFn(val) {
    const newObj: any = []
    for (const key in val) {
      const itemObj: any = {}
      itemObj.modleName = key
      itemObj.styleTypeList = []
      if (val[key].length > 0) {
        val[key].map((item) => {
          const styleChildrenList:any = []
          const cssList:any = []
          item.children.map(i => {
            if (i.id.indexOf(':') > 0) {
              styleChildrenList.push({
                childrenName: i.id.split(':')[1],
                cssList: this.changeToArr([i])
              })
            } else {
              cssList.push(i)
            }
          })
          itemObj.styleTypeList.push({
            idName: item.id,
            name: item.name,
            styleChildrenList: styleChildrenList,
            cssList: this.changeToArr(cssList)
          })
        })
      }
      newObj.push(itemObj)
    }
    return newObj
  }

  setChildrenList(obj) {
    const newList: any = []
    function pushData(item) {
      const cssList = {}
      const n = newList.findIndex((i) => i.name === item.name)
      cssList[item.key] = item.value ? item.value.split('!')[0] : item.value
      if (n >= 0) {
        newList[n].cssList = { ...newList[n].cssList, ...cssList }
      } else {
        newList.push({
          id: item.idName,
          name: item.name,
          cssList: cssList
        })
      }
    }
    obj.cssList.map(item => {
      pushData(item)
    })
    obj.styleChildrenList.map(item => {
      item.cssList.map(i => {
        pushData(i)
      })
    })
    return newList
  }

  changeResData(val) {
    const newObj: any = {}
    val.forEach((item) => {
      newObj[item.modleName] = []
      item.styleTypeList.forEach((i) => {
        console.log(i)
        newObj[item.modleName].push({
          id: i.idName,
          name: i.idName,
          cssList: {},
          children: this.setChildrenList(i)
        })
      })
    })
    return newObj
  }

  submit() {
    if (!this.themeName) {
      this.$message.error('主题名字不能为空')
      return
    }
    this.param.themeName = this.themeName
    this.param.elementurl = this.elementurl
    this.param.custom = this.changeDataFn(this.config)
    this._post({ url: apiUrl.createTheme,
      data: {
        user: '1',
        data: this.param
      }}
    ).then(res => {
      if (+res.code === 0) {
        this.$message.success('添加成功')
      }
    })
  }
  cancle() {
    const themeObj = document.getElementsByClassName('themeStyle')
    const heads = document.getElementsByTagName('head')
    themeObj.length > 0 && heads[0].removeChild(themeObj[0])
    this.config = Object.assign({}, this.oldConfig)
  }
  handleRemove(file, fileList) {
    this.elementurl = ''
  }
  handleExceed() {
  }
  uploadSuccess(response, file, fileList) {
    console.log(response)
    this.elementurl = response.msg
  }
  uploadError(err, file, fileList) {
    console.log(err)
  }
  destroyed() {
    this.cancle()
  }
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.customTheme-container {
  margin: 16px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  background: #fff;
}
.btnUl {
  display: flex;
  overflow: auto;
  li {
    margin: 20px;
  }
  .colorDiv {
    margin-top: 10px;
    span {
      display: inline-block;
      vertical-align: top;
      line-height: 36px;
      margin-right: 10px;
    }
  }
}
.tabUl{
  display: flex;
  overflow: auto;
  .ulItem {
    margin:20px;
    span {
      display: inline-block;
      vertical-align: top;
      line-height: 36px;
      margin-right: 10px;
    }
  }
}
h4{
  margin: 10px 0;
}
</style>
