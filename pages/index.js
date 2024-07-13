import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Assignment Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <style jsx>{`
          td, th {
            border: 1px solid black;
          }
          table {
            border-collapse: collapse;
          }
        `}</style>        <h1>Assignment Tracker</h1>
        <table>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Link</th>
            <th>Due Date</th>
            <th>Time Estimate</th>
            <th>Done</th>
            <th>Overdue</th>
          </tr>
          <tr>
            <td>Assignment 1</td>
            <td>Assignment 1</td>
            <td>Assignment 1</td>
            <td>Assignment 1</td>
            <td>Assignment 1</td>
            <td>Assignment 1</td>
            <td>Assignment 1</td>
          </tr>
        </table>
      </body>
    </>
  );
}
