import { nonAuthenticatedRoutes, restrictedGuestRoutes } from "@/routes/routes";
import { UserType } from "@/types/types";
// import router from "next/router";
import { useRouter, usePathname } from 'next/navigation';


// const isGuestUser =  user && !user.email


export const redirectUser = (user: UserType | null, pathname: string) => {
    const router = useRouter();
    
    if(user?.email && nonAuthenticatedRoutes.includes(pathname)) {
      console.log('1')
      return router.push('/dashboard');
    }
    if(!user?.email && restrictedGuestRoutes.includes(pathname)) {
      console.log('2')
      return router.push('/dashboard');
    }
    if (!user && !nonAuthenticatedRoutes.includes(pathname)) {
      console.log('3')
      router.push("/");
    }
  }