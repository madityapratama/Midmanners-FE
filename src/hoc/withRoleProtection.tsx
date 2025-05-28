import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export function withRoleProtection<P>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[]
) {
  return function RoleProtectedComponent(props: P) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (user && !allowedRoles.includes(user.role)) {
        router.replace("/unauthorized");
      }
    }, [user]);

    return <WrappedComponent {...props} />;
  };
}
