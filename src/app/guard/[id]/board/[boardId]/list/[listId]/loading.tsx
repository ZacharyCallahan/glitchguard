const loading = () => {
    const number = 8;
    return (
        <div className="space-y-6 w-full">
            <div className="space-y-3">
                <div className="h-7 w-60 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="h-4 w-80 bg-gray-300 animate-pulse rounded-md"></div>
            </div>
            <div className="grid grid-cols-fluid gap-6 w-full ">
                {Array(number)
                    .fill(0)
                    .map((_, index) => (
                        <div
                            key={index}
                            className="h-96 w-72 bg-gray-300 p-3 rounded-md animate-pulse"></div>
                    ))}
            </div>
        </div>
    );
};

export default loading;
