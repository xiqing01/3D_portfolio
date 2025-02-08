import { useState, useRef, Suspense } from 'react'
// useState: 用于声明和管理组件中的状态变量，这里用来保存粒子分布数据。
// useRef: 用于创建对 Points 组件的引用，便于在动画中操作它的属性（如旋转）。
// Suspense: 在异步加载 3D 资源或组件时显示备用的 UI。这里是处理 3D 模型或资源的异步加载。

import { Canvas, useFrame } from '@react-three/fiber'
// Canvas: 3D 场景的渲染容器，所有的 3D 内容都会在其中渲染。
// useFrame: 每一帧调用的函数，用于更新动画或交互逻辑。通常在其中执行旋转或位置更新等效果。

import { Point, PointMaterial, Points, Preload } from '@react-three/drei'
// Points: 用于绘制大量点对象，通常用于粒子系统。
// PointMaterial: 设置粒子的材质，包括颜色、大小、透明度等。
// Preload: 提前加载 3D 资源，减少渲染时的延迟，提升性能。

import * as random from "maath/random/dist/maath-random.esm"
// maath 是一个数学库，random 提供生成随机点或数据的方法。
// 这里用来生成球体内随机分布的粒子。

// 生成并渲染星星粒子的组件
const Stars = (props) => {
  const ref = useRef() 
  // 创建对 Points 组件的引用，后续会通过它来调整旋转动画。

  // 生成一个球体内随机分布的 5000 个点
  const [sphere] = useState(() => 
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  )
  // random.inSphere: 在一个球体范围内生成随机点，radius 指定球体半径。

  useFrame((state, delta) => {
    // 每一帧更新星星的旋转角度，模拟星空缓慢旋转的效果
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* group 组件用于将多个对象组合在一起并统一设置旋转角度 */}
      <Points 
        ref={ref} 
        positions={sphere} 
        stride={3} 
        frustumCulled 
        {...props}
      >
        {/* 
        Points: 渲染粒子，positions 为粒子的位置数据，stride 为每个粒子数据的步长。
        frustumCulled: 如果粒子在视野外则不渲染，提升性能。
        */}
        <PointMaterial 
          transparent // 材质透明
          color='#f272c8' // 粒子颜色为粉红色
          size={0.002} // 每个粒子的大小
          sizeAttenuation={true} // 粒子大小随着距离远近发生变化
          depthWrite={false} // 禁止深度写入，防止粒子互相遮挡
        />
      </Points>
    </group>
  )
}

// 包裹星星效果的画布组件
const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      {/* 使 Canvas 覆盖整个屏幕并置于最底层 */}
      <Canvas camera={{ position: [0, 0, 1] }}>
        {/* 设置相机的位置，使其稍微远离中心观察 3D 场景 */}
        <Suspense fallback={null}>
          {/* 在异步加载的资源还未完成时，不渲染任何内容 */}
          <Stars />
        </Suspense>

        <Preload all />
        {/* 提前加载所有的 3D 资源 */}
      </Canvas>
    </div>
  )
}

export default StarsCanvas
// 导出组件，供其他地方使用。
