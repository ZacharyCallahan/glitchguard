type DataDisplayProps = React.HTMLProps<HTMLDivElement> & {
    number: number;
    title: string;
    color?: string;
};

const DataDisplay = ({ number, title, color }: DataDisplayProps) => {
    return (
        <div
            className={`${color} w-1/3 h-32  font-bol text-white rounded-md flex items-center justify-center flex-col shadow-md`}>
            <h3 className="text-2xl font-semibold">{number}</h3>
            <p className="text-xl">{title}</p>
        </div>
    );
};

export default DataDisplay;
