import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import { fetchCountries, fetchPosts, fetchTime } from "../api/fetchData";
import { PostsData, TransformedPostsData } from "../types/types";
import styles from "./Profile.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore"; // Import RootState

function ProfilePage() {
  const [countries, setCounties] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("None");
  const [time, setTime] = useState<number>(Date.now());
  const location = useLocation();
  const userId = location.state.userId;
  const [offset, setOffset] = useState("");
  const posts = useSelector((state: RootState) => state.posts.data);
  const refTimer = useRef<any>(null);
  const [stopTime, setStopTime] = useState<Date>(new Date());
  const [watchStatus, setWatchStatus] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCountry != "None") {
      getTime();
    }
  }, [selectedCountry]);

  useEffect(() => {
    getCountries();
    startClock();

    return () => {
      stopClock();
    };
  }, []);

  function navigateBack() {
    navigate(-1);
  }

  const startClock = useCallback(() => {
    refTimer.current = setInterval(() => {
      setTime((val) => val + 1000);
    }, 1000);
  }, []);

  function stopClock() {
    if (refTimer.current) {
      clearInterval(refTimer.current);
    }
  }

  const getCountries = async () => {
    const data = await fetchCountries();
    setCounties(data);
  };

  const getTime = async () => {
    const data = await fetchTime(selectedCountry);
    setTime(getTimerString(data));
  };

  function changeCountry(event: any) {
    const value = event.target.value;

    setSelectedCountry(value);
  }

  function ChangeTimerStatus() {
    if (watchStatus) {
      stopClock();
    } else {
      startClock();
    }

    setWatchStatus((val) => !val);
  }

  function getTimerString(offset: string) {
    const epochTimeInUTC = Date.now() + new Date().getTimezoneOffset() * 60000;
    const offsetArr = offset.slice(1).split(":");
    const totalOffsetSeconds =
      Number(offsetArr?.[0] ?? 0) * 3600 + Number(offsetArr?.[1]) * 60 ??
      0 + Number(offsetArr?.[2]) ??
      0;
    console.log({ offset });

    const adjustedOffset =
      offset[0] == "+"
        ? totalOffsetSeconds * 1000
        : totalOffsetSeconds * 1000 * -1;
    const adjustedDate = new Date(epochTimeInUTC + adjustedOffset);

    return adjustedDate.getTime();
  }

  function formatTime() {
    var date = new Date(time);

    var hours = `0${date.getHours()}`.slice(-2);
    var minutes = `0${date.getMinutes()}`.slice(-2);
    var seconds = `0${date.getSeconds()}`.slice(-2);

    return `${hours}: ${minutes}: ${seconds}`;
  }

  return (
    <div className={styles.pageSetup}>
      <div className={styles.profileHeader}>
        <button onClick={navigateBack}>Back</button>
        <div className={styles.timerHandle}>
          <select defaultValue={"None"} onChange={changeCountry}>
            {countries.length > 0 &&
              countries.map((val, ind) => {
                return <option key={val}>{val}</option>;
              })}
          </select>
          <div>{formatTime()}</div>
          <button onClick={ChangeTimerStatus}>{"start/stop"}</button>
        </div>
      </div>
      <h3>Profile Page</h3>
      <div className={styles.userDetailsSection}>
        <div>
          <h5>Username</h5>
          <h5>{posts && posts?.[userId].userDetails.username}</h5>
        </div>
        <div>
          <h5>Email</h5>
          <h5>{posts && posts?.[userId].userDetails.email}</h5>
        </div>
      </div>
      <div className={styles.postContentContainer}>
        {posts &&
          posts?.[userId].postData.length > 0 &&
          posts[userId].postData.map((userPostData: PostsData) => {
            return (
              <div className={styles.postContent} key={userPostData.id}>
                <h4 className={styles.headings}>{`Post Title`}</h4>
                <h5>{userPostData.title}</h5>
                <h4 className={styles.headings}>{`Post Content`}</h4>
                <h4>{userPostData.body}</h4>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ProfilePage;
