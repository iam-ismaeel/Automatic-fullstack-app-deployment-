import React, { useEffect, useRef, useState } from "react";

// Utility function to merge class names
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Custom ScrollArea Component
const ScrollArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  // Calculate thumb position and size
  const thumbSizeX =
    viewportSize.width > 0
      ? Math.max(
          20,
          (viewportSize.width / contentSize.width) * viewportSize.width
        )
      : 0;

  const thumbSizeY =
    viewportSize.height > 0
      ? Math.max(
          20,
          (viewportSize.height / contentSize.height) * viewportSize.height
        )
      : 0;

  const thumbPositionX =
    contentSize.width > viewportSize.width
      ? (scrollPosition.x / (contentSize.width - viewportSize.width)) *
        (viewportSize.width - thumbSizeX)
      : 0;

  const thumbPositionY =
    contentSize.height > viewportSize.height
      ? (scrollPosition.y / (contentSize.height - viewportSize.height)) *
        (viewportSize.height - thumbSizeY)
      : 0;

  // Update scroll position when scrolling
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleScroll = () => {
      setScrollPosition({
        x: viewport.scrollLeft,
        y: viewport.scrollTop,
      });
    };

    const handleResize = () => {
      if (viewport) {
        setViewportSize({
          width: viewport.clientWidth,
          height: viewport.clientHeight,
        });
        setContentSize({
          width: viewport.scrollWidth,
          height: viewport.scrollHeight,
        });
      }
    };

    // Initial size measurement
    handleResize();

    // Setup observers for content and size changes
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(viewport);

    viewport.addEventListener("scroll", handleScroll);

    return () => {
      viewport.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  // Determine if scrollbars should be visible
  const showHorizontalScrollbar = contentSize.width > viewportSize.width;
  const showVerticalScrollbar = contentSize.height > viewportSize.height;

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div
        ref={viewportRef}
        className="h-full w-full overflow-auto"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
          WebkitOverflowScrolling: "touch", // Adds momentum scrolling on iOS
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {children}
      </div>

      {/* Horizontal Scrollbar */}
      {showHorizontalScrollbar && (
        <div className="absolute bottom-0 left-0 right-0 h-2.5 py-[1px]">
          <div className="h-full w-full rounded-b-md">
            <div
              className="absolute rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
              style={{
                height: "100%",
                width: thumbSizeX,
                transform: `translateX(${thumbPositionX}px)`,
              }}
            />
          </div>
        </div>
      )}

      {/* Vertical Scrollbar */}
      {showVerticalScrollbar && (
        <div className="absolute right-0 top-0 bottom-0 w-2.5 px-[1px]">
          <div className="w-full h-full rounded-r-md">
            <div
              className="absolute rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
              style={{
                width: "100%",
                height: thumbSizeY,
                transform: `translateY(${thumbPositionY}px)`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
});
ScrollArea.displayName = "ScrollArea";

export { ScrollArea, cn };
