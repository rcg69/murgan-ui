import Link from "next/link";
import "../styles/FeaturedProducts.css";

const collections = [
  {
    title: "THE ART OF STILLNESS",
    image:
"/bhagi.jpg",
    size: "large",
  },
  {
    title: "ELEGANT GRACE",
    image:
     "/k2.png",
    size: "large",
  },
  {
    title: "ESSENTIAL SILHOUETTE",
    image:
      "https://imgs.search.brave.com/pRhyLTzhwiRNyWxCtkWh_KBSehHL3e-yZw1BVCzRbmU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW5kaWFoZXJhbGQu/Y29tL0ltYWdlU3Rv/cmUvaW1hZ2VzL21v/dmllcy9tb3ZpZXMt/YWN0cmVzcy9LYWph/bC1BZ2dhcndhbC1p/bi1OZW5lLVJhanUt/TmVuZS1NYW50cmkt/TGF0ZXN0LVN0aWxs/czcuanBn",
    size: "small",
  },
  {
    title: "MODERN FORM",
    image:
      "https://imgs.search.brave.com/XIrghyN_2fqin5jHUtFoKaOwSNWoK_8SRoawGN8d0cw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaGVyemluZGFn/aS5pbmZvL2ltYWdl/LzIwMjQvQXVnL1No/cmFkZGhhLUthcG9v/cnMtUmVkLUJhbmFy/YXNpLVNhcmVlLnBu/Zw",
    size: "small",
  },
  {
    title: "MINIMAL STATEMENT",
    image:
      "https://imgs.search.brave.com/e765dEfx-DzLhnWmVHn5c0rsj7F57THMJEzOjlpB-Ic/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Z3VsdGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI2LzA2/LzEwMDA0ODE0NDEt/NzY4eDEwMjQuanBn",
    size: "small",
  },
  {
    title: "TIMELESS WARE",
    image:
      "https://imgs.search.brave.com/mr2JOuOL-jOIEo5XV3Wo8p3PJrKWWJt1OeKPF05V_hs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZmlsbWliZWF0/LmNvbS9waC1iaWcv/MjAyNi8wNC9hY3Ry/ZXNzLXNhbWFudGhh/LXJlY2VudC1zdHVu/bmluZy1iZWF1dGlm/dWwtc2FyZWUtcGhv/dG9zLXdpdGgtbG90/dXMxNzc2NTgwODQw/XzYuanBn",
    size: "small",
  },
];

export default function FeaturedProducts({ products }) {
  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2>Featured Collection</h2>
      </div>

      <div className="featured-grid">
        {collections.map((item) => (
          <div
            className={`featured-item ${
              item.size === "large" ? "large" : ""
            }`}
            key={item.title}
          >
            <Link href="/products">
              <img
                src={item.image}
                alt={item.title}
                className="cursor-pointer"
              />
            </Link>

            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}