import Head from "next/head";
import { Timer } from "../components/timer.tsx";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ textAlign: "center" }}>
        <Timer />
      </main>
    </div>
  );
}
