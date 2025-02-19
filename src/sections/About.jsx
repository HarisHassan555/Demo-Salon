import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const features = [
  {
    title: "Expert Stylists",
    description: "Our team of professional stylists brings years of experience and expertise",
    icon: (
      <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  {
    title: "Premium Products",
    description: "We use only the highest quality hair care products for the best results",
    icon: (
      <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  },
  {
    title: "Satisfaction Guaranteed",
    description: "Your satisfaction is our top priority - we ensure you love your new look",
    icon: (
      <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
]


const AboutModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 
                     flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl h-[85vh] bg-white rounded-2xl shadow-2xl 
                       relative overflow-hidden flex flex-col"
            >
              {/* Decorative header */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white">
                <h3 className="text-3xl font-serif mb-2">Our Story</h3>
                <p className="text-gray-300 font-light">
                  A journey of passion, excellence, and beauty
                </p>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto fancy-scrollbar p-8">
                <div className="prose prose-lg text-gray-600 max-w-none">
                  {/* Mission */}
                  <div className="mb-12">
                    <h4 className="text-2xl font-serif text-gray-900 mb-4">Our Mission</h4>
                    <p className="mb-4">
                      At Luxe Hair, our mission is to transform not just hair, but lives. 
                      We believe that true beauty comes from feeling confident and 
                      comfortable in your own skin.
                    </p>
                  </div>

                  {/* Journey */}
                  <div className="mb-12">
                    <h4 className="text-2xl font-serif text-gray-900 mb-4">Our Journey</h4>
                    <p className="mb-4">
                      Founded in 2008 by master stylist Sarah Mitchell, Luxe Hair began 
                      as a small, intimate salon with a big dream: to create a space where 
                      artistry meets expertise, and where every client receives 
                      personalized, world-class service.
                    </p>
                    <p className="mb-4">
                      From our humble beginnings with just three styling chairs, we've 
                      grown into one of the city's most prestigious salons, earning 
                      numerous industry accolades and a loyal clientele that spans 
                      generations.
                    </p>
                  </div>

                  {/* Values */}
                  <div className="mb-12">
                    <h4 className="text-2xl font-serif text-gray-900 mb-4">Our Values</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3" />
                        <p><strong>Excellence:</strong> We pursue perfection in every cut, 
                        color, and style.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3" />
                        <p><strong>Innovation:</strong> We stay ahead of trends while 
                        mastering timeless techniques.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3" />
                        <p><strong>Community:</strong> We create a welcoming space where 
                        everyone feels valued.</p>
                      </li>
                    </ul>
                  </div>

                  {/* Founder */}
                  <div>
                    <h4 className="text-2xl font-serif text-gray-900 mb-4">Our Founder</h4>
                    <div className="flex gap-6 items-start">
                      <div className="flex-1">
                        <p className="mb-4">
                          Sarah Mitchell brings over two decades of international experience 
                          to Luxe Hair. Trained in Paris and New York, she's worked with 
                          celebrity clients and led styling teams at major fashion events.
                        </p>
                        <p>
                          Her vision of combining high-end luxury service with a warm, 
                          welcoming atmosphere has shaped Luxe Hair into what it is today.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white hover:text-gray-300
                         transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="about" className="pt-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col pt-16 md:flex-row items-center justify-between gap-16">
          {/* About Content */}
          <motion.div 
            initial={{ opacity: 0, x: 0, y: 20 }}
            whileInView={{ 
              opacity: 1,
              x: 0,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <h2 className="text-5xl font-serif text-gray-900 mb-4">
              Our Legacy of <br />Excellence
            </h2>
            <div className="w-24 h-1 bg-gray-900 mb-8" />
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              For over 15 years, we've been dedicated to the art of hair care, 
              combining expertise with creativity to bring out your natural beauty. 
              Our journey is built on passion, innovation, and a commitment to excellence.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gray-800 text-white rounded-full
                       hover:bg-gray-800 transition-colors duration-300"
            >
              Discover Our Story
            </motion.button>
          </motion.div>

          {/* Image Section */}
          <motion.div 
            initial={({ 
              opacity: 0,
              x: window.innerWidth >= 768 ? 20 : 0,
              y: window.innerWidth < 768 ? 20 : 0
            })}
            whileInView={({ 
              opacity: 1,
              x: 0,
              y: 0
            })}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Salon interior"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </motion.div>
        </div>

        <AboutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </section>
  )
}

export default About 