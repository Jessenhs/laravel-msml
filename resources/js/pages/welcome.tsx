import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Welcome({ movies, query }) {
    const [search, setSearch] = useState(query || '');

    return (
        <>
            <Head title="Movies" />

            <form onSubmit={e => { e.preventDefault(); router.get('/search', { q: search }); }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Zoek een film..." />
                <button>Zoeken</button>
            </form>

            {movies.length === 0 && <p>Geen films gevonden.</p>}

            {movies.map(m => (
                <div key={m.id}>
                    <h2>{m.title}</h2>
                    <p>{m.overview}</p>
                    <img src={`https://image.tmdb.org/t/p/w200${m.poster_path}`} />
                </div>
            ))}
        </>
    );
}
