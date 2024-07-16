// pages/index.js
export async function getServerSideProps() {
  const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
  const host = process.env.VERCELPROJECT_PRODUCTION_URL || 'localhost:3000';
  const res = await fetch(`${protocol}://${host}/api/getItems`);
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
