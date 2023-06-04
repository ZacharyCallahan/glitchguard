type SectionProps = {
    title: string;
    content: string;
};

export const Section = ({ title, content } : SectionProps) => {
    return (
        <div>
            <div>
                <h1>{title}</h1>
                <p>{content}</p>
            </div>
            <div className="h-10 w-20 bg-black"></div>
        </div>
    );
};


