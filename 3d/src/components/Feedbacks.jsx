import { motion } from "framer-motion"  // 引入 framer-motion 库，用于动画效果

import { styles } from "../styles"        // 引入项目自定义样式
import { SectionWrapper } from "../hoc"     // 引入高阶组件，用于对组件进行包装
import { fadeIn, textVariant } from "../utils/motion"  // 引入自定义动画效果函数
import { testimonials } from '../constants'           // 引入常量数据（例如：用户评价列表）

// FeedbackCard 组件：用于展示单条用户评价
const FeedbackCard = ({
  index,         // 当前评价的索引，用于计算动画延迟
  testimonial,   // 评价内容
  name,          // 用户名
  designation,   // 用户职位
  company,       // 用户所在公司
  image,         // 用户头像图片链接
}) => {
  // 使用 return 显式返回 JSX 代码
  return (
    <motion.div
      // 使用 fadeIn 动画函数，传入参数：空字符串、"spring" 动画类型、延迟、持续时间
      variants={fadeIn("", "spring", index * 0.5, 0.75)}
      className="bg-black-200 !p-10 rounded-3xl sm:w-[320px] w-full"
    >
      {/* 引号样式装饰 */}
      <p className="text-white font-black text-[48px]">"</p>

      <div className="!mt-1">
        {/* 展示评价内容 */}
        <p className="text-white tracking-wider text-[18px]">{testimonial}</p>

        <div className="!mt-7 flex justify-between items-center gap-1">
          <div className="flex-1 flex flex-col">
            {/* 展示用户名 */}
            <p className="text-white font-medium text-[16px]">
              <span className="blue-text-gradient">@</span> {name}
            </p>
            {/* 展示用户职位与公司 */}
            <p className="!mt-1 text-secondary text-[12px]">
              {designation} of {company}
            </p>
          </div>

          {/* 用户头像 */}
          <img 
            src={image} 
            alt={`feedback_by-${name}`} 
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  )
}

// Feedbacks 组件：用于展示所有评价的整体区域
const Feedbacks = () => {
  return (
    <div className={`!mt-12 bg-black-100 rounded-[20px]`}>
      {/* 标题部分 */}
      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>
      {/* 评价卡片部分 */}
      <div className={`!-mt-20 !p-14 ${styles.paddingX} flex flex-wrap justify-between gap-7`}>
        {testimonials.map((testimonial, index) => (
          // 此处将单个 testimonial 对象的所有属性传递给 FeedbackCard 组件
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  )
}

// 使用 SectionWrapper 高阶组件包装 Feedbacks 组件并导出
export default SectionWrapper(Feedbacks, "")
