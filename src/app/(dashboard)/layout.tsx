"use client";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import HeaderTabs from "@/components/HeaderTabs";
import ManageOrg from "@/components/ManageOrg";
import { authStore } from "@/store/auth";
import { useEffect, useState } from "react";
import { BiSolidDashboard, BiBuildings } from "react-icons/bi";
import { RiTeamFill } from "react-icons/ri";
import { IoMailOpen } from "react-icons/io5";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import path from "path";

const inter = Inter({ subsets: ["latin"] });


function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { organisation, is_approved } = authStore();
  const [Organisation, setOrganisation] = useState<string | null>("");
  const [Is_approved, setIsApproved] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setOrganisation(organisation);
    setIsApproved(is_approved);
  }, [organisation, is_approved]);

  const event_id = pathname.split("/")[2];

  const teamPathRegex = /^\/team\/(\d+)\/.*$/; // Fix regular expression syntax

  const isTeamPath = teamPathRegex.test(pathname);

  return (
    <div className={`flex flex-row bg-[#ECECEC] w-full absolute h-screen ${inter.className}`}>
      <Sidebar
        data={
          pathname.includes(`/team/${event_id}/`)
            ? [
                {
                  link: `/team/${event_id}/dashboard`,
                  icon: BiSolidDashboard,
                  label: "Dashboard",
                },
                {
                  link: `/team/${event_id}/eventDetails`,
                  icon: RiTeamFill,
                  label: "Event Details",
                },
                {
                  link: `/team/${event_id}/sponsorships`,
                  icon: BiBuildings,
                  label: "Sponsorships",
                },
                {
                  link: `/team/${event_id}/generateMail`,
                  icon: IoMailOpen,
                  label: "Generate a Mail",
                },
              ]
            : pathname.includes("/")
            ? [
                { link: "/team", icon: BiSolidDashboard, label: "My Team" },
                { link: "/members", icon: RiTeamFill, label: "Members" },
                {
                  link: "/sponsorships",
                  icon: BiBuildings,
                  label: "Sponsorships",
                },
              ]
            : []
        }
      />
      <div className="flex flex-col w-full ml-[rem(60)] sm:ml-[rem(300)]">
        <HeaderTabs />
        {Organisation === null || Is_approved === false ? (
          <ManageOrg />
        ) : (
          <div className="m-4 relative rounded-md h-full overflow-auto">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProtectedRoute(Dashboard);
