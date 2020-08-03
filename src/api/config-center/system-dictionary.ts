const apiUrl = {
  list: '/information/barcodeRule/list',
  update: '/information/barcodeRule/update',
  area: {
    search: '/information/channelConfig/area/list',
    deleteOne: '/information/channelConfig/area/delete',
    batchDelete: '/information/channelConfig/area/batchDelete',
    create: '/information/channelConfig/area/create'
  },
  organizational: {
    search: '/information/channelConfig/organization/list',
    deleteOne: '/information/channelConfig/organization/delete',
    batchDelete: '/information/channelConfig/organization/batchDelete',
    create: '/information/channelConfig/organization/create'
  },
  templateOne: {
    create: '/information/systemDictionary/create',
    list: '/information/systemDictionary/list',
    update: '/information/systemDictionary/update',
    deletes: '/information/systemDictionary',
    detail: '/information/systemDictionary'
  },
  templateTwo: {
    create: '/information/systemDictionaryExtra/create',
    list: '/information/systemDictionaryExtra/list',
    update: '/information/systemDictionaryExtra/update',
    deletes: '/information/systemDictionaryExtra',
    detail: '/information/systemDictionaryExtra'
  },
  templateAge: {
    list: '/information/ageRange/list',
    update: '/information/ageRange/update',
    create: '/information/ageRange/create',
    deletes: '/information/ageRange'
  },
  templateThereElement: {
    list: '/information/channelConfig/businessFormat/page',
    update: '/information/channelConfig/businessFormat/update',
    create: '/information/channelConfig/businessFormat/create',
    deletes: '/information/channelConfig/businessFormat',
    getSelect: '/information/channelConfig/businessFormat/dropDown'
  },
  templateSize: {
    list: '/information/sizeClass/list',
    update: '/information/sizeClass/update',
    deletes: '/information/sizeClass/delete',
    create: '/information/sizeClass/create'
  },
  templateShape: {
    list: '/information/modelClass/list',
    update: '/information/modelClass/update',
    deletes: '/information/modelClass/delete',
    create: '/information/modelClass/create'
  },
  templateColor: {
    color: {
      list: '/information/color/list',
      update: '/information/color/update',
      deletes: '/information/color/delete',
      create: '/information/color/create'
    },
    colorGroup: {
      list: '/information/colorGroup/list',
      update: '/information/colorGroup/update',
      deletes: '/information/colorGroup/delete',
      create: '/information/colorGroup/create'
    }
  }
}
export default apiUrl
