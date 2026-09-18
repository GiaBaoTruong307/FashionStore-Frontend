import Title from '../../components/ui/Title'
import { assets } from '../../constants/assets'
import NewsletterBox from '../../components/ui/NewsletterBox'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="border-t pt-8 text-center text-2xl">
        <Title text1="ABOUT" text2="US" />
      </div>

      <div className="my-10 flex flex-col gap-16 md:flex-row">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="Our team" />
        <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-2/4">
          <p>
            Forever was born out of a passion for timeless style and exceptional quality. Founded in
            2025, we set out to create a fashion destination where elegance meets comfort, and every
            piece tells a story of craftsmanship and attention to detail.
          </p>
          <p>
            From curated collections to exclusive designs, we work with the finest materials and
            trusted manufacturers to bring you clothing that not only looks good but feels
            extraordinary to wear—every single day.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            To empower confidence through style. We believe that what you wear is an expression of
            who you are. That’s why we’re committed to offering high-quality, trendy, and affordable
            fashion that helps you look and feel your absolute best, no matter the occasion.
          </p>
        </div>
      </div>

      <div className="py-4 text-4xl">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="mb-20 flex flex-col text-sm md:flex-row">
        <div className="flex flex-col gap-5 border px-10 py-8 sm:py-20 md:px-16">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            We meticulously inspect every garment and partner only with trusted suppliers who share
            our commitment to premium fabrics, perfect stitching, and long-lasting wear. Your
            satisfaction with quality is our top priority.
          </p>
        </div>
        <div className="flex flex-col gap-5 border px-10 py-8 sm:py-20 md:px-16">
          <b>Convenience</b>
          <p className="text-gray-600">
            Shop anytime, anywhere with our user-friendly website and mobile app. Enjoy fast
            shipping, easy returns within 30 days, and multiple secure payment options tailored to
            your comfort.
          </p>
        </div>
        <div className="flex flex-col gap-5 border px-10 py-8 sm:py-20 md:px-16">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our dedicated support team is here for you 24/7 via chat, email, or phone. Whether you
            need sizing advice, styling tips, or help with an order—we're always happy to assist.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </motion.div>
  )
}

export default About
