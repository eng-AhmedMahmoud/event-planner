import React from 'react'
import { EventForm } from '@/components/EventForm'
import { motion } from 'framer-motion'

export const AddEventPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-white mb-8"
        >
          Create New Event
        </motion.h1>
        <EventForm />
      </div>
    </motion.div>
  )
}
