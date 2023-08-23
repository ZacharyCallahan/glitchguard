const loading = () => {
  const number = 8;
  return (
    <div className=" w-3/4 mr-12 space-y-6 ">
      <div className="space-y-3">
        <div className="h-7 w-60 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="h-4 w-80 bg-gray-300 animate-pulse rounded-md"></div>
      </div>
      <div className="grid grid-cols-fluid gap-6  ">
        {Array(number)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="h-96 bg-gray-300 rounded-md animate-pulse"
            ></div>
          ))}
      </div>
    </div>
  );
};

export default loading;
