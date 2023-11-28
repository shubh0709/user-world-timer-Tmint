import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import styles from "./Directory.module.css";
import { fetchPosts } from "../api/fetchData";
import { PostsData, TransformedPostsData } from "../types/types";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { useDispatch } from "react-redux";
import { storeSetPosts } from "../store/postsSlice";
import { AppDispatch } from "../store/configureStore"; // Import RootState

function Directory() {
  const [posts, setPosts] = useState<TransformedPostsData | null>(null);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  async function getPosts() {
    const data = await fetchPosts();
    setPosts(data);
    dispatch(storeSetPosts(data));
  }

  function handleClick(userId: number) {
    // Use the navigate function to navigate
    navigate("/profile", { state: { userId } });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={styles.pageSetup}>
      <h2> Directory</h2>
      {posts &&
        Object.entries(posts).length > 0 &&
        Object.keys(posts).map((userId) => {
          return (
            <div
              className={styles.userInfoCard}
              key={userId}
              onClick={() => handleClick(Number(userId))}
            >
              <h4>{`Name: ${posts[Number(userId)].userDetails.name}`}</h4>
              <h4>{`Posts: ${posts[Number(userId)].postData.length}`}</h4>
            </div>
          );
        })}
    </div>
  );
}

export default Directory;
