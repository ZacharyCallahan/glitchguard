type GuardDataCardProps = {
    name: string;
    icon: string;
    number: number;
};
const GuardDataCard = ({ name, icon, number } : GuardDataCardProps) => {
    return (
        <div className="flex items-center justify-between w-full">
            <div>
                <i className={`${icon}`} />
                <h3 className="text-lg font-semibold">{name}</h3>
            </div>
            <p className="text-lg">{number}</p>
        </div>
    );
};

export default GuardDataCard;
