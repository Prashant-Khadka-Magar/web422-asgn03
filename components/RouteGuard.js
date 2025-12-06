import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { isAuthenticated } from "@/lib/authenticate";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { getFavourites } from "@/lib/userData";

const PUBLIC_PATHS = ["/login", "/register", "/about", "/_error"];

export default function RouteGuard(props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const [, setFavouritesList] = useAtom(favouritesAtom);

  const updateAtom = useCallback(async () => {
    setFavouritesList(await getFavourites());
  }, [setFavouritesList]);

  const authCheck = useCallback(
    (url) => {
      const path = url.split("?")[0];

      if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
        setAuthorized(false);
        router.push("/login");
      } else {
        setAuthorized(true);
      }
    },
    [router]
  );

  useEffect(() => {
    updateAtom();

    authCheck(router.pathname);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [authCheck, router.events, router.pathname, updateAtom]);

  return <>{authorized && props.children}</>;
}
