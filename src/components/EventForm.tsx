import { useNavigate } from "react-router-dom";
import { CalendarIcon, MapPin, Type, AlignLeft } from "lucide-react";
import { useEvents } from "../hooks/useEvents";
import type { Event } from "../types/event";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "../lib/utils";
import { format } from "date-fns";
import { TimePickerDemo } from "./ui/time-picker";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "../schemas/event.schema";

export const EventForm = ({ initialData }: { initialData?: Event }) => {
  const form = useForm<Event>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData || {
      name: "",
      date: "",
      time: "",
      location: "",
      description: "",
      status: "pending",
    },
  });

  const { addEvent, updateEvent, validateEvent } = useEvents();
  const navigate = useNavigate();

  const onSubmit = async (data: Event) => {
    try {
      const isValid = await validateEvent(data);
      if (!isValid) {
        toast.error("Please correct the errors in the form.");
        return false;
      }
      if (initialData) {
        await updateEvent({ ...initialData, ...data });
        toast.success("Event updated successfully!");
      } else {
        await addEvent(data as Omit<Event, "id" | "lastModified" | "version">);
        toast.success("Event created successfully!");
      }
      navigate("/events");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again later.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-8">
          <motion.div
            className="space-y-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {/* Event Name */}
            <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="event-name" className="text-gray-300">
                      Event Name
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input id="event-name" {...field} className="pl-10" placeholder="Enter event name" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Date and Time */}
            <motion.div
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="event-date" className="text-gray-300">
                      Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            data-testid="date-button"
                            id="event-date"
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal bg-gray-700 text-gray-300 border-gray-600",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 border-gray-700">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date?.toISOString())}
                          disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="event-time" className="text-gray-300">
                      Time
                    </FormLabel>
                    <FormControl>
                      <TimePickerDemo
                        setTime={(time) => field.onChange(time)}
                        defaultTime={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Location */}
            <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="event-location" className="text-gray-300">
                      Location
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input id="event-location" {...field} className="pl-10" placeholder="Enter location" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Description */}
            <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="event-description" className="text-gray-300">
                      Description
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <AlignLeft className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                        <Textarea
                          id="event-description"
                          {...field}
                          className="pl-10 min-h-[100px]"
                          placeholder="Enter event description"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </motion.div>

          {/* Form Actions */}
          <motion.div
            className="mt-8 flex justify-end space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/events")}
              className="bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600 hover:border-gray-500 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white border-blue-500 hover:bg-blue-500 hover:border-blue-400 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {initialData ? "Update Event" : "Create Event"}
            </Button>
          </motion.div>
        </div>
      </form>
    </Form>
  );
};