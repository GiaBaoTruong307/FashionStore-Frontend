import NewsletterBox from '../../components/ui/NewsletterBox'
import Title from '../../components/ui/Title'
import { assets } from '../../constants/assets'
import { motion } from 'framer-motion'

const Contact = () => {
  return (
    <motion.div
      initial={{ scale: 1.3, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="border-t pt-10 text-center text-2xl">
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className="my-10 mb-28 flex flex-col justify-center gap-10 md:flex-row">
        <img className="w-full md:max-w-[480px]" src={assets.contact_img} alt="" />
        <div className="flex flex-col items-start justify-center gap-6">
          <p className="text-xl font-semibold text-gray-600">Our Store</p>
          <p className="text-gray-500">
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: (+84) 905-442-322 <br />
            Email: giabaotruong30704@gmail.com
          </p>
          <p className="text-xl font-semibold text-gray-600">Careers at Forever</p>
          <p className="text-gray-500">Learn more about our teams and job openings.</p>
          <button className="border border-black px-8 py-4 text-sm transition-all duration-500 hover:bg-black hover:text-white">
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsletterBox />
    </motion.div>
  )
}

export default Contact
