import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full h-full bg-[#F8F8F8]">
      <Navbar />
      <div className="h-[100vh] bg-[#191919] p-4 w-full flex flex-row justify-center items-center">
        <div className="md:max-w-[30vw]">
          <h1 className="text-[6rem] break-words font-bold text-white md:max-w-[30vw] leading-[110%]">
            draft <br/> mails in a blink
          </h1>
          <p className="mt-4 text-[1.75rem]">
            introducing gibspons, draft mails, track sponsorships, and manage 
            negotiations, all in one place!
          </p>
        </div>
        <div className="w-auto h-auto hidden md:block">
          <Image
            src="/heroImage.svg"
            alt="hero"
            className=""
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
