/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Group } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import icon from "@/assets/icon.svg";
import classes from "@/styles/NavbarSimple.module.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { authStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IconType } from "react-icons/lib";

// const data = [
//   { link: "/team", icon: BiSolidDashboard, label: "My Team" },
//   { link: "/members", icon: RiTeamFill, label: "Members" },
//   { link: "/sponsorships", icon: BiBuildings, label: "Sponsorships" },
//   // { link: "/home/eventDetails"g, icon: IoMdCalendar, label: "Event Details" },
//   // { link: "/home/generateMail", icon: IoMailOpen, label: "Generate a Mail" },
// ];

type dataType = {
  link: string;
  icon: IconType;
  label: string;
};

function NavbarSimple({ data }: { data: dataType[] }) {
  const [active, setActive] = useState("");
  const { logout } = authStore();
  const router = useRouter();

  const handleLogout = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    localStorage.clear();
    logout();
    router.push("/");
  };

  useEffect(() => {
    const path = window.location.pathname;
    const item = data.find((item) => item.link === path);
    setActive(item?.label || "");
  }, [data]);

  const links = data?.map((item) => (
    <a
      className={classes.link + " " + "hover:cursor-pointer"}
      data-active={item.label === active || undefined}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        router.replace(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span className={classes.linkLabel}>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-end">
          <Image
            width="50"
            height="50"
            src={icon}
            alt="Icon"
            className="h-[3.75rem] aspect-square"
          />
          <span className={` ${classes.title} flex flex-col text-white`}>
            <p className="text-3xl font-bold">gibspons</p>
            <p className="text-sm">by GDSC VIT.</p>
          </span>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(e) => handleLogout(e)}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span className={classes.linkLabel}>Logout</span>
        </a>
      </div>
    </nav>
  );
}

export default ProtectedRoute(NavbarSimple);
