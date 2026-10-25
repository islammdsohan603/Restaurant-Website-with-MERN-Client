"use client";

import "./testimonials.css";

type Testimonial = {
  id: number;
  name: string;
  initials: string;
  role: string;
  review: string;
  featured?: boolean;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Lord Rupert Sterling",
    initials: "LR",
    role: "FOOD & WINE UK · VERIFIED",
    review:
      "The Italian sea bass is an absolute revelation. Subtle smoke, perfect tenderness, and the Crétan olive pairing elevated it into Michelin three-star territory.",
  },
  {
    id: 2,
    name: "Claire Vance",
    initials: "CV",
    role: "ANNIVERSARY CELEBRATION",
    review:
      "Chef Arnaud Dubois has delivered London's most atmospheric dining room. The Chef's Counter felt intimate, educational, and deeply theatrical.",
    featured: true,
  },
  {
    id: 3,
    name: "Dr. Marcus Keller",
    initials: "MK",
    role: "EPICUREAN SOCIETY MEMBER",
    review:
      "The wine curation by sommelier Matteo is immaculate. Each course's temperature, vintage, and backstory were executed without flaw.",
  },
  {
    id: 4,
    name: "Eleanor Whitmore",
    initials: "EW",
    role: "PRIVATE DINING GUEST",
    review:
      "An unforgettable evening. Every detail, from the candlelit atmosphere to the extraordinary service, felt effortlessly elegant.",
  },
  {
    id: 5,
    name: "James Harrington",
    initials: "JH",
    role: "RETURNING GUEST",
    review:
      "A remarkable restaurant with exceptional flavours. The seasonal menu makes every visit feel like an entirely new experience.",
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article
      className={`testimonial-card ${
        testimonial.featured ? "testimonial-card-featured" : ""
      }`}
    >
      {testimonial.featured && (
        <span className="testimonial-badge">EDITOR'S CHOICE</span>
      )}

      <div className="testimonial-stars" aria-label="5 out of 5 stars">
        ★★★★★
      </div>

      <blockquote className="testimonial-review">
        "{testimonial.review}"
      </blockquote>

      <div className="testimonial-divider" />

      <div className="testimonial-author">
        <div className="testimonial-avatar">{testimonial.initials}</div>

        <div className="testimonial-author-info">
          <h3>{testimonial.name}</h3>
          <p>{testimonial.role}</p>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      className="testimonials-section"
      aria-labelledby="testimonials-heading"
    >
      <div className="testimonials-heading">
        <span className="testimonials-eyebrow">CRITICAL ACCLAIM</span>

        <h2 id="testimonials-heading">An Experience Worth Returning For</h2>
      </div>

      <div className="testimonial-marquee" aria-label="Guest testimonials">
        <div className="testimonial-track">
          {/* First set */}
          <div className="testimonial-group">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Duplicate set for seamless infinite animation */}
          <div className="testimonial-group" aria-hidden="true">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={`duplicate-${testimonial.id}`}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
