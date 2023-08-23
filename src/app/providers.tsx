"use client";

import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { setGuards } from "../redux/features/guard-slice";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const DataFetchingProvider = ({ children }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const dispatch = useDispatch<AppDispatch>();
  if (user) {
    axios
      .get(`/api/get/users/guard`, {
        params: {
          email: user?.email,
        },
      })
      .then((res) => {
        const guards: Guard[] = res.data;
        dispatch(setGuards(guards));
      })
      .catch((err) => {
        console.log("Error fetching guards");
      });
  }
  return <>{children}</>;
};
