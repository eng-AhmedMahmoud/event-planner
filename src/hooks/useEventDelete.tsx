import { useState } from "react"
import { createPortal } from "react-dom"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import { useEvents } from "@/hooks/useEvents"

export const useEventDelete = () => {
  const { deleteEvent } = useEvents()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<{ id: string; name: string } | null>(null)

  const handleDelete = (id: string, name: string) => {
    setEventToDelete({ id, name })
    setIsDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (eventToDelete) {
      try {
        await deleteEvent(eventToDelete.id)
        toast.success("Event deleted successfully!")
      } catch (error) {
        console.error("Error deleting event:", error)
        toast.error("Failed to delete event. Please try again.")
      } finally {
        setIsDialogOpen(false)
        setEventToDelete(null)
      }
    }
  }

  const cancelDelete = () => {
    setIsDialogOpen(false)
    setEventToDelete(null)
  }

  const DialogComponent = () => {
    const modalRoot = document.getElementById('modal')
    if (!modalRoot) return null

    return createPortal(
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>Are you sure you want to delete "{eventToDelete?.name}"?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
      modalRoot
    )
  }

  return { handleDelete, confirmDelete, cancelDelete, DialogComponent }
}
