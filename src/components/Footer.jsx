import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-serif mb-2">Contact Us</h3>
            <div className="space-y-2">
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-gray-300 text-sm">
                <FaPhone className="text-xs" />
                <span>(123) 456-7890</span>
              </a>
              <a href="mailto:info@luxehair.com" className="flex items-center gap-2 hover:text-gray-300 text-sm">
                <FaEnvelope className="text-xs" />
                <span>info@luxehair.com</span>
              </a>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-serif mb-2">Location</h3>
            <a 
              href="https://maps.google.com/?q=your-address-here" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start gap-2 hover:text-gray-300 text-sm"
            >
              <FaMapMarkerAlt className="text-xs mt-1" />
              <span>
                123 Hair Salon Street<br />
                City, State 12345
              </span>
            </a>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-serif mb-2">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com/luxehair" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaFacebookF size={20} />
              </a>
              <a 
                href="https://instagram.com/luxehair" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-serif mb-2">Business Hours</h3>
            <div className="space-y-1 text-sm">
              <p>Monday - Friday: 9am - 8pm</p>
              <p>Saturday: 9am - 6pm</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-gray-800 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Luxe Hair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 