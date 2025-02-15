import type React from "react"
import { useParams, Navigate } from "react-router-dom"
import { EventForm } from "@/components/EventForm"
import { useEvents } from "../hooks/useEvents"
import { motion } from "framer-motion"

export const EditEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { state } = useEvents()
  const event = state.events.find((e) => e.id === id)

  if (!event) {
    return <Navigate to="/events" replace />
  }

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
          Edit Event
        </motion.h1>
        <EventForm initialData={event} />
      </div>
    </motion.div>
  )
}

