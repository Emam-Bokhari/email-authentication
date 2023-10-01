import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <section className="max-w-screen-xl mx-auto px-8 md:px-16 " >
                <div>
                    <nav className="shadow-lg py-4 rounded-md my-10" >
                        <ul className="flex justify-center gap-10 text-xl">
                            <Link to="/" >Home</Link>
                            <Link to="/login" >Login</Link>
                            <Link to="/signup" >SignUp</Link>
                        </ul>
                    </nav>
                </div>

                <div>
                    <Outlet />
                </div>
            </section>
        </div>
    );
};

export default MainLayout;