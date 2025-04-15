const stores = [
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    link: "https://www.amazon.com",
  },
  {
    name: "Nike",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    link: "https://www.nike.com",
  },
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    link: "https://www.apple.com",
  },
  {
    name: "Adidas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    link: "https://www.adidas.com",
  },
  {
    name: "eBay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
    link: "https://www.ebay.com",
  },
  {
    name: "AliExpress",
    logo: "https://aeropost.com/_vercel/image?url=%2Fimages%2FnewHomepage%2Fstores%2Fbrands%2Faliexpress.webp&w=1536&q=80",
    link: "https://www.aliexpress.com",
  },
  {
    name: "Mango",
    logo: "https://aeropost.com/_vercel/image?url=%2Fimages%2FnewHomepage%2Fstores%2Fbrands%2FMango.webp&w=1536&q=80",
    link: "https://shop.mango.com",
  },
  {
    name: "Shark",
    logo: "https://aeropost.com/_vercel/image?url=%2Fimages%2FnewHomepage%2Fstores%2Fbrands%2Fshark.webp&w=1536&q=80",
    link: "https://www.sharkclean.com",
  },
  {
    name: "Baseus",
    logo: "https://aeropost.com/_vercel/image?url=%2Fimages%2FnewHomepage%2Fstores%2Fbrands%2Fbaseus.webp&w=1536&q=80",
    link: "https://www.baseus.com",
  },
  {
    name: "TEMU",
    logo: "https://aeropost.com/_vercel/image?url=%2Fimages%2FnewHomepage%2Fstores%2Fbrands%2Ftemu.webp&w=1536&q=80",
    link: "https://www.temu.com",
  },
  {
    name: "Eufy",
    logo: "https://aeropost.com/_vercel/image?url=%2Fimages%2FnewHomepage%2Fstores%2Fbrands%2Feufy.webp&w=1536&q=80",
    link: "https://www.eufylife.com",
  },
  {
    name: "Sonos",
    logo: "https://aeropost.com/_vercel/image?url=%2Fimages%2FnewHomepage%2Fstores%2Fbrands%2Fsonos.webp&w=1536&q=80",
    link: "https://www.sonos.com",
  },
  {
    name: "Anker",
    logo: "https://aeropost.com/_vercel/image?url=%2Fimages%2FnewHomepage%2Fstores%2Fbrands%2FAnker.webp&w=1536&q=80",
    link: "https://www.anker.com",
  },
  {
    name: "TP-Link",
    logo: "https://aeropost.com/_vercel/image?url=%2Fimages%2FnewHomepage%2Fstores%2Fbrands%2FTPLINK.webp&w=1536&q=80",
    link: "https://www.tp-link.com",
  },
  {
    name: "Jabra",
    logo: "https://aeropost.com/_vercel/image?url=%2Fimages%2FnewHomepage%2Fstores%2Fbrands%2FJabra.webp&w=1536&q=80",
    link: "https://www.jabra.com",
  },
  {
    name: "Targus",
    logo: "https://aeropost.com/_vercel/image?url=%2Fimages%2FnewHomepage%2Fstores%2Fbrands%2Ftargus.webp&w=1536&q=80",
    link: "https://www.targus.com",
  },
  {
    name: "Hurley",
    logo: "https://aeropost.com/_vercel/image?url=%2Fimages%2FnewHomepage%2Fstores%2Fbrands%2FHurley.webp&w=1536&q=80",
    link: "https://www.hurley.com",
  },
  {
    name: "ADOR",
    logo: "https://aeropost.com/_vercel/image?url=%2Fimages%2FnewHomepage%2Fstores%2Fbrands%2Fador.webp&w=1536&q=80",
    link: "https://ador.world/",
  },
  {
    name: "KicksCrew",
    logo: "https://aeropost.com/_vercel/image?url=%2Fimages%2FnewHomepage%2Fstores%2Fbrands%2FKICKSCREW.webp&w=1536&q=80",
    link: "https://www.kickscrew.com",
  },
  {
    name: "LETbricks",
    logo: "https://aeropost.com/_vercel/image?url=%2Fimages%2FnewHomepage%2Fstores%2Fbrands%2Fletbricks.webp&w=1536&q=80",
    link: "https://www.letbricks.com",
  },
  {
    name: "13 Deals",
    logo: "https://aeropost.com/_vercel/image?url=%2Fimages%2FnewHomepage%2Fstores%2Fbrands%2F13deals.webp&w=1536&q=80",
    link: "https://www.13deals.com",
  },
];

const biggerLogos = [
  "AliExpress",
  "Mango",
  "Shark",
  "Baseus",
  "TEMU",
  "Eufy",
  "Sonos",
  "Anker",
  "TP-Link",
  "Jabra",
  "Targus",
  "Hurley",
  "ADOR",
  "KicksCrew",
  "LETbricks",
  "13 Deals",
];

export default function LogoCloud() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Compra en tus tiendas favoritas
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6">
          {stores.map((store) => {
            const isBigLogo = biggerLogos.includes(store.name);
            // Asignar tamaño mayor si el logo se debe mostrar grande
            const imgClass = isBigLogo
              ? "h-16 max-w-[120px] object-contain"
              : "h-10 max-w-[120px] object-contain";

            return (
              <a
                key={store.name}
                href={store.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75 transition bg-white rounded-lg shadow p-4 flex items-center justify-center"
              >
                <img src={store.logo} alt={store.name} className={imgClass} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
