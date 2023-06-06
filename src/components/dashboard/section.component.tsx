import Link from "next/link";

type SectionProps = {
    title: string;
    content: string;
    guards?: Guard[];
    guardsEnabled?: boolean;
};

export const Section = ({
    title,
    content,
    guards = [],
    guardsEnabled = false,
}: SectionProps) => {
    return (
        <div>
            <div>
                <h1>{title}</h1>
                <p>{content}</p>
            </div>

            {guardsEnabled
                ? guards.map(({ id, name }) => (
                      <div key={id}>
                          <Link href={`/guard/${id}`}>{name}</Link>
                      </div>
                  ))
                : guards.flatMap(({ id, name, boards = [] }) =>
                      boards.map(({ id: boardId, name: boardName }) => (
                          <div key={boardId}>
                              <Link href={`/guard/${id}/board/${boardId}`}>
                                  {boardName}
                              </Link>
                          </div>
                      ))
                  )}
        </div>
    );
};
