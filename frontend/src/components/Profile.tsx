import type { Artisan } from "../types";
import { Icon } from "./Icon";

export function Profile({
  artisan,
  saved,
  toggleSaved,
  goChat,
  back,
}: {
  artisan: Artisan;
  saved: boolean;
  toggleSaved: () => void;
  goChat: () => void;
  back: () => void;
}) {
  return (
    <main className="profile">
      <div className="crumb">
        <button onClick={back}>
          <Icon>arrow_back</Icon> Explore
        </button>
        <span> / {artisan.trade}</span>
      </div>
      <section className="profile-hero">
        <div className="portrait">
          <img src={artisan.image} alt={artisan.name} />
          <span className="verified">
            <Icon>verified</Icon>
          </span>
        </div>
        <div className="profile-details">
          <p className="eyebrow">
            {artisan.trade} · {artisan.location.toUpperCase()}
          </p>
          <h1>{artisan.name}</h1>
          <div className="profile-rating">
            <span>
              <Icon>star</Icon> {artisan.rating}
            </span>
            <span>{artisan.reviews} client reviews</span>
            <span className="available">
              <i /> Available today
            </span>
          </div>
          <p>
            Known for careful craftsmanship, clear communication and reliable
            project delivery across Lagos.
          </p>
          <div className="actions">
            <button className="primary" onClick={goChat}>
              <Icon>chat</Icon> Start a conversation
            </button>
            <button
              className={saved ? "outline saved" : "outline"}
              onClick={toggleSaved}
            >
              <Icon>favorite</Icon> {saved ? "Saved" : "Save artisan"}
            </button>
          </div>
        </div>
        <aside className="service-card">
          <Icon>verified_user</Icon>
          <div>
            <b>Identity verified</b>
            <p>Member since 2021</p>
          </div>
          <hr />
          <span>
            Usually responds in <b>15 min</b>
          </span>
        </aside>
      </section>
      <section className="profile-grid">
        <div>
          <p className="eyebrow">PORTFOLIO</p>
          <h2>Made with care.</h2>
          <div className="work-grid">
            <img src={artisan.work} alt="Completed artisan project" />
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=85"
              alt="Finished interior work"
            />
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85"
              alt="Crafted furniture"
            />
          </div>
        </div>
        <aside className="review-card">
          <div className="review-head">
            <div>
              <p className="eyebrow">CLIENT REVIEWS</p>
              <h2>Excellent work.</h2>
            </div>
            <b>
              <Icon>star</Icon> {artisan.rating}
            </b>
          </div>
          <blockquote>
            “Professional from start to finish. The quality exceeded what I
            imagined and everything was delivered right on schedule.”
          </blockquote>
          <p>— Mrs. Adebayo, Ikoyi</p>
          <button>
            Read all {artisan.reviews} reviews <Icon>arrow_forward</Icon>
          </button>
        </aside>
      </section>
    </main>
  );
}
