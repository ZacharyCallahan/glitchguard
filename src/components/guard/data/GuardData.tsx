import GuardDataCard from "./GuardDataCard";

const GuardData = () => {
    return (
        <div className="w-1/4 bg-white rounded-md p-6 text-center space-y-6 flex flex-col shadow-md">
            <div className="space-y-2">
                <h3 className="text-xl font-medium">Guard Data</h3>
                <p className="opacity-80 text-sm">
                    The general data of the guard.
                </p>
            </div>
            <div className="flex flex-col items-center justify-between flex-grow">
                <GuardDataCard icon={"test"} name={"Users"} number={0} />
                <GuardDataCard icon={"test"} name={"Boards"} number={0} />
                <GuardDataCard icon={"test"} name={"Bugs"} number={0} />
                <GuardDataCard icon={"test"} name={"Developers"} number={0} />
            </div>
        </div>
    );
};

export default GuardData;
