import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
const TaskCompleted = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const taskCompletedData = {
        labels: ["Completed", "In-Complete"],
        datasets: [
            {
                label: "Number of Tasks Completed",
                data: [12, 19],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
            },
        ],
    };
    const compeletedPercentage =
        (
            (taskCompletedData.datasets[0].data[0] /
                (taskCompletedData.datasets[0].data[1] +
                    taskCompletedData.datasets[0].data[0])) *
            100
        ).toFixed(2) + "%";

    const inCompletePercentage =
        (
            (taskCompletedData.datasets[0].data[1] /
                (taskCompletedData.datasets[0].data[1] +
                    taskCompletedData.datasets[0].data[0])) *
            100
        ).toFixed(2) + "%";
    return (
        <div className="w-1/4  bg-white rounded-md p-6 text-center space-y-6 shadow-md">
            <div className="space-y-2">
                <h3 className="text-xl font-medium">Task Completed on Time</h3>
                <p className="opacity-80 text-sm">
                    The percentage of task that have been completed before the
                    deadline.
                </p>
            </div>
            <div>
                <Pie
                    width={175}
                    height={175}
                    data={taskCompletedData}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                    }}
                />
            </div>
            <div className="flex justify-evenly">
                <div>
                    <h4>Complete</h4>
                    <p className="font-medium">{compeletedPercentage}</p>
                </div>
                <div>
                    <h4>In-Complete</h4>
                    <p className="font-medium">{inCompletePercentage}</p>
                </div>
            </div>
        </div>
    );
};

export default TaskCompleted;
