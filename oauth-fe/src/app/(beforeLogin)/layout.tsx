import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function BeforeLoginLayout({ children }: Props) {
  return (
    <>
      <main
        className={clsx(
          "min-h-dvh w-dvw",
          "flex items-center justify-center",
          "bg-sky-100"
        )}
      >
        {children}
      </main>
    </>
  );
}
