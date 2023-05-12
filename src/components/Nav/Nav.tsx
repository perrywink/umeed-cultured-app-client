import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { INavListItem, NavItem } from "./NavItem";
import { UserCircleIcon, ArrowLeftOnRectangleIcon, Bars3Icon } from "@heroicons/react/24/solid";
import MobileNav from './MobileNav'
import UmeedLogo from "../../assets/umeed-psych-logo.png";
import Search from "../Search/Search";

interface IProps {
  searchKeyword: string
}

export default function Nav({searchKeyword}: IProps) {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate();

  const navListItems: INavListItem[] = [
    {
      label: "Profile",
      link: "/profile",
      icon: <UserCircleIcon className="h-6 w-6"/>,
    },
    {
      label: "Sign out",
      link: "/signout",
      icon: <ArrowLeftOnRectangleIcon className="h-6 w-6"/>,
    },
  ];

  const MobileMenuButton = () => (
    <div
      className="flex justify-end md:hidden cursor-pointer"
      onClick={() => setOpen(true)}
    >
      <Bars3Icon
        className="hover:scale-110 w-7 h-7 transition-all text-gray-500"
      />
    </div>
  )

  return (
    <>
      <nav className="p-4 px-8 w-full flex justify-between items-center gap-5">
        <div className="md:flex">
          <img src={UmeedLogo} className="w-12 h-12 rounded-lg object-cover"/>
        </div>
        <div className="md:flex justify-center w-full">
          <Search/>
        </div>
        <div className="hidden md:flex">
          {navListItems.map((item) => {
            return <NavItem key={item.label} navListItem={item} styles="mx-2"/>;
          })}
        </div>
        <MobileMenuButton/>
      </nav>
      {open && <MobileNav navListItems={navListItems} close={() => setOpen(false)}/>}
    </>
  );
}
