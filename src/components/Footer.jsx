export default function Footer() {
  return (
    <div>
      {/* FOOTER */}
      <footer className="bg-blue-100">
        <div className="max-w-5xl mx-auto p-4 text-center text-sm text-black-200">
          Desenvolvido por{" "}
          <a
            href="https://devsprosolution.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            DevsPro Solution
          </a>{" "}
          © {new Date().getFullYear()}
        </div>

        <p className="mt-2">
          <a href="/privacidade" className="hover:underline text-blue-500">
            Política de Privacidade
          </a>
        </p>
      </footer>
    </div>
  );
}
