import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase/config'
import { collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore'

const services = [
  {
    id: 'haircut',
    name: 'Haircut & Styling',
    duration: '60 min',
    price: '$60'
  },
  {
    id: 'color',
    name: 'Hair Coloring',
    duration: '120 min',
    price: '$120'
  },
  {
    id: 'treatment',
    name: 'Hair Treatment',
    duration: '45 min',
    price: '$80'
  },
  {
    id: 'styling',
    name: 'Special Styling',
    duration: '90 min',
    price: '$100'
  }
]

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM'
]

const SuccessPopup = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-xl"
    >
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-serif text-gray-900 mb-2">Booking Successful!</h3>
        <p className="text-gray-600">
          We'll send you a confirmation email shortly with all the details.
        </p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 
                 transition-colors duration-300"
      >
        Done
      </motion.button>
    </motion.div>
  </motion.div>
)

const pageVariants = {
  initial: {
    opacity: 0,
    x: '100%'
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: '-100%',
    transition: {
      duration: 0.3
    }
  }
}

const BookingPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  })
  const [bookedSlots, setBookedSlots] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Enhanced fetchBookedSlots function
  const fetchBookedSlots = async (selectedDate) => {
    if (!selectedDate) return
    
    setIsLoading(true)
    try {
      const bookingsRef = collection(db, 'bookings')
      const q = query(
        bookingsRef,
        where('date', '==', selectedDate)
      )

      const querySnapshot = await getDocs(q)
      const booked = {}
      
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        booked[data.time] = true
      })

      setBookedSlots(booked)
      
      // If current selected time is now booked, clear it
      if (booked[formData.time]) {
        updateFormData('time', '')
      }
    } catch (error) {
      console.error('Error fetching booked slots:', error)
      alert('Error loading available slots. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Update useEffect to use the enhanced fetchBookedSlots
  useEffect(() => {
    if (formData.date) {
      fetchBookedSlots(formData.date)
    } else {
      setBookedSlots({})
    }
  }, [formData.date])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Double check if slot is still available
      const bookingsRef = collection(db, 'bookings')
      const q = query(
        bookingsRef,
        where('date', '==', formData.date),
        where('time', '==', formData.time)
      )
      
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        alert('Sorry, this slot has just been booked. Please select another time.')
        await fetchBookedSlots(formData.date)
        return
      }

      // If slot is available, save the booking
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        date: formData.date,
        time: formData.time,
        createdAt: Timestamp.now(),
        status: 'pending'
      })

      setShowSuccess(true)
    } catch (error) {
      console.error('Error saving booking:', error)
      alert('Error saving your booking. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Update the time slot selection handler
  const handleTimeSelection = (time) => {
    if (bookedSlots[time]) {
      return // Do nothing if slot is booked
    }
    updateFormData('time', time)
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    navigate('/')
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-serif text-gray-900">Select Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <motion.button
                  key={service.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateFormData('service', service.id)}
                  className={`p-6 text-left rounded-xl border transition-all duration-300
                    ${formData.service === service.id 
                      ? 'border-gray-900 bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-500 mt-2">Duration: {service.duration}</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">{service.price}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-serif text-gray-900">Select Date & Time</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => {
                    const newDate = e.target.value
                    updateFormData('date', newDate)
                    updateFormData('time', '') // Reset time when date changes
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                           focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {timeSlots.map((time) => {
                      const isBooked = bookedSlots[time]
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleTimeSelection(time)}
                          disabled={isBooked}
                          className={`p-3 text-center rounded-lg border transition-all duration-300
                            ${formData.time === time 
                              ? 'border-gray-900 bg-gray-50' 
                              : isBooked
                                ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'border-gray-200 hover:border-gray-400'}`}
                        >
                          {time}
                          {isBooked && (
                            <span className="block text-xs text-red-500 mt-1">Booked</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-serif text-gray-900">Your Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                           focus:ring-gray-900 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                           focus:ring-gray-900 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                           focus:ring-gray-900 focus:border-transparent"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => updateFormData('notes', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                           focus:ring-gray-900 focus:border-transparent"
                  placeholder="Any special requests or notes"
                  rows={4}
                />
              </div>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen pt-20 bg-neutral-50"
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Progress Steps */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center max-w-xs">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center
                      ${step >= stepNumber ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div 
                      className={`w-12 h-1 mx-2
                        ${step > stepNumber ? 'bg-gray-900' : 'bg-gray-200'}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <form onSubmit={handleSubmit}>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 
                           transition-colors duration-300"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && !formData.service) ||
                    (step === 2 && (!formData.date || !formData.time))
                  }
                  className="ml-auto px-6 py-2 bg-gray-900 text-white rounded-lg 
                           hover:bg-gray-800 transition-colors duration-300 
                           disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!formData.name || !formData.email || !formData.phone}
                  className="ml-auto px-6 py-2 bg-gray-900 text-white rounded-lg 
                           hover:bg-gray-800 transition-colors duration-300 
                           disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Book Appointment
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && <SuccessPopup onClose={handleSuccessClose} />}
      </AnimatePresence>
    </motion.div>
  )
}

export default BookingPage 