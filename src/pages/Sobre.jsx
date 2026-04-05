export default function Sobre() {
  return (
    <div className="bg-blue-50 flex flex-col min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Sobre</h1>

      <p className="mb-4">
        Aplicativo sem fins lucrativos. Desenvolvido segundo as informações
        adquiridas nas seguintes bibliografias:
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>
          LEWIS, H. SPENCER. F.R.C. Ph. D.. Autodomínio e o Destino com os
          Ciclos da Vida. Revisado e Atualizado. 10ª ed. AMORC - Ordem Rosacruz.
          Curitiba - PR. 2010.
        </li>
        <li>
          MORALES, P. RAÚL. F.R.C. Ritmos Básicos da Vida. 1ª ed. AMORC - Ordem
          Rosacruz. Curitiba - PR. 1996.
        </li>
      </ul>

      <p className="mt-4">
        Direitos Reservados da Ordem Rosacruz AMORC - Antiga e Mística Ordem
        Rosae Crucis. Jurisdição da Língua Portuguesa.{" "}
      </p>
    </div>
  );
}
