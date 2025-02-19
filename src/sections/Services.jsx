import { motion } from 'framer-motion'

const services = [
  {
    id: 1,
    title: "HAIR CARE",
    description: "Expert hair care services including cuts, styling, and treatments",
    link: "#"
  },
  {
    id: 2,
    title: "HAIR REMOVAL",
    description: "Professional hair removal services for all skin types",
    link: "#"
  },
  {
    id: 3,
    title: "SKIN CARE",
    description: "Customized skin care treatments for radiant, healthy skin",
    link: "#"
  },
  {
    id: 4,
    title: "NAIL BAR",
    description: "Complete nail care services including manicures and pedicures",
    link: "#"
  },
  {
    id: 5,
    title: "PIERCING",
    description: "Safe and professional piercing services",
    link: "#"
  },
  {
    id: 6,
    title: "SPA BODY",
    description: "Relaxing spa treatments for total body wellness",
    link: "#"
  },
  {
    id: 7,
    title: "SKIN POLISHER",
    description: "Advanced skin polishing treatments for a glowing complexion",
    link: "#"
  },
  {
    id: 8,
    title: "EYELASH",
    description: "Professional eyelash extensions and treatments",
    link: "#"
  }
]

const Services = () => {
  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Our Services</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            If you want to know a little bit more about us please watch the videos in 
            this section. These videos will demonstrate the amazing skills that have 
            earned Salon multiple industry awards and a huge base of loyal customers.
          </p>
          <p className="text-sm text-gray-400">
            To view more and full videos please visit our Vimeo channel.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="aspect-square"
            >
              <motion.a
                href={service.link}
                className="block h-full bg-neutral-300 p-4 md:p-6 border rounded-lg 
                         flex flex-col justify-center items-center text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-sm md:text-lg font-medium tracking-wider mb-2">
                  {service.title}
                </h3>
                <p className="text-xs md:text-sm line-clamp-3">
                  {service.description}
                </p>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services 