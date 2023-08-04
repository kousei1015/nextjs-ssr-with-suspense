"use client";
import React from "react";
import styles from "./../styles/Button.module.css"
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

const Button = ({
  post_id,
}: {
  post_id: number;
}) => {
  const router = useRouter();


  const agreeFunc = async (post_id: number) => {
    await axios.post(
      "http://localhost:3001/v1/votes",
      { post_id, vote_type: true },
      // 以下のheadersの記述はrails側のdevise auth token というgemを使ってユーザーのログイン、識別するために記述
      {
        headers: {
          client: Cookies.get("client"),
          uid: Cookies.get("uid"),
          "access-token": Cookies.get("access-token"),
        },
      }
    );
    router.refresh();
  };

  const notAgreeFunc = async (post_id: number) => {
    await axios.post(
      "http://localhost:3001/v1/votes",
      { post_id, vote_type: false },
      {
        headers: {
          client: Cookies.get("client"),
          uid: Cookies.get("uid"),
          "access-token": Cookies.get("access-token"),
        },
      }
    );
    router.refresh();
  };

  return (
    <>
      <button onClick={() => agreeFunc(post_id)} className={styles.agreeBtn}>賛成する</button>
      <button onClick={() => notAgreeFunc(post_id)} className={styles.disagreeBtn}>反対する</button>
    </>
  );
};

export default Button;