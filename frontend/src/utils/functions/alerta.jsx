import React, { useState, useEffect } from "react";
import { Alert } from "antd"; // Importe o componente de alerta do Ant Design ou qualquer outro componente que você esteja usando

const AlertaComIntervalo = ({ mensagem, descricao, tipo, intervalo }) => {
  const [exibirAlerta, setExibirAlerta] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExibirAlerta(false);
    }, intervalo);

    return () => clearTimeout(timer);
  }, [intervalo]);

  return (
    <>
      {exibirAlerta && (
        <Alert message={mensagem} description={descricao} type={tipo} />
      )}
    </>
  );
};

export default AlertaComIntervalo;
