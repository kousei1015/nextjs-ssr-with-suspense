SSR(サーバーサイドレンダリング)で開発する際、Suspenseを併用するとユーザー体験がよくなると聞いたので試してみました。以前RailsのAPIモードで作った、投票アプリのAPIデータを活用してSSRでアプリを作りました。

## 試したこと
以下はバックエンドのAPIデータをフェッチするコンポーネントです。
```
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

```

重要なのは
```
await new Promise((resolve) => setTimeout(resolve, 5000));
```
こちらの記述です。これによりデータをフェッチまでに5秒以上かかるようになりました。

# Suspenseを使わない場合
Suspenseを使わない場合、サーバー側はクライアント(またはブラウザ)に返却するHTMLファイルを作成するのに5秒以上かかります。言い換えると、クライアントは5秒以上何も表示されない状態が続きます。

# Suspenseを使う場合
Suspenseを使って上記のコンポーネントをこのように囲みます。
```
<Suspense fallback={<h2>Now Loading...</h2>}>
    {/* @ts-expect-error Server Component */}
    <Posts />
</Suspense>
```

このように記述することで、上記のようにデータのフェッチに時間がかかるコンポーネントの箇所は「Now Loading...」という表示が出て、5秒以上経つ前にHTMLファイルが返されます。今回の場合、具体的にはこんな感じで表示されます。
![ローディング画面](./public/loadingScreen.png)
つまり、Suspenseを使わない場合と比べると、何も表示されない状態の時間が圧倒的に短くて済み、UXが高まります。

## まとめ
SSRとSuspenseを活用することでユーザーにコンテンツを早く届けることができるということが分かりました。ユーザーは、何も表示されない時間が長いとそのサイトから離脱することも多いため、Suspenseは場合によってはかなり役立つかもしれませんね。