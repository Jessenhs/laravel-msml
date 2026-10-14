import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Welcome({ movies, query }) {
    const [search, setSearch] = useState(query || '');

    return (
        <>
            <Head title="Movies" />

            <div className="min-h-screen bg-gray-900 text-white p-8">
                <h1 className="text-3xl font-bold mb-6">Film Zoeker</h1>

                <form onSubmit={e => { e.preventDefault(); router.get('/search', { q: search }); }} className="mb-8 flex gap-2">
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Zoek een film..."
                        className="px-4 py-2 rounded bg-gray-800 text-white w-64"
                    />
                    <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Zoeken</button>
                </form>

                {movies.length === 0 && <p className="text-gray-400">Geen films gevonden.</p>}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {movies.map(m => (
                        <div key={m.id} className="bg-gray-800 rounded overflow-hidden">
                            <img src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} className="w-full" />
                            <div className="p-4">
                                <h2 className="font-bold text-lg">{m.title}</h2>
                                <p className="text-gray-400 text-sm">{m.release_date}</p>
                                <p className="text-gray-400 text-sm mt-2 line-clamp-3">{m.overview}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
