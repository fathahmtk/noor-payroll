'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4">500 - Server Error</h1>
            <p className="text-muted-foreground mb-4">
              Something went wrong. Please try again later.
            </p>
            {error.digest && (
              <p className="text-sm text-muted-foreground mb-4">
                Error ID: {error.digest}
              </p>
            )}
            <button
              onClick={reset}
              className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}