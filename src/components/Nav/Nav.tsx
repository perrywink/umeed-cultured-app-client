import { useState } from "react";
import IonIcon from "@reacticons/ionicons";
import { useNavigate } from "react-router-dom";
import { INavListItem, NavItem } from "./NavItem";
import MobileNav from './MobileNav'

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navListItems: INavListItem[] = [
    {
      label: "Profile",
      link: "/profile",
      icon: <IonIcon name="person-circle-outline" />,
    },
    {
      label: "Sign out",
      link: "/signout",
      icon: <IonIcon name="log-out-outline" />,
    },
  ];

  return (
    <>
      <nav className="p-4 w-full flex justify-center items-center">
        <div
          className="flex justify-end md:hidden cursor-pointer w-full"
          onClick={() => setOpen(true)}
        >
          <IonIcon
            name="menu-outline"
            className="hover:scale-110 w-7 h-7 transition-all"
          />
        </div>
        <div className="hidden md:flex">
          {navListItems.map((item) => {
            return <NavItem key={item.label} navListItem={item} styles="px-5" />;
          })}
        </div>
        {open && <MobileNav navListItems={navListItems} close={() => setOpen(false)}/>}
      </nav>
    </>
  );
}
