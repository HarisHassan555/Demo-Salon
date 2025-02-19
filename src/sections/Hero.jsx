import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Salon interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      
      <div className="relative h-full flex items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Elevate Your Style
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Experience the art of hair transformation with our expert stylists. 
            Your journey to beautiful hair starts here.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-900 px-8 py-3 rounded-full 
                     font-medium hover:bg-gray-100 transition-colors duration-300"
            onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}
          >
            Book Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 