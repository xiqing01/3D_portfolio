// 从 React 库中导入 Suspense 组件，用于处理异步加载的组件
import { Suspense } from "react";

// 从 @react-three/fiber 库中导入 Canvas 组件，用于创建 3D 渲染画布
import { Canvas } from "@react-three/fiber";

// 从 @react-three/drei 库中导入多个有用的 3D 组件
import {
  Decal, // 用于在物体表面添加贴花（Decal）
  Float, // 用于使物体在空间中漂浮
  OrbitControls, // 用于添加相机的轨道控制器，允许用户旋转、缩放和移动视角
  Preload, // 用于预加载资源，确保在渲染前资源已加载完成
  useTexture, // 用于加载纹理
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  // 使用 useTexture 加载纹理
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal} // 传入加载的纹理
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} /> {/* 修正属性名 */}
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
