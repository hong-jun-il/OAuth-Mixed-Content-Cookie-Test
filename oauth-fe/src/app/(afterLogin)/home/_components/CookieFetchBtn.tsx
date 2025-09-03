"use client";

import clsx from "clsx";

async function fetchCookie() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/fetch-cookie`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("HTTP ERROR!");
  }

  return res.json();
}

export default function CookieFetchBtn() {
  return (
    <button
      type="button"
      className={clsx("cursor-pointer", "h-30 px-10", "border text-2xl")}
      onClick={fetchCookie}
    >
      쿠키 가져오기
    </button>
  );
}
