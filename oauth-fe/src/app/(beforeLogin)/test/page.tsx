import clsx from "clsx";
import Image from "next/image";
import Test2 from "@/assets/test.png";

export default function page() {
  return (
    <div className="flex flex-col">
      <div className={clsx("w-100 h-auto border")}>
        <Image
          src={Test2}
          alt="test"
          priority
          placeholder="blur"
          sizes="(max-width: 640px) 100vw, 200px" // 화면 크기에 맞게 단위 포함
        />
      </div>
      <div>텍스트</div>
    </div>
  );
}
