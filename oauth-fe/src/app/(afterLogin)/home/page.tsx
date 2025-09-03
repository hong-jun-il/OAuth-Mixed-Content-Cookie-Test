import clsx from "clsx";

export default function Home() {
  return (
    <div
      className={clsx(
        "min-h-dvh w-full",
        "flex justify-center items-center flex-col",
        "text-10xl"
      )}
    >
      protected route: Home
    </div>
  );
}
