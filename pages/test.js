// pages/index.js
import React from 'react';

export const runtime = 'edge';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/getItems');
  const items = await res.json();

  return {
    props: {
      items,
    },
  };
}

export default function Home({ items }) {
    console.log(items);
  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}
