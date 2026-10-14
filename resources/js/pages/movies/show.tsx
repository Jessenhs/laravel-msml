import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Show({ id }) {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch('/api/movies/' + id)
            .then(res => res.json())
            .then(data => setMovie(data.data));
    }, [id]);

    return (
        <>
            <Head title={movie ? movie.title : 'Film'} />

            <div className="min-h-screen bg-gray-900 text-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    <Link href="/" className="inline-block mb-6 text-blue-400 hover:text-blue-300">&larr; Terug</Link>

                    {!movie && <p className="text-gray-400">Laden...</p>}

                    {movie && (
                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 bg-gray-800 rounded overflow-hidden">
                            {movie.poster_url ? (
                                <img src={movie.poster_url} alt={movie.title} className="w-full sm:w-72 aspect-[2/3] object-cover" />
                            ) : (
                                <div className="w-full sm:w-72 aspect-[2/3] flex items-center justify-center bg-gray-700 text-gray-400 text-sm">Geen poster</div>
                            )}

                            <div className="p-4 sm:p-6">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words">{movie.title}</h1>
                                <p className="text-gray-400 text-xs sm:text-sm mt-2">{movie.release_date} · {movie.runtime} min · ★ {movie.vote_average}</p>
                                <p className="text-gray-400 text-sm sm:text-base mt-6">{movie.overview}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
