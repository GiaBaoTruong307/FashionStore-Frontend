import { assets } from '../../../constants/assets'
import { motion } from 'framer-motion'

const OurPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      id="Privacy"
      className="flex flex-col justify-around gap-12 py-20 text-center text-xs text-gray-700 sm:flex-row sm:gap-2 sm:text-sm md:text-base"
    >
      <div>
        <img src={assets.exchange_icon} className="m-auto mb-5 w-12" alt="" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>
      <div>
        <img src={assets.quality_icon} className="m-auto mb-5 w-12" alt="" />
        <p className="font-semibold">Days Return Policy</p>
        <p className="text-gray-400">We provide 7 days free return policy</p>
      </div>

      <div>
        <img src={assets.support_img} className="m-auto mb-5 w-12" alt="" />
        <p className="font-semibold">Best customer support</p>
        <p className="text-gray-400">We provide 24/7 customer support</p>
      </div>
    </motion.div>
  )
}

export default OurPolicy
