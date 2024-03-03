import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Row, Col, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useService } from "../../../contexts/service";
const PermanentsLists = () => {
  const [loading, setLoading] = useState(false);
  const service = useService();
  const [dataPermanents, setDataPermanents] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    getTasksPermanents();
  }, []);

  async function getTasksPermanents() {
    try {
      setLoading(true);

      const { data } = await service.get("tasks/auth/getTasksPermanent");
      console.log("data", data);
      setDataPermanents(data);
    } catch (error) {
      console.log(error);
    }
  }
  const openModalTask = (task) => {
    setSelectedTask(task);

    setModalVisible(true);
  };
  const columns = [
    { key: "name", dataIndex: "name", title: "Nome da Tarefa" },
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
      key: "action",
      title: "Ação",
      align: "center",
      render: (taskSelected) => (
        <Row justify="left" gutter={24}>
          <Col>
            <Button
              icon={<EditOutlined />}
              type="link"
              style={{ position: "relative", top: "0px", left: "0%" }}
              onClick={() => {
                handleEditClick(taskSelected);
              }}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => {
                removeConfirm(taskSelected);
              }}
            />
          </Col>
        </Row>
      ),
    },
  ];
  const closeModalTask = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };

  return (
    <>
      <div>
        <Table columns={columns} dataSource={dataPermanents}></Table>
        <Modal
          visible={modalVisible}
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
      </div>
    </>
  );
};

export default PermanentsLists;
