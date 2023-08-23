import React from "react";
import GuardNav from "../../../components/guard/GuardNav";

type layoutProps = {
  params: {
    id: string;
  };
  children: React.ReactNode;
};

const layout = ({ params, children }: layoutProps) => {
  const id = parseInt(params.id);

  return (
    <div className="flex gap-12">
      <GuardNav id={id} />
      {children}
    </div>
  );
};

export default layout;
