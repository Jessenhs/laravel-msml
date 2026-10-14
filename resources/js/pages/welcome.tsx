import { Head } from '@inertiajs/react';

type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
};

export default function Welcome({ movies }: { movies: Movie[] }) {
    return (
        <>
            <Head title="Welcome" />
            <ul>
                {movies.map(m => (
                    <li key={m.id}>
                        <img src={`https://image.tmdb.org/t/p/w200${m.poster_path}`} alt={m.title} />
                        <h2>{m.title}</h2>
                        <p>{m.release_date}</p>
                        <p>{m.overview}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}
