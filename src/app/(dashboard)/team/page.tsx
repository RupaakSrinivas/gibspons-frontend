"use client";
import { authStore } from "@/store/auth";
import { organisationStore } from "@/store/organisation";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { getEvents } from "@/utils/events";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";

type Event = {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  expected_reg: number;
  description: string;
  brochure: string | null;
  logo: string | null;
};

const eventCard = (event: Event) => {
  return (
    <a
      key={event.id}
      href={`/team/${event.id}/dashboard`}
      className="flex relative flex-col p-4 bg-[#F4F4F4] max-w-[30rem] w-full h-[12.75rem] max-h-full shadow-md rounded-lg"
    >
      {/* <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">{event.name}</h2>
        <h3 className="text-lg font-semibold">{event.date_of_event}</h3>
      </div>
      <div className="flex flex-row items-center gap-4">
        <h3 className="text-lg">{event.expected_reg}</h3>
        <h3 className="text-lg">{event.description}</h3>
      </div>
      <div className="flex flex-row items-center gap-4">
        <h3 className="text-lg">{event.brochure}</h3>
        <h3 className="text-lg">{event.logo}</h3>
      </div> */}
      <div className="flex h-full w-wull text-[2rem] text-[#6D6D6D] flex-row items-center justify-center">
        {event.logo ? (
          <Image src={event.logo} alt="Event Logo" width={200} height={200} />
        ) : (
          <h1>{event.name}</h1>
        )}
      </div>
    </a>
  );
};

export default function Home() {
  const { accessToken, role } = authStore();
  const router = useRouter();

  const [eventsData, setEventsData] = useState<Event[]>([]);
  const { org } = organisationStore();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents(accessToken, org.id, null);
        setEventsData(data);
      } catch (error: any) {
        console.error(error);
      }
    };
    if (org.id !== 0) fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="relative h-full bg-white gap-8 flex flex-col items-center p-4">
        <div className="flex flex-col md:flex-row w-full items-center gap-4 h-full max-h-[11rem] justify-center">
          <div className="flex flex-col items-center md:items-start w-full max-w-[35rem]">
            {org.logo && (
              <Image
                src={org.logo}
                alt="Organisation Logo"
                width={100}
                height={100}
              />
            )}
            <h1 className=" font-semibold text-2xl">{org.name}</h1>
            {org.location && (
              <div className="flex flex-row gap-4 items-center">
                <IoLocationSharp />
                <h2 className="text-lg ">{org.location}</h2>
              </div>
            )}
          </div>
          <div className="bg-[#4D4D4D] p-4 font-bold text-white text-xl md:text-3xl rounded-md shadow-md w-full max-w-[30rem] h-full max-h-[11rem]">
            Overview
          </div>
        </div>
        <div
          className={`w-full flex flex-row items-center justify-start ${
            role === "owner" || role === "admin" ? "" : "hidden"
          } `}
        >
          <button
            onClick={() => {
              router.push("/team/createNewEvent");
            }}
            className="flex bg-white flex-row sticky bottom-0 items-center gap-2 border-2 font-bold rounded-sm border-blue-500 text-blue-500 p-2 px-4 z-10"
          >
            <IoMdAddCircleOutline className="text-2xl font-bold" /> Create New
            Event
          </button>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-center w-full">
          {eventsData.length !== 0 ? (
            eventsData.map((event) => eventCard(event))
          ) : (
            <h1>No Events</h1>
          )}
        </div>
      </div>
    </>
  );
}
