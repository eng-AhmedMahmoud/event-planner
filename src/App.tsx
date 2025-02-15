"use client"

import React, { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { EventProvider } from "./context/EventProvider"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { Layout } from "./components/Layout"
import { LoadingScreen } from "./components/ui/loader"

// Import components with named exports
import { HomePage } from "./pages/HomePage"
import { EventsPage } from "./pages/EventsPage"
import { AddEventPage } from "./pages/AddEventPage"
import { EditEventPage } from "./pages/EditEventPage"
import { NotFoundPage } from "./pages/NotFoundPage"

const App = () => {
  const [isLoading, setIsLoading] = React.useState(
    process.env.NODE_ENV !== "test", // Skip loading in tests
  )

  React.useEffect(() => {
    if (process.env.NODE_ENV !== "test") {
      const handleLoading = () => setIsLoading(false)
      window.addEventListener("load", handleLoading)
      return () => window.removeEventListener("load", handleLoading)
    }
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <ErrorBoundary>
      <EventProvider>
        <Layout>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/add-event" element={<AddEventPage />} />
              <Route path="/edit-event/:id" element={<EditEventPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#ffffff",
              color: "#1f2937",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              borderRadius: "0.5rem",
              padding: "1rem",
            },
          }}
        />
      </EventProvider>
    </ErrorBoundary>
  )
}

export default App

