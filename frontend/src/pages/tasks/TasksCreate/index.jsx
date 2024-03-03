/**
 *
 * EmployeesCreate Page
 *
 */

import withContext from "../../../contexts/withContexts";
import { SaveOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Row, message } from "antd";
import { useEffect, useState } from "react";
import { PageEventsProvider } from "../../../contexts";
import { useParams } from "react-router-dom";
import { useService } from "../../../contexts/service";
import { EmployeesGeneralForm } from "../../../components/tasks";

function EmployeesCreatePage({ route, ...props }) {
  const service = useService();
  const { employeeId } = useParams();
  // const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState();

  return (
    <>
      <EmployeesGeneralForm></EmployeesGeneralForm>
    </>
  );
}

export default withContext(PageEventsProvider)(EmployeesCreatePage);
