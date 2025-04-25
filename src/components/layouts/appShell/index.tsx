import { useRouter } from "next/router";
import Navbar from "@/components/layouts/navbar";

type appShellProps = {
    children: React.ReactNode;
};

const disableNavbar = ["/auth/login","/auth/signUp","/404","/auth/resetPassword","/auth/otp","/auth/newPassword"];

const AppShell = (props: appShellProps) => {
    const {children} = props;
    const {pathname} = useRouter();
    return (
        <main>
            {!disableNavbar.includes(pathname) && <Navbar />}
            {children}
        </main>
    );
}

export default AppShell;