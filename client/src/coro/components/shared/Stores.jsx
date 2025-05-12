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
    name: "ADOR",
    logo: "https://aeropost.com/_vercel/image?url=%2Fimages%2FnewHomepage%2Fstores%2Fbrands%2Fador.webp&w=1536&q=80",
    link: "https://ador.world/",
  },
  {
    name: "Shein USA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Shein_Logo_2017.svg/250px-Shein_Logo_2017.svg.png",
    link: "https://us.shein.com",
  },
  {
    name: "Columbia USA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Columbia_Sportswear_Co_logo.svg/250px-Columbia_Sportswear_Co_logo.svg.png",
    link: "https://www.columbia.com",
  },
  {
    name: "Sephora",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Sephora_logo.svg/250px-Sephora_logo.svg.png",
    link: "https://www.sephora.com",
  },
  {
    name: "StockX",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/StockX_logo.svg/250px-StockX_logo.svg.png",
    link: "https://stockx.com",
  },
  {
    name: "New Balance",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/250px-New_Balance_logo.svg.png",
    link: "https://www.newbalance.com",
  },
  {
    name: "Lego",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/250px-LEGO_logo.svg.png",
    link: "https://www.lego.com",
  },
  {
    name: "Forever 21",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Forever_21_logo.svg/250px-Forever_21_logo.svg.png",
    link: "https://www.forever21.com",
  },
  {
    name: "Carter’s",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Carter%27s_logo.svg/250px-Carter%27s_logo.svg.png",
    link: "https://www.carters.com",
  },
  {
    name: "GAP",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Gap_logo.svg/480px-Gap_logo.svg.png",
    link: "https://www.gap.com",
  },
  {
    name: "Disney Shop",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Disney_Store_logo.svg/250px-Disney_Store_logo.svg.png",
    link: "https://www.shopdisney.com",
  },
];

const biggerLogos = [
  "AliExpress",
  "Mango",
  "Baseus",
  "TEMU",
  "ADOR",
  "GAP",
  "Disney Shop",
];

export default function LogoCloud() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Compra en tus tiendas favoritas
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6">
          {stores.map((store) => {
            const isBigLogo = biggerLogos.includes(store.name);
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
