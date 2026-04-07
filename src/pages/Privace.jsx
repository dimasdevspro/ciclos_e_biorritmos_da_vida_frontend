export default function Privacidade() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">Política de Privacidade</h1>

      <p className="mb-3">
        Este aplicativo coleta apenas os dados informados pelo usuário (nome e
        data de nascimento) com a finalidade exclusiva de cálculo de biorritmos.
      </p>

      <p className="mb-3">
        Nenhum dado pessoal é armazenado em banco de dados, compartilhado com
        terceiros ou utilizado para fins comerciais ou de marketing.
      </p>

      <p className="mb-3">
        Os dados são utilizados apenas durante a sessão ativa e descartados após
        o uso.
      </p>

      <p className="mb-3">
        Este aplicativo pode utilizar serviços externos para exibição de dados
        astronômicos, que não recebem informações pessoais do usuário.
      </p>

      <p className="mb-3">
        Ao utilizar este aplicativo, você concorda com o uso dos dados conforme
        descrito nesta política.
      </p>

      <p className="mt-6 text-gray-500">
        Última atualização: {new Date().toLocaleDateString("pt-BR")}
      </p>
    </div>
  );
}
