import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

// Combine all images for mobile view
const allImages = [
  {
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035',
    alt: 'Elegant hair styling'
  },
  {
    url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702',
    alt: 'Hair coloring transformation'
  },
  {
    url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df',
    alt: 'Luxury salon interior'
  },
  {
    url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1',
    alt: 'Professional hair treatment'
  },
  {
    url: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f',
    alt: 'Modern hair styling'
  },
  {
    url: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3',
    alt: 'Salon atmosphere'
  },
  {
    url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
    alt: 'Hair coloring'
  },
  {
    url: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388',
    alt: 'Professional styling'
  }
]

const row1Images = allImages.slice(0, 4)
const row2Images = allImages.slice(4)

const ImageSlider = ({ images, direction = 'left', speed = 20 }) => {
  const scrollerRef = useRef(null)
  const primaryRef = useRef(null)

  useEffect(() => {
    if (!scrollerRef.current || !primaryRef.current) return
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          scrollerRef.current.appendChild(scrollerRef.current.firstElementChild)
        }
      })
    }, { threshold: 0 })

    observer.observe(primaryRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative flex overflow-hidden group">
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-neutral-50 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-neutral-50 to-transparent" />
      
      {/* Scroller */}
      <div
        ref={scrollerRef}
        className="flex gap-4 animate-scroll"
        style={{
          '--scroll-direction': direction === 'left' ? 'forwards' : 'reverse',
          '--scroll-speed': `${speed}s`,
        }}
      >
        {/* Triple the images for seamless loop */}
        {[...images, ...images, ...images].map((image, index) => (
          <div
            key={index}
            ref={index === 0 ? primaryRef : null}
            className="relative flex-shrink-0 md:h-[300px] md:w-[450px] h-[200px] w-[300px] 
                     overflow-hidden rounded-xl"
          >
            <img
              src={`${image.url}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 
                       group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 
                         transition-all duration-300 flex items-end">
              <div className="p-6 w-full transform translate-y-full group-hover:translate-y-0 
                           transition-transform duration-300">
                <p className="text-white text-lg font-medium">{image.alt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Work = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="work" className="py-20 bg-neutral-50">
      <div className="max-w-[100vw] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-4"
        >
          <h2 className="text-4xl font-serif text-gray-900 pt-8 mb-4">Our Work</h2>
          <div className="w-24 h-1 bg-gray-900 mx-auto mb-8" />
          <p className="text-lg text-gray-600">
            Browse through our portfolio of transformations
          </p>
        </motion.div>

        <div className="space-y-8">
          {isMobile ? (
            <ImageSlider images={allImages} direction="left" speed={30} />
          ) : (
            <>
              <ImageSlider images={row1Images} direction="left" speed={35} />
              <ImageSlider images={row2Images} direction="right" speed={30} />
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Work 