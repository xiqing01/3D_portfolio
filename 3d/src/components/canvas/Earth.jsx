import { Suspense } from "react"
// 从 React 中导入 Suspense 组件，用于处理异步加载的组件。当组件在加载数据时，Suspense 会提供一个“等待”的占位符效果。

import { Canvas } from "@react-three/fiber"
// 从 @react-three/fiber 中导入 Canvas 组件。Canvas 是创建 3D 场景的基础容器，所有的 3D 内容都会渲染在其中。

import { OrbitControls, Preload, useGLTF } from "@react-three/drei"
// 1. OrbitControls: 提供轨道控制器，允许用户用鼠标拖动、缩放和旋转 3D 模型。
// 2. Preload: 用于提前加载 3D 场景中的资源，优化性能和用户体验。
// 3. useGLTF: 用于加载 GLTF/GLB 格式的 3D 模型并返回模型的数据和几何结构。


import CanvasLoader from "../Loader"

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf")

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  )
}

const EarthCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far:200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  )
}

export default EarthCanvas