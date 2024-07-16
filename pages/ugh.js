export async function getServerSideProps() {
  const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || 'localhost:3000';

  return {
    props: {
      protocol: protocol,
      host: host,
    },
  };
}

export default function Home({ protocol, host }) {
  return (
    <div>
      <h1>{`${protocol}://${host}/api/getItems`}</h1>
    </div>
  );
}