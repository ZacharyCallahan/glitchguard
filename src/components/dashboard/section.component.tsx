import Link from "next/link";

type SectionProps = {
    title: string;
    content: string;
    data?: any[];
};

export const Section = ({ title, content, data }: SectionProps) => {


    return (
        <div>
            <div>
                <h1>{title}</h1>
                <p>{content}</p>
            </div>
            {data?.map((item, index) => {
                return (
                    <div key={index}>
                        <Link href={`/guard/${item.id}`}>{item.name}</Link>
                    </div>
                );
            })}
        </div>
    );
};
