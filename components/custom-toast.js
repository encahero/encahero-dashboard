import ToastProgressBar from "./toast-progress-bar";

export default function CustomToast({ isPaused, closeToast, data }) {
  const { type } = data;

  const typeColors = {
    success: "text-green-600 dark:text-green-400",
    error: "text-red-600 dark:text-red-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    info: "text-blue-600 dark:text-blue-400",
  };
  return (
    <div className="w-full max-w-md bg-white dark:bg-stone-900 overflow-hidden">
      {/* Text area */}
      <div className="flex flex-col p-4 gap-1">
        <h3
          className={`text-gray-900 dark:text-gray-100 text-sm font-semibold ${typeColors[type]}`}
        >
          {data.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          {data.content}
        </p>
      </div>

      {/* Progress bar full width at bottom */}
      <div className="w-full">
        <ToastProgressBar
          isPaused={isPaused}
          duration={5000}
          onAnimationEnd={closeToast}
        />
      </div>
    </div>
  );
}
