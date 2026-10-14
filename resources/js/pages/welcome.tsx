import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Welcome({ movies, query }) {
    const [search, setSearch] = useState(query || '');

    return (
        <>
            <Head title="Movies" />

            <div className="min-h-screen bg-gray-900 text-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">Film Zoeker</h1>

                    <form onSubmit={e => { e.preventDefault(); router.get('/search', { q: search }); }} className="mb-8 flex flex-col sm:flex-row gap-2 w-full sm:max-w-md">
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Zoek een film..."
                            className="flex-1 min-w-0 px-4 py-2 rounded bg-gray-800 text-white"
                        />
                        <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Zoeken</button>
                    </form>

                    {movies.length === 0 && <p className="text-gray-400">Geen films gevonden.</p>}

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
                        {movies.map(m => (
                            <div key={m.id} className="flex flex-col bg-gray-800 rounded overflow-hidden">
                                {m.poster_path ? (
                                    <img src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt={m.title} loading="lazy" className="w-full aspect-[2/3] object-cover" />
                                ) : (
                                    <div className="w-full aspect-[2/3] flex items-center justify-center bg-gray-700 text-gray-400 text-sm">Geen poster</div>
                                )}
                                <div className="p-3 sm:p-4">
                                    <h2 className="font-bold text-sm sm:text-lg break-words">{m.title}</h2>
                                    <p className="text-gray-400 text-xs sm:text-sm">{m.release_date}</p>
                                    <p className="hidden sm:block text-gray-400 text-sm mt-2 line-clamp-3">{m.overview}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
