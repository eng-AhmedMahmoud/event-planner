"use client"

import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, Edit2, Trash2, CheckCircle, Calendar, Clock, MapPin } from "lucide-react"
import { useEvents } from "../hooks/useEvents"
import { useEventDelete } from "../hooks/useEventDelete"
import { toast } from "react-hot-toast"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"

type FilterType = "all" | "pending" | "completed"

export function EventList() {
  const { handleDelete, DialogComponent } = useEventDelete()
  const { state, markAsCompleted, markAsPending } = useEvents()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<FilterType>("all")

  // SEO metadata
  useEffect(() => {
    document.title = "Event Management - Your Events"
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", "Manage your events - view, edit, and track your event status")
    }
  }, [])

  const eventCounts = useMemo(() => {
    return state.events.reduce(
      (acc, event) => {
        acc[event.status] = (acc[event.status] || 0) + 1
        acc.all = (acc.all || 0) + 1
        return acc
      },
      {} as Record<FilterType, number>,
    )
  }, [state.events])

  const filteredEvents = useMemo(() => {
    return state.events
      .filter((event) => {
        if (filter === "all") return true
        // Ensure exact string matching for status
        return event.status?.toLowerCase() === filter.toLowerCase()
      })
      .sort((a, b) => b.lastModified - a.lastModified)
  }, [state.events, filter])

  const handleMarkPending = async (id: string) => {
    try {
      await markAsPending(id)
      toast.success("Event marked as pending!")
      // Only switch tabs if we're on the completed tab and this was the last event
      if (filter === "completed" && filteredEvents.length === 1) {
        setFilter("pending")
      }
    } catch {
      toast.error("Failed to mark event as pending")
    }
  }

  const handleMarkCompleted = async (id: string) => {
    try {
      await markAsCompleted(id)
      toast.success("Event marked as completed!")
      // Only switch tabs if we're on the pending tab and this was the last event
      if (filter === "pending" && filteredEvents.length === 1) {
        setFilter("completed")
      }
    } catch {
      toast.error("Failed to mark event as completed")
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (state.loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]" role="status" aria-live="polite">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        <span className="sr-only">Loading events...</span>
      </div>
    )
  }

  if (state.error) {
    return (
      <Card className="p-6 border-destructive bg-destructive/10">
        <p className="text-destructive text-center" role="alert">
          Error: {state.error}
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterType)} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]" aria-label="Filter events">
            {(["all", "pending", "completed"] as const).map((type) => (
              <TabsTrigger key={type} value={type} className="relative">
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                <Badge variant="secondary" className="ml-2 h-5 min-w-[20px] px-1">
                  {eventCounts[type] || 0}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => navigate("/add-event")}
                size="sm"
                className="hidden sm:flex items-center bg-primary border border-primary hover:bg-primary/80 text-white"
                aria-label={`Create new event`}
              >
                <Plus className="h-4 w-4 mr-1" aria-hidden="true" />
                Create New Event
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add a new event to your calendar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div
        className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="Events list"
      >
        <AnimatePresence mode="popLayout" key={filter}>
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              role="listitem"
            >
              <Card className="group h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between gap-4">
                    <motion.h3 className="font-semibold text-lg leading-none tracking-tight truncate" layout="position">
                      {event.name}
                    </motion.h3>
                    <Badge variant={event.status === "completed" ? "success" : "warning"} className="shrink-0">
                      {event.status === "completed" ? "Completed" : "Pending"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <motion.div className="space-y-2.5" layout="position">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 shrink-0" aria-hidden="true" />
                      <span className="text-sm">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2 shrink-0" aria-hidden="true" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 shrink-0" aria-hidden="true" />
                      <span className="text-sm truncate">{event.location}</span>
                    </div>
                  </motion.div>
                  <motion.p className="mt-3 text-sm text-muted-foreground line-clamp-2" layout="position">
                    {event.description}
                  </motion.p>
                </CardContent>
                <CardFooter className="pt-4">
                  <div className="flex w-full items-center justify-end gap-2">
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => navigate(`/edit-event/${event.id}`)}
                            className="h-8 w-8 bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:hover:bg-blue-500/30"
                            aria-label={`Edit event: ${event.name}`}
                          >
                            <Edit2 className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="font-mono text-blue-600 dark:text-blue-400">
                          <p>Edit</p>
                        </TooltipContent>
                      </Tooltip>

                      {event.status !== "completed" ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleMarkCompleted(event.id)}
                              className="h-8 w-8 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400 dark:hover:bg-emerald-500/30"
                              aria-label={`Mark as completed: ${event.name}`}
                            >
                              <CheckCircle className="h-4 w-4" aria-hidden="true" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="font-mono text-emerald-600 dark:text-emerald-400">
                            <p>Mark completed</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleMarkPending(event.id)}
                              className="h-8 w-8 bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 dark:bg-yellow-500/20 dark:text-yellow-400 dark:hover:bg-yellow-500/30"
                              aria-label={`Mark as pending: ${event.name}`}
                            >
                              <Clock className="h-4 w-4" aria-hidden="true" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="font-mono text-yellow-600 dark:text-yellow-400">
                            <p>Mark pending</p>
                          </TooltipContent>
                        </Tooltip>
                      )}

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(event.id, event.name)}
                            className="h-8 w-8 bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30"
                            aria-label={`Delete event: ${event.name}`}
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="font-mono text-red-600 dark:text-red-400">
                          <p>Delete</p>
                        </TooltipContent>
                      </Tooltip>
                      <DialogComponent />
                    </TooltipProvider>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredEvents.length === 0 && !state.loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          role="status"
          aria-live="polite"
        >
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Calendar className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
              <p className="text-lg font-medium text-muted-foreground">
                No {filter !== "all" ? filter : ""} events found
              </p>
              <Button
                onClick={() => navigate("/add-event")}
                className="mt-2"
                size="sm"
                aria-label={`Create new event`}
              >
                Create New Event
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

