import { Navbar } from "flowbite-react";

type Props = {
    location: string;
}

const AdminNav = ({ location }: Props) => {

    return (

        <Navbar
            rounded={true}
            className="!bg-gray-50 w-full z-20 top-0 left-0 sticky border py-0"
        >
            <Navbar.Brand

                to="/navbars"
                className=""
            >
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/umeed-cultured-app.appspot.com/o/assets%2Fcup-logo-alpha.png?alt=media&token=54f6fba3-4b76-46b2-898c-cbec74c85c79" 
                    className="h-32 mr-3 py-0"
                    alt="CulturedUp Logo"
                />
        
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="">
                <Navbar.Link
                    href="#/admin"
                    className={`font-bold font-cormorant text-xl md:hover:text-umeed-beige ${location == "/admin" ? "text-umeed-beige": "text-gray-600"}`}
                >
                    Dashboard
                </Navbar.Link>
                <Navbar.Link
                    href="#/admin/post"
                    className={`font-bold font-cormorant text-xl md:hover:text-umeed-beige ${location == "/admin/post" ? "text-umeed-beige": "text-gray-600"}`}
                >
                    New Post
                </Navbar.Link>
                <Navbar.Link 
                    href="#/admin/create" 
                    className={`font-bold font-cormorant text-xl text-gray-600 active:text-umeed-beige md:hover:text-umeed-beige ${location == "/admin/create" ? "text-umeed-beige": "text-gray-600"}`}
                    >
                    New Admin
                </Navbar.Link>
                <Navbar.Link 
                    href="#/" 
                    className={`font-bold font-cormorant text-xl text-gray-600 active:text-umeed-beige md:hover:text-umeed-beige ${location == "/" ? "text-umeed-beige": "text-gray-600"}`}>
                    Sign Out
                </Navbar.Link>
               
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AdminNav;