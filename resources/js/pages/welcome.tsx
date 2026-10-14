import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Welcome() {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem('favorites')) || []);
    }, []);

    useEffect(() => {
        if (showFavorites) {
            Promise.all(favorites.map(id => fetch('/api/movies/' + id).then(res => res.json()).then(data => data.data)))
                .then(data => setMovies(data));

            return;
        }

        const timer = setTimeout(() => {
            const url = search ? '/api/movies/search?q=' + encodeURIComponent(search) : '/api/movies/popular';

            fetch(url)
                .then(res => res.json())
                .then(data => setMovies(data.data));
        }, 300);

        return () => clearTimeout(timer);
    }, [search, showFavorites]);

    function toggleFavorite(id) {
        const newFavorites = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];

        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    const shownMovies = showFavorites ? movies.filter(m => favorites.includes(m.id)) : movies;

    return (
        <>
            <Head title="Movies" />

            <div className="min-h-screen bg-gray-900 text-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">Film Zoeker</h1>

                    <div className="mb-8 flex flex-col sm:flex-row gap-2">
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Zoek een film..."
                            disabled={showFavorites}
                            className="w-full sm:max-w-md px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50"
                        />
                        <button
                            onClick={() => setShowFavorites(!showFavorites)}
                            className={'px-4 py-2 rounded ' + (showFavorites ? 'bg-blue-600' : 'bg-gray-800')}
                        >
                            {showFavorites ? 'Alle films' : '❤️ Alleen favorieten'}
                        </button>
                    </div>

                    {shownMovies.length === 0 && <p className="text-gray-400">Geen films gevonden.</p>}

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
                        {shownMovies.map(m => (
                            <Link key={m.id} href={'/movies/' + m.id} className="relative flex flex-col bg-gray-800 rounded overflow-hidden">
                                <button
                                    onClick={e => { e.preventDefault(); toggleFavorite(m.id); }}
                                    className="absolute top-2 right-2 w-9 h-9 rounded-full bg-gray-900/70 text-lg"
                                >
                                    {favorites.includes(m.id) ? '❤️' : '🤍'}
                                </button>
                                {m.poster_url ? (
                                    <img src={m.poster_url} alt={m.title} loading="lazy" className="w-full aspect-[2/3] object-cover" />
                                ) : (
                                    <div className="w-full aspect-[2/3] flex items-center justify-center bg-gray-700 text-gray-400 text-sm">Geen poster</div>
                                )}
                                <div className="p-3 sm:p-4">
                                    <h2 className="font-bold text-sm sm:text-lg break-words">{m.title}</h2>
                                    <p className="text-gray-400 text-xs sm:text-sm">{m.release_date}</p>
                                    <p className="hidden sm:block text-gray-400 text-sm mt-2 line-clamp-3">{m.overview}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
