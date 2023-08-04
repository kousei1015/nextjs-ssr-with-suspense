import React, { Suspense } from "react";
import Link from "next/link";
import styles from "./page.module.css"
import Posts from "../../components/Posts";
const Page = () => {
  return (
    <div className={styles.wrapper}>
      <h2>投票アプリ</h2>

      <div className={styles.links}>
        <Link href="/sign_in">ログインフォームへ</Link>
        <Link href="/sign_up">新規登録フォームへ</Link>
        <Link href="/create">新しい質問を投稿</Link>
      </div>
      <Suspense fallback={<h2>Now Loading...</h2>}>
        {/* @ts-expect-error Server Component */}
        <Posts />
      </Suspense>
    </div>
  );
};

export default Page;
