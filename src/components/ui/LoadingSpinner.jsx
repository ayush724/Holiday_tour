const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const sizeClasses = {
    sm: { outer: "w-10 h-10", inner: "w-6 h-6", dot: "w-2 h-2" },
    md: { outer: "w-16 h-16", inner: "w-10 h-10", dot: "w-2.5 h-2.5" },
    lg: { outer: "w-24 h-24", inner: "w-16 h-16", dot: "w-3 h-3" },
  };

  const s = sizeClasses[size];

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className={`relative ${s.outer}`}>
        {/* Outer ring - slow spin */}
        <div
          className={`${s.outer} rounded-full border-[3px] border-orange-100 absolute top-0 left-0`}
        ></div>
        <div
          className={`${s.outer} rounded-full border-[3px] border-travel-orange border-t-transparent border-r-transparent absolute top-0 left-0 animate-spin`}
          style={{ animationDuration: "1.5s" }}
        ></div>

        {/* Inner ring - reverse spin */}
        <div
          className={`${s.inner} rounded-full border-2 border-orange-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        ></div>
        <div
          className={`${s.inner} rounded-full border-2 border-travel-orange border-b-transparent border-l-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin`}
          style={{ animationDuration: "1s", animationDirection: "reverse" }}
        ></div>

        {/* Center pulsing dot */}
        <div
          className={`${s.dot} bg-travel-orange rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse`}
        ></div>
      </div>

      {text && (
        <div className="mt-6 flex flex-col items-center gap-1.5">
          <p className="text-gray-700 text-sm font-medium">{text}</p>
          <div className="flex gap-1">
            <span
              className="w-1.5 h-1.5 bg-travel-orange rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></span>
            <span
              className="w-1.5 h-1.5 bg-travel-orange rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></span>
            <span
              className="w-1.5 h-1.5 bg-travel-orange rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;
