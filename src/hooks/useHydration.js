import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const dispatch = useDispatch();

  const hydrateAuth = async () => {
    try {
      const currentUser = localStorage.getItem("current-user");

      if (!currentUser) return;

      const userResponse = await axiosInstance.get("/users/" + currentUser);

      dispatch({
        type: "USER_LOGIN",
        payload: {
          id: userResponse.data.id,
          role: userResponse.data.role,
          name: userResponse.data.name,
          username: userResponse.data.username,
          profile_url: userResponse.data.profile_url,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsHydrated(true);
    }
  };

  useEffect(() => {
    hydrateAuth();
  }, []);

  return {
    isHydrated,
  };
};
