import * as React from "react"
import { TimeInput } from "./time-input"

interface TimePickerProps {
  setTime: (time: string) => void
  defaultTime?: string
}

export function TimePickerDemo({ setTime, defaultTime }: TimePickerProps) {
  const [time, setTimeState] = React.useState<string>(defaultTime || "")

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value
    setTimeState(newTime)
    setTime(newTime)
  }

  return (
    <div className="flex items-center space-x-2">
      <TimeInput type="time" value={time} onChange={handleTimeChange} />
    </div>
  )
}

