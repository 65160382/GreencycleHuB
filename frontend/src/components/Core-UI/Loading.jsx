const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loading;
