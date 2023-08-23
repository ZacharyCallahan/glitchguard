import { Section } from "../../../components/dashboard/section";

const Page = () => {
  return (
    <Section
      title="Your Guards"
      content="Here are all your Guards!"
      guardsEnabled={true}
    />
  );
};

export default Page;
