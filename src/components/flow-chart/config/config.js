export const Tools = {
  Tools1: {
    undo: {
      svg: 'undo',
      disabled: false,
      title: '撤销'
    },
    redo: {
      svg: 'redo',
      disabled: false,
      title: '重做'
    }
  },
  Tools2: {
    'bar-2': {
      svg: 'bar-2',
      title: '左对齐'
    },
    'bar-3': {
      svg: 'bar-3',
      title: '水平居中'
    },
    'bar-4': {
      svg: 'bar-4',
      title: '右对齐'
    }
  },
  Tools3: {
    'bar-5': {
      svg: 'bar-5',
      title: '顶对齐',
      action: 'alignTopEdge'
    },
    'bar-6': {
      svg: 'bar-6',
      title: '垂直居中',
      action: 'verticalCenter'
    },
    'bar-7': {
      svg: 'bar-7',
      title: '底对齐',
      action: 'alignBottomEdge'
    }
  },
  Tools4: {
    'bar-8': {
      svg: 'bar-8',
      title: '水平等间距',
      action: 'horizontalEqualSpacing'
    },
    'bar-9': {
      svg: 'bar-9',
      title: '垂直等间距',
      action: 'verticalEqualSpacing'
    }
  },
  Tools5: {
    'bar-10': {
      svg: 'bar-10',
      title: '图层'
    }
  }
  // copy: {
  //   svg: 'copy',
  //   title: '复制'
  // },
  // delete: {
  //   svg: 'dustbin',
  //   title: '删除',
  //   can: true
  // },
  // focus: {
  //   svg: 'focus',
  //   title: '居中'
  // },
  // selectAll: {
  //   svg: 'select_all',
  //   title: '全选'
  // },
  // requestFullscreen: {
  //   svg: 'flex-1',
  //   title: '全屏'
  // }
}

// 引导文案
export const TipsContent = [
  {
    label: '单元全选',
    value1: 'Ctrl',
    value2: 'a'
  },
  {
    label: '单元复制',
    value1: 'Ctrl',
    value2: 'c'
  },
  {
    label: '单元粘贴',
    value1: 'Ctrl',
    value2: 'v'
  },
  {
    label: '单元删除',
    value1: 'Delete',
    value2: ''
  },
  {
    label: '单元撤销',
    value1: 'Ctrl',
    value2: 'z'
  },
  {
    label: '单元重做',
    value1: 'Ctrl',
    value2: 'y'
  },
  {
    label: '取消所有选中单元',
    value1: 'Esc',
    value2: ''
  },
  {
    label: '画布居中',
    value1: 'Alt',
    value2: 'f'
  },
  {
    label: '放大/缩小',
    value1: 'Ctrl',
    value2: '+/-'
  }
]

export const typeContent = [
  {
    label: '简单连接器',
    value: 'normal'
  },
  {
    label: '平滑连接器',
    value: 'smooth'
  },
  {
    label: '圆角连接器',
    value: 'rounded'
  },
  {
    label: '跳线连接器',
    value: 'jumpover'
  }
]

export const typeAlign = [
  {
    label: '左对齐',
    value: 'left'
  },
  {
    label: '居中对齐',
    value: 'mid'
  },
  {
    label: '右对齐',
    value: 'right'
  }
]

export const typeWidthAndHeight = [
  {
    label: '宽度匹配',
    value: 'width'
  },
  {
    label: '高度匹配',
    value: 'height'
  },
  {
    label: '宽高匹配',
    value: 'widthAndHeight'
  }
]

export const typeLock = [
  {
    label: '锁定',
    value: 'lock'
  },
  {
    label: '解锁',
    value: 'unLock'
  }
]

export const levelList = [
  {
    label: '置于顶层',
    value: 'topping'
  },
  {
    label: '置于底层',
    value: 'bottoming'
  },
  {
    label: '上移一层',
    value: 'up'
  },
  {
    label: '下移一层',
    value: 'down'
  }
]