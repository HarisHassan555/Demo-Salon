import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { db, auth } from '../firebase/config'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if (userCredential.user) {
        onLogin(true)
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-neutral-50 p-4"
    >
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-serif text-center mb-6">Admin Login</h2>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 
                     disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </motion.div>
  )
}

const AppointmentList = ({ appointments }) => {
  return (
    <div className="space-y-4">
      {appointments.length === 0 ? (
        <p className="text-gray-500 text-center">No appointments for this date</p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white p-4 rounded-lg shadow border border-gray-100"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{appointment.name}</h3>
              <span className="text-sm text-gray-500">{appointment.time}</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Service: {appointment.service}</p>
              <p>Email: {appointment.email}</p>
              <p>Phone: {appointment.phone}</p>
              {appointment.notes && (
                <p className="text-sm text-gray-500 break-words">Notes: {appointment.notes}</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

const AdminDashboard = ({ onLogout }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchAppointments = async (date) => {
    setLoading(true)
    try {
      const localDate = new Date(date)
      const dateStr = localDate.toLocaleDateString('en-CA')
      
      const appointmentsRef = collection(db, 'bookings')
      const q = query(appointmentsRef, where('date', '==', dateStr))
      const querySnapshot = await getDocs(q)
      
      const appointmentsList = []
      querySnapshot.forEach((doc) => {
        appointmentsList.push({ id: doc.id, ...doc.data() })
      })
      
      appointmentsList.sort((a, b) => {
        return a.time.localeCompare(b.time)
      })
      
      setAppointments(appointmentsList)
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments(selectedDate)
  }, [selectedDate])

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-center">Appointment Dashboard</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-16 md:items-center min-h-[calc(100vh-160px)]">
          {/* Calendar Section */}
          <div className="md:w-3/5 lg:w-[48%]">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow">
              <div className="h-full">
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  className="w-full text-base md:text-2xl"
                />
              </div>
            </div>
          </div>

          {/* Appointments Section */}
          <div className="md:w-2/5 lg:w-[42%] md:h-[calc(100vh-180px)] md:self-start md:sticky md:top-8">
            <h2 className="text-xl font-serif mb-4 text-center">
              Appointments for {selectedDate.toLocaleDateString()}
            </h2>
            <div className="md:h-[calc(100%-3rem)] md:overflow-y-auto scrollbar-hide">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                </div>
              ) : (
                <AppointmentList appointments={appointments} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user)
    })

    // Cleanup subscription
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={setIsAuthenticated} />
  }

  return <AdminDashboard onLogout={handleLogout} />
}

export default AdminPage 