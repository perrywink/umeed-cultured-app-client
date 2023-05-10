import { useNavigate } from "react-router-dom";

export interface INavListItem {
  label: string;
  link: string;
  icon: JSX.Element;
}

export const MobileNavItem = ({
  navListItem,
  styles,
}: {
  navListItem: INavListItem,
  styles?: string,
}) => {
  const navigate = useNavigate()
    
  return (
    <div
      onClick={() => navigate(navListItem.link)}
      className={`text-md cursor-pointer text-gray-500 hover:text-gray-900 ${styles} flex align-center gap-2`}
    >
      {navListItem.icon}
      {navListItem.label}
    </div>
  )

}

export const NavItem = ({
  navListItem,
  styles,
  displayLabel
}: {
  navListItem: INavListItem,
  styles?: string,
  displayLabel: boolean,
}) => {
  const navigate = useNavigate()
    
  return (
    <div
      onClick={() => navigate(navListItem.link)}
      className={`text-md cursor-pointer text-gray-500 hover:text-gray-900 ${styles} flex align-center gap-1`}
    >
      {navListItem.icon}
      {displayLabel && navListItem.label}
    </div>
  )

}
