import { Tilt } from "react-tilt"; // 导入 react-tilt 组件，用于实现倾斜动画效果
import { motion } from "framer-motion"; // 导入 framer-motion 用于实现动画效果

import { styles } from "../styles"; // 引入项目的样式配置
import { services } from "../constants"; // 引入服务数据常量，用于动态生成服务卡片
import { SectionWrapper } from "../hoc"; // 引入高阶组件（HOC），用于包装 About 组件，实现额外功能（例如滚动效果、背景等）
import { fadeIn, textVariant } from "../utils/motion"; // 引入动画工具函数，用于设置动画的属性和效果

// 定义 ServiceCard 组件，用于展示单个服务卡片
const ServiceCard = ({ index, title, icon }) => (
  // 使用 Tilt 组件实现卡片倾斜效果，并传入配置参数 options
  <Tilt
    options={{
      max: 10,    // 最大倾斜角度为45度
      scale: 1,   // 缩放比例保持为1，即无缩放效果
      speed: 450, // 动画速度为450毫秒
    }}
    className='max-sm:!w-[75%] w-[45%]' // Tailwind CSS 类，设置卡片宽度
  >
    {/* 使用 motion.div 实现动画效果 */}
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)} // 调用 fadeIn 函数生成动画配置，参数分别为方向、动画类型、延迟和持续时间
      className='w-full green-pink-gradient !p-[1px] rounded-[20px] '
      style={{boxShadow: "var(--box-shadow-card)" }} // 样式类，设置背景渐变、内边距、圆角和阴影效果
    >
      {/* 内部容器 div，用于放置图标和标题 */}
      <div
        className='bg-tertiary rounded-[20px] !py-5 !px-12 !min-h-[280px] flex justify-evenly items-center flex-col'
      >
        {/* 展示服务图标 */}
        <img
          src={icon} // 图标的地址，从 props 中传入
          alt='web-development' // 替代文本，可以根据实际服务类型进行调整
          className='w-16 h-16 object-contain' // 设置图标大小和适应方式
        />

        {/* 展示服务标题 */}
        <h3 className='text-white text-[20px] font-bold text-center'>
          {title} {/* 从 props 中接收服务标题 */}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

// 定义 About 组件，用于展示介绍部分
const About = () => {
  return (
    <>
      {/* 使用 motion.div 包裹标题区域，应用文本动画效果 */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p> {/* 副标题 */}
        <h2 className={styles.sectionHeadText}>Overview.</h2> {/* 主要标题 */}
      </motion.div>

      {/* 使用 motion.p 展示详细介绍文本，并应用 fadeIn 动画 */}
      <motion.p
        variants={fadeIn("", "", 0.4, 2)} // 动画配置，延迟0.1秒，持续1秒
        className='!mt-4 text-secondary text-[17px] !max-w-3xl leading-[30px]'
      >
        I'm a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Node.js, and
        Three.js. I'm a quick learner and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Let's work together to bring your ideas to life!
      </motion.p>

      {/* 根据 services 数组映射生成多个 ServiceCard 组件 */}
      <div className='!mt-20 flex !flex-wrap !gap-10 justify-center'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

// 使用 SectionWrapper 高阶组件包装 About 组件，增加额外的布局或功能，然后导出
export default SectionWrapper(About, "about");
