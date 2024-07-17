import { useState } from 'react';
import { queryDb } from '@/lib/queryDb';

export default function MyComponent() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await queryDb(query);
      setResult(response);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch items');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query"
        />
        <button type="submit">Submit</button>
      </form>
      {result && <pre>{JSON.stringify(result.results, 0, ' ')}</pre>}
      {error && <div>{error}</div>}
    </div>
  );
}
