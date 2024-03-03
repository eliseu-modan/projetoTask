import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import { useService } from "../../../contexts/service";

function completedList() {
  const [data, setData] = useState();
  const [modalVisibleTask, setModalVisibleTask] = useState(false);
  const [dataTasks, setDataTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [dateFinal, setDateFinally] = useState(0);

  const service = useService();

  useEffect(() => {
    getDataConcluided();
  }, []);
  async function getDataConcluided() {
    setLoading(true);
    try {
      const { data } = await service.get("/tasks/auth/getTasksConcluided");
      setDataTasks(data);
      data.forEach((item) => {
        const dateConcluide = item.dataConcluided;
        const dateFinally = item.dateFinally;
        getStatusFromDate(dateConcluide, dateFinally);
      });
      console.log("data", data);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    return `${dia}-${mes}-${ano}`;
  }
  function getStatusFromDate(dataConcluided, dateFinally, dateInitial) {
    dataConcluided = new Date(dataConcluided);
    const finalDate = new Date(dateFinally);
    if (dataConcluided < finalDate) {
      return reaction(0);
    }
    const diffEmMilissegundos = Math.abs(finalDate - dataConcluided);
    const diffEmDias = Math.ceil(diffEmMilissegundos / (1000 * 60 * 60 * 24));
    let reactionType;
    if (diffEmDias <= 5) {
      reactionType = 1;
    } else {
      reactionType = 2;
    }
    return reaction(reactionType);
  }

  function reaction(reactionType) {
    const icon = {
      0: "🎉 Parabéns!! 😊 Tarefa Finalizada no Prazo",
      1: "⏰ Alerta!! 😐 Tarefa Teve um Pequeno Atraso",
      2: "😔 Tarefa Concluída com Atraso ☹️",
    };
    return icon[reactionType];
  }

  const status = getStatusFromDate("2024-03-10", "2024-03-15");
  console.log(status);
  const columns = [
    {
      key: "name",
      dataIndex: "name",
      title: "Nome da Tarefa",
    },
    {
      key: "dateInitial",
      dataIndex: "dateInitial",
      title: "Inicio",
      render: (_, record) => <div>{formatDate(record.dateInitial)}</div>,
    },
    {
      key: "dateFinally",
      dataIndex: "dateFinally",
      title: "Final",
      render: (_, record) => <div>{formatDate(record.dateFinally)}</div>,
    },
    {
      key: "dateFinally",
      dataIndex: "dateFinally",
      title: "Concluido",
      render: (_, record) => <div>{formatDate(record.dataConcluided)}</div>,
    },
    {
      key: "subject",
      dataIndex: "subject",
      title: "Tarefa",
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => openModalTask(record)}>
            Ver Tarefa
          </Button>
        </div>
      ),
    },
    {
      key: "taskConcluided",
      dataIndex: "taskConcluided",
      title: "Status",
      render: (taskConcluided, record) => (
        <div>
          {getStatusFromDate(record.dataConcluided, record.dateFinally)}
        </div>
      ),
    },
  ];

  const openModalTask = (task) => {
    setSelectedTask(task);
    setModalVisibleTask(true);
  };
  const closeModalTask = () => {
    setSelectedTask(null);
    setModalVisibleTask(false);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataTasks}
        rowKey={(taskSelected) => taskSelected.id}
        // loading={loading}
        scroll={{ x: 670 }}
        // {...props}
      />
      <Modal
        visible={modalVisibleTask}
        title="Detalhes da Tarefa :"
        onCancel={closeModalTask}
        footer={null}
      >
        {selectedTask && (
          <div>
            <b>
              <p>{selectedTask.subject}</p>
            </b>
          </div>
        )}
      </Modal>
    </>
  );
}
export default completedList;
