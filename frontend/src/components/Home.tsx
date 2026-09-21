import type { Artisan } from "../types";
import { ArtisanCard } from "./ArtisanCard";

const CATEGORIES = [
  "All Trades",
  "Carpentry",
  "Welding",
  "Plumbing",
  "Electrical",
  "Shoemaking",
];

export function Home({
  artisans,
  filter,
  setFilter,
  saved,
  toggleSaved,
  goProfile,
  goChat,
}: {
  artisans: Artisan[];
  filter: string;
  setFilter: (x: string) => void;
  saved: number[];
  toggleSaved: (id: number) => void;
  goProfile: (x: Artisan) => void;
  goChat: (x: Artisan) => void;
}) {
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
        {CATEGORIES.map((x) => (
          <button
            key={x}
            onClick={() => setFilter(x)}
            className={filter === x ? "selected" : ""}
          >
            {x}
          </button>
        ))}
      </section>
      <section className="section-heading">
        <div>
          <p className="eyebrow">DISCOVER</p>
          <h2>Ready when you are</h2>
        </div>
        <span>{artisans.length} professionals</span>
      </section>
      <section className="artisan-grid">
        {artisans.map((a) => (
          <ArtisanCard
            key={a.id}
            artisan={a}
            saved={saved.includes(a.id)}
            toggleSaved={toggleSaved}
            goProfile={goProfile}
            goChat={goChat}
          />
        ))}
      </section>
    </main>
  );
}
