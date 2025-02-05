import * as React from "react";
import { cn } from "../lib/utils";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(
  (
    {
      className,

      ...props
    },
    ref
  ) => {
    return (
      <>
        <button
          className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-danger h-9 text-neutral-50 shadow  w-full cursor-pointer",
            className
          )}
          ref={ref}
          {...props}
        ></button>
      </>
    );
  }
);
Button.displayName = "Button";

export { Button };
