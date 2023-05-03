import IonIcon from "@reacticons/ionicons";
import { useState, useEffect } from "react";
import { INavListItem } from "./NavItem";
import { NavItem } from "./NavItem";

const MobileNav = ({navListItems, close}: {navListItems: INavListItem[],close: () => void}) => {
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    setAnim(true)
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        close()
      }
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <div className="z-5">
      <div className="fixed inset-0 h-screen w-full backdrop-blur-sm bg-gray-500 bg-opacity-50" />
      <div className="fixed inset-0 p-5">
        <div
          className={`w-full bg-white rounded-xl p-5 transition-all  ${
            anim ? "scale-100" : "scale-90"
          }`}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-md">Navigation</h1>
            <IonIcon
              name="close-circle-outline"
              onClick={close}
              className="hover:scale-110 w-7 h-7 transition-all"
            />
          </div>
          <div className="mt-5 divide-y">
            {navListItems.map((item) => {
              return <NavItem key={item.label} navListItem={item} styles="py-1" />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;