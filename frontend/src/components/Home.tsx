import type { Artisan, TradeFilter } from "../types";
import { TRADE_FILTERS } from "../data/artisans";
import { ArtisanCard } from "./ArtisanCard";

export function Home({
  artisans,
  filter,
  query,
  setFilter,
  saved,
  toggleSaved,
  goProfile,
  goChat,
}: {
  artisans: Artisan[];
  filter: TradeFilter;
  query: string;
  setFilter: (x: TradeFilter) => void;
  saved: number[];
  toggleSaved: (id: number) => void;
  goProfile: (x: Artisan) => void;
  goChat: (x: Artisan) => void;
}) {
  const empty = artisans.length === 0;
  return (
    <main className="home">
      <section className="intro">
        <p className="eyebrow">TRUSTED LOCAL PROFESSIONALS</p>
        <h1>
          Verified artisans
          <br />
          near you.
        </h1>
        <p>
          Connect with highly-rated professionals for immediate service or a
          carefully planned project.
        </p>
      </section>
      <section className="categories">
        {TRADE_FILTERS.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={filter === item ? "selected" : ""}
          >
            {item}
          </button>
        ))}
      </section>
      <section className="section-heading">
        <div>
          <p className="eyebrow">DISCOVER</p>
          <h2>Ready when you are</h2>
        </div>
        <span>
          {artisans.length}{" "}
          {artisans.length === 1 ? "professional" : "professionals"}
        </span>
      </section>
      {empty ? (
        <p className="explore-empty">
          {query.trim()
            ? "No artisans match that search."
            : `No artisans listed for ${filter} yet.`}
        </p>
      ) : (
        <section className="artisan-grid">
          {artisans.map((artisan) => (
            <ArtisanCard
              key={artisan.id}
              artisan={artisan}
              saved={saved.includes(artisan.id)}
              toggleSaved={toggleSaved}
              goProfile={goProfile}
              goChat={goChat}
            />
          ))}
        </section>
      )}
    </main>
  );
}
