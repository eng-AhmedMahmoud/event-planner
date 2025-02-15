import * as React from "react";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

const TimeInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    const internalRef = React.useRef<HTMLInputElement>(null);

    const handleContainerClick = () => {
      internalRef.current?.showPicker?.();
      internalRef.current?.focus();
    };

    // Combine internal and forwarded ref
    React.useImperativeHandle(ref, () => internalRef.current as HTMLInputElement);

    return (
      <div
        className={cn(
          "group relative flex h-9 w-full items-center rounded-md border border-zinc-200 bg-transparent shadow-sm transition-colors hover:border-zinc-300 focus-within:ring-1 focus-within:ring-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-700 dark:focus-within:ring-zinc-300",
          className
        )}
        onClick={handleContainerClick}
      >
        <input
          type="time"
          data-testid="time-input"
          ref={internalRef}
          className={cn(
            "h-full w-full bg-transparent px-3 py-1 text-base outline-none",
            "appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-clear-button]:hidden [&::-webkit-inner-spin-button]:hidden"
          )}
          {...props}
        />
        <div className="absolute right-3 flex items-center space-x-2">
          <span className="text-sm text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300">
            {props.value || 'HH:MM'}
          </span>
          <Clock className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300" />
        </div>
      </div>
    );
  }
);

TimeInput.displayName = "TimeInput";

export { TimeInput };