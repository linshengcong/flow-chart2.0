# flow-chart2.0

基于antv/x6 2.0 + Vue 开发的流程图示例, 参照 ProcessOn 部分功能.

## 工具栏功能

1. 拖拽节点到画布
  a. 普通节点
  b. 泳道节点
2. 撤回
3. 重做
4. 导出
  a. PDF
  b. PNG
  c. JPEG
  d. JSON
5. 导入(JSON)
6. 全屏
7. 自动布局
  a. 横向布局
  b. 纵向布局
8. 功能键tips信息
9. 多节点上下左右居中对齐
10. 节点水平等间距, 垂直等间距
11. 节点层级设置(存在瑕疵)
12. 搜索节点名称并定位到该节点

## 右侧弹窗

- 通过插槽注入, 后续可添加业务功能, 或者作为节点的属性面板

## 右键菜单功能

1. 复制(聚合了复制、拷贝、粘贴)
2. 删除
3. 全选
4. 锁定(存在瑕疵)
5. 解锁
6. 宽高匹配
7. 导出图片

tips:

1. 右键激活菜单时并不会选中, 当右键菜单进行对应功能操作的节点并没有处于选中状态的时候, 执行操作的目标为右键菜单的目标
2. 当右键菜单进行对应功能操作的节点同时处于选中状态的时候, 执行操作的目标为所有选中状态的目标

## 底部悬浮工具

1. 小地图打开收起
2. 定位到画布拥有节点的中心
3. 画布大小自由缩放
4. 全览(最大可能缩放以所有节点展示)
5. 全屏

## 节点

- 采用扩展性更高的自定义节点, 用Vue 文件编写, 展示自定义内容, 交互如下
  - 选中有且只有一个节点时, 按下键盘任意键进入编辑状态
  - 点击回车, 或者点击别的节点, 或者点击空白画布取消编辑状态

- 选中快速新建功能
  - 选中节点, 四周出现加号, 点击加号后拷贝当前节点粘贴到对应方向的一段距离

## 边

- 连线动画
- 连线可通过右侧抽屉编辑描述

## TODO

1. 锁定功能, 多选节点, 移动非锁定节点时, 能带动锁定节点移动
2. 连线类型自由选择
3. 点击节点后, 右侧画板出现节点属性, 并可编辑
4. 格式刷
5. 设置默认样式
6. 层级设置上一层, 不是简单zIndex + 1, 需要层级超过上层节点的层级
7. 泳道后续功能待开发(参考processOn), 添加连线, 组合后拖拽, 限制子节点, 实现难度很高

## issue

1. 使用manhattan 路由样式（连线路径样式）, 节点靠在一起的时候, 浏览器疯狂报warning

2. 流程图组件化的时候, 一般业务页面都是利用注入配置文件和插槽的方式来扩展自定义业务功能, 但是自定义节点注册方式是一种声明式的配置, 无法注入一个Vue 文件, 也无法插槽
    1. 在配置文件里面注入业务所需要节点的 path 路径动态加载节点(try catch 路径, 错误 or 没传时候, 使用默认节点路径)
    2. 注入js 代码, eval 执行生成自定义组件注入进去

3. 添加动画或者其他工具, 鼠标移入即触发changed 事件, 影响监听画布变化保存功能, 影响其他业务功能

4. 设置屏幕外节点不渲染, 屏幕外节点连接屏幕内连线也不显示, 屏幕外节点渲染, 节点太多可能影响性能
<!-- 5. 泳道功能的实现需要思考, 官网的例子是利用父子节点组来限制子节点不能超出父节点来实现泳道 -->
<!-- 5. y-axis 上为负, 下为正, 待研究 -->
