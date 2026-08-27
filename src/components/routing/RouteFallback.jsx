/**
 * Shown while a lazily-loaded route chunk is in flight.
 *
 * Reserves roughly a viewport of height so the footer does not jump up and back
 * down as the page arrives — the fallback prevents layout shift as much as it
 * shows progress.
 */
export default function RouteFallback() {
  return (
    <main className="routeFallback" id="main-content" tabIndex={-1} aria-busy="true">
      <p className="visuallyHidden" role="status">
        Loading page
      </p>
      <span className="routeFallback__bar" aria-hidden="true" />
    </main>
  );
}
