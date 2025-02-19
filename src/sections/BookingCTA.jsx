import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const BookingCTA = () => {
  const navigate = useNavigate()

  return (
    <section id="booking" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-serif mb-6">Ready to Transform Your Look?</h2>
          <p className="text-lg text-gray-400 mb-8">
            Book your appointment today and let our expert stylists help you achieve 
            the look you've always wanted.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/booking')}
            className="bg-gray-800 text-white px-8 py-3 rounded-full 
                     font-medium hover:bg-gray-800 transition-colors duration-300"
          >
            Book Appointment
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default BookingCTA 