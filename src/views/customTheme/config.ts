import buttonObj from '@/styles/theme/common-theme.scss'

const config:any = {
  btn: [],
  btn_g: [],
  btn_t: [],
  leftTab: [
    {
      name: '导航栏背景',
      id: 'sidebar-container .el-menu,#sidebar-container,#sidebar-container .full-mode .nest-menu .el-submenu > .el-submenu__title',
      children: [
        {
          id: 'sidebar-container .el-menu,#sidebar-container,#sidebar-container .full-mode .nest-menu .el-submenu > .el-submenu__title',
          name: 'background',
          cssList: {
            background: null
          }
        }
      ],
      cssList: {}
    },
    {
      name: '导航菜单',
      id: 'sidebar-container .el-submenu .el-submenu__title,#sidebar-container .full-mode .el-menu-item',
      cssList: {},
      children: [
        {
          name: 'color',
          id: 'sidebar-container .el-submenu .el-submenu__title,#sidebar-container .full-mode .el-menu-item',
          cssList: {
            color: null
          }
        },
        {
          name: 'background',
          id: 'sidebar-container .el-submenu .el-submenu__title,#sidebar-container .full-mode .el-menu-item',
          cssList: {
            background: null
          }
        }
      ]
    },
    {
      name: '导航菜单active',
      id: 'sidebar-container .full-mode .el-menu-item.is-active',
      cssList: {},
      children: [
        {
          name: 'color',
          id: 'sidebar-container .full-mode .el-menu-item.is-active',
          cssList: {
            color: null
          }
        },
        {
          name: 'background',
          id: 'sidebar-container .full-mode .el-menu-item.is-active',
          cssList: {
            background: null
          }
        }
      ]
    },
    {
      name: '导航菜单hover',
      id: 'sidebar-container .submenu-title-noDropdown:hover,#sidebar-container .el-submenu__title:hover',
      cssList: {},
      children: [
        {
          name: 'color',
          id: 'sidebar-container .submenu-title-noDropdown:hover,#sidebar-container .el-submenu__title:hover,#sidebar-container .full-mode .el-menu-item:hover',
          cssList: {
            color: null
          }
        },
        {
          name: 'background',
          id: 'sidebar-container .submenu-title-noDropdown:hover,#sidebar-container .el-submenu__title:hover,#sidebar-container .full-mode .el-menu-item:hover',
          cssList: {
            background: null
          }
        }
      ]
    }
  ]
}

const buttonArr = Object.entries(buttonObj)
function pushChildrenFn(newObj:any, newCssList:any, type:string) {
  if (newObj[0].indexOf('__') >= 0) {
    const name = newObj[0].split('__')[1].split('-')[0]
    const n = config[type].findIndex((item:any) => item.name === newObj[0].split('__')[0])
    const obj = {
      name: name,
      id: newObj[0].split('__')[0] + ':' + name,
      cssList: newCssList.children[0].cssList
    }
    n >= 0 && config[type][n].children.push(obj)
  } else {
    config[type].push(newCssList)
  }
}
for (let i = 0; i < buttonArr.length; i++) {
  const newObj:any = buttonArr[i]
  const cssList:any = newObj[1].split(',')
  const newCssList:any = {
    id: newObj[0],
    name: newObj[0],
    children: [{
      name: 'normal',
      id: newObj[0],
      cssList: {
        'background-color': cssList[0],
        'border-color': cssList[1],
        'color': cssList[2]
      }
    }],
    cssList: {}
  }
  if (newObj[0].indexOf('btn_g_') >= 0) {
    pushChildrenFn(newObj, newCssList, 'btn_g')
  } else if (newObj[0].indexOf('btn_t_') >= 0) {
    newCssList.children[0].cssList = { 'color': cssList[0] }
    pushChildrenFn(newObj, newCssList, 'btn_t')
  } else {
    pushChildrenFn(newObj, newCssList, 'btn')
  }
}
export default config
