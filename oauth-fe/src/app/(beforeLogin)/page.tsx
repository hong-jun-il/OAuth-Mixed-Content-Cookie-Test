import clsx from "clsx";
import Link from "next/link";

export default function BeforeLoginHome() {
  return (
    <div
      className={clsx(
        "border",
        "text-2xl",
        "w-250 h-250",
        "flex justify-center items-center flex-col"
      )}
    >
      <div>랜딩페이지</div>
      <Link
        href={"/login"}
        className={clsx(
          "border cursor-pointer",
          "h-30 px-5",
          "flex items-center justify-center"
        )}
      >
        로그인하러가기
      </Link>
    </div>
  );
}
