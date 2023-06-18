const loading = () => {
    const number = 6;
    return (
        <div>
            <div className="space-y-3">
                <div className="h-4 w-24 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="h-4 w-40 bg-gray-300 animate-pulse rounded-md"></div>
            </div>
            <div className="grid grid-cols-dashboard-fluid gap-6 mt-6 ">
                {Array(number)
                    .fill(0)
                    .map((_, index) => (
                        <div
                            key={index}
                            className="w-48 h-24 bg-gray-300 rounded-md animate-pulse"></div>
                    ))}
            </div>
        </div>
    );
};

export default loading;
