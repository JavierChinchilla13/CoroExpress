export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bottom-0 bg-gray-200 text-gray-600 py-4 flex justify-center items-center w-full h-fit align-bottom">
      <p className="text-sm font-medium">
        © {currentYear} Coro Express, Todos los derechos reservados.
      </p>
    </footer>
  );
}
