import type { Artisan } from "../types";
import { Icon } from "./Icon";

export function ArtisanCard({
  artisan,
  saved,
  toggleSaved,
  goProfile,
  goChat,
}: {
  artisan: Artisan;
  saved: boolean;
  toggleSaved: (id: number) => void;
  goProfile: (x: Artisan) => void;
  goChat: (x: Artisan) => void;
}) {
  return (
    <article className="artisan-card">
      <button className="photo" onClick={() => goProfile(artisan)}>
        <img src={artisan.image} alt={artisan.name} />
        <span className="rating">
          <Icon>star</Icon>
          {artisan.rating}
        </span>
        <span className="online-dot" />
      </button>
      <div className="card-copy">
        <div className="card-title">
          <div>
            <h3>{artisan.name}</h3>
            <p>{artisan.trade}</p>
          </div>
          <button
            className={saved ? "save saved" : "save"}
            aria-label={saved ? `Unsave ${artisan.name}` : `Save ${artisan.name}`}
            onClick={() => toggleSaved(artisan.id)}
          >
            <Icon>favorite</Icon>
          </button>
        </div>
        <p className="place">
          <Icon>location_on</Icon>
          {artisan.location}, Lagos
        </p>
        <div className="card-bottom">
          <span>{artisan.reviews} reviews</span>
          <button onClick={() => goChat(artisan)}>
            Chat <Icon>arrow_forward</Icon>
          </button>
        </div>
      </div>
    </article>
  );
}
