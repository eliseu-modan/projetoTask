/**
 *
 * UsersFilter Component
 *
 */

import { Button, Col, Form, Input, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FormItem } from "../../_commons";
import { usePageEvents } from "../../../contexts/pageEvents";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks";

function UsersFilter({ onCreate }) {
  const { onChangeFilter } = usePageEvents();
  const [fieldValues, setFieldValues] = useState();
  const valuesDebounced = useDebounce(fieldValues);

  useEffect(() => {
    if (valuesDebounced) {
      onChangeFilter(valuesDebounced);
    }
  }, [valuesDebounced]);

  function onValuesChange(_, values) {
    setFieldValues({ ...fieldValues, ...values });
  }

  return (
    <Form onValuesChange={onValuesChange} size="large">
      <Row justify="space-between" gutter={[24, 24]}>
        <Col span={24} md={9} lg={7}>
          <FormItem noMargin label="Pesquisar Usuario" name="search">
            <Input.Search />
          </FormItem>
        </Col>
        <Col>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={onCreate}
            className="width-100"
          >
            Criar Usuario
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default UsersFilter;
