// app/levels/[id]/[slug]/not-found.tsx

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
            <h1 className="text-6xl font-bold text-yellow-500 mb-4">404</h1>
            <p className="text-lg text-gray-700 mb-6">
                La información que busca no está disponible.
            </p>
            <a
                href="/"
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
            >
                Volver al inicio
            </a>
        </div>
    );
}
