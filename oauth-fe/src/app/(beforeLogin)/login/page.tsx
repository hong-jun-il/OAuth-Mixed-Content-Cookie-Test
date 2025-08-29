"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleGithubLogin = () => {
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/github`);
  };

  const handleGoogleLogin = () => {
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`);
  };

  return (
    <form className={clsx("flex flex-col gap-5")}>
      <button
        type="button"
        className={clsx("border cursor-pointer", "h-30 px-5", "text-2xl")}
        onClick={handleGithubLogin}
      >
        깃허브 로그인
      </button>
      <button
        type="button"
        className={clsx("border cursor-pointer", "h-30 px-5", "text-2xl")}
        onClick={handleGoogleLogin}
      >
        구글 로그인
      </button>
      <button
        type="button"
        className={clsx("border cursor-pointer", "h-30 px-5", "text-2xl")}
      >
        카카오 로그인
      </button>
      <button
        type="button"
        className={clsx("border cursor-pointer", "h-30 px-5", "text-2xl")}
      >
        네이버 로그인
      </button>
    </form>
  );
}
