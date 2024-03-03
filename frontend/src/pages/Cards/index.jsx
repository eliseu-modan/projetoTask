/**
 *
 * Cards Page
 *
 */

import { Card, Modal } from "antd";
import { CardsFilter, CardsForm, CardsList } from "../../components/Users";
import withContext from "../../contexts/withContexts";
import { useState } from "react";
import { PageEventsProvider } from "../../contexts";
import { usePageEvents } from "../../contexts/pageEvents";

function CardsPage({ route, ...props }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const { setReloadList } = usePageEvents();

  function toggleModal() {
    if (modalVisible) {
      setSelectedCard(undefined);
    }
    setModalVisible(!modalVisible);
  }

  function onEdit(card) {
    setSelectedCard(card);
    toggleModal();
  }

  function onSuccess() {
    toggleModal();
    setReloadList();
  }

  return (
    <Card className="container">
      <div className="margin-bottom">
        <CardsFilter onCreate={toggleModal} />
      </div>

      <CardsList onEdit={onEdit} />

      <Modal
        className="fullscreen-mobile"
        open={modalVisible}
        onCancel={toggleModal}
        destroyOnClose
        title={!!selectedCard ? "Editar Usuario" : "Adicionar Usuario"}
        footer={null}
      >
        {modalVisible && (
          <CardsForm
            onSuccess={onSuccess}
            card={selectedCard}
            isEditMode={!!selectedCard}
            visible={modalVisible}
          />
        )}
      </Modal>
    </Card>
  );
}

export default withContext(PageEventsProvider)(CardsPage);
