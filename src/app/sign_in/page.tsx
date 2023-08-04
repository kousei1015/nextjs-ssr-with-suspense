"use client";
import React, { useState } from "react";
import styles from "./../../../styles/Form.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/v1/auth/sign_in",
        {
          email,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      const { uid, client, "access-token": accessToken } = response.headers;
      Cookies.set("client", client);
      Cookies.set("access-token", accessToken);
      Cookies.set("uid", uid);
      router.push("/");
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>ログインフォーム</h2>
      <input
        type="text"
        value={email}
        onChange={handleChangeEmail}
        placeholder="emailを入力してください"
      />
      <input
        type="password"
        value={password}
        onChange={handleChangePassword}
        placeholder="passwordを入力してください"
      />
      <button className={styles.btn} onClick={handleClick}>
        送信する
      </button>
    </div>
  );
};

export default Page;