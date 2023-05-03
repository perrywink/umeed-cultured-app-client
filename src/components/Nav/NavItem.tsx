import { useNavigate } from "react-router-dom";

export interface INavListItem {
  label: string;
  link: string;
  icon: JSX.Element;
}

export const NavItem = ({
  navListItem,
  styles,
}: {
  navListItem: INavListItem;
  styles?: string;
}) => {
  const navigate = useNavigate()
    
  return (<div
    onClick={() => navigate(navListItem.link)}
    className={`text-md cursor-pointer text-gray-500 hover:text-gray-900 ${styles}`}
  >
    {navListItem.label}
  </div>)

}
  
