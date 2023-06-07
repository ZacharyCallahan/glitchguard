type BugProps = {
    bug: Bug;
}

const Bug = ({ bug, ...rest }: BugProps) => {
    return (
        <div {...rest}>
            <h4>{bug.name}</h4>
            <p>{bug.description}</p>
        </div>
    );
};

export default Bug;
