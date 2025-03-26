"use client";

import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { UserDetailContext } from "./_context/UserDetailContext";
import axios from "axios";
import { VideoFramesContext } from "./_context/VideoFramesContext";

function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState([]);
  const [videoFrames, setVideoFrames] = useState([]);
  useEffect(() => {
    user && saveUserInfo();
  }, [user]);

  const saveUserInfo = async () => {
    try {
      const result = await axios.post("/api/user", {
        user: {
          fullName: user.fullName,
          primaryEmailAddress: {
            email: user.primaryEmailAddress?.emailAddress
          },
          imageUrl: user.imageUrl
        }
      });
      setUserDetail(result?.data);
    } catch (error) {
      console.error("Error saving user info:", error);
    }
  };

  return (
    <div>
      <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
        <VideoFramesContext.Provider value={{videoFrames, setVideoFrames}}>
        {children}
        </VideoFramesContext.Provider>
        </UserDetailContext.Provider>
    </div>
  );
}
export default Provider;
