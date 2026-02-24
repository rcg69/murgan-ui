"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * BentoGrid is a responsive grid container that arranges its children in a bento-style layout.
 * It uses CSS Grid and is configured to adapt to different screen sizes.
 */
const BentoGrid = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid w-full auto-rows-[20rem] grid-cols-1 gap-2 sm:grid-cols-2 md:gap-3 lg:grid-cols-3 lg:gap-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
BentoGrid.displayName = "BentoGrid";

/**
 * BentoGridItem is a flexible component designed to be a child of BentoGrid.
 * It provides a consistent structure with a header, title, and description,
 * and includes a subtle scaling effect on hover.
 */
const BentoGridItem = React.forwardRef(
  ({ className, title, description, header, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-lg border bg-card p-4 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg",
          className
        )}
        {...props}
      >
        {/* Header content, perfect for images */}
        <div className="flex h-full min-h-[6rem] flex-1 overflow-hidden rounded-md bg-muted">
          {header}
        </div>

        {/* Title and description */}
        <div className="transition-transform duration-200 group-hover:translate-x-1">
          <div className="font-bold text-black text-lg mb-2">
            {title}
          </div>
          <p className="font-medium text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    );
  }
);
BentoGridItem.displayName = "BentoGridItem";

export { BentoGrid, BentoGridItem };
