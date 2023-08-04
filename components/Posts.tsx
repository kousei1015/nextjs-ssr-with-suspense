import React from "react";
import Link from "next/link";
import Button from "./Button";
import styles from "./../styles/Posts.module.css"

const fetchData = async () => {
  const res = await fetch("http://localhost:3001/v1/posts", {
    cache: "no-cache",
  });
  const result = await res.json();
  return result;
};

export type Post = {
  id: number;
  content: string;
  user_id: number;
  agree_votes: number;
  disagree_votes: number;
};

const Posts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const posts: Post[] = await fetchData();
  return (
      <div>
        {posts.map((post) => {
          return (
            <article key={post.id} className={styles.post}>
              <h2>{post.content}</h2>
              <h3>同意した人の数は現在、{post.agree_votes}人です</h3>
              <h3>反対した人の数は現在、{post.disagree_votes}人です</h3>
              <Button post_id={post.id} />
            </article>
          );
        })}
      </div>
  );
};

export default Posts;
