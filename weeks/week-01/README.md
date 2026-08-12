# 第 1 周：认识一个 Three.js 场景

## 本周目标

- 理解 scene、camera、renderer 的职责
- 创建几何体、材质、灯光和地面
- 使用 `requestAnimationFrame` 建立动画循环
- 用 Raycaster 检测鼠标悬停和点击
- 学会用浏览器开发者工具观察运行时状态

## 今日练习

- [x] 创建一个基础场景
- [x] 添加三个不同几何体
- [x] 让物体持续旋转和轻微浮动
- [x] 添加悬停放大效果
- [x] 点击物体后显示名称
- [ ] 把三个物体替换成自己的设计

## 复盘问题

1. 如果删掉 `camera.lookAt(0, 0, 0)`，画面会怎样？
2. `raycaster.intersectObjects(objects)` 返回的是什么？
3. 为什么要限制 `devicePixelRatio`？
4. 哪一段代码负责让物体“漂浮”？

## 我的记录

在这里记录今天学会的概念、遇到的错误，以及下一次想做的改动。
