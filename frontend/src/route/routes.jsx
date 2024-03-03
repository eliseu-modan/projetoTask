import {
  UserOutlined,
  IdcardOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { EmployeesListPage, EmployeesCreatePage } from "../pages/Tasks";
import { CompletedList } from "../pages";
import { PermanentsLists } from "../components/PermanentsTasks";
import { LoginPage, ErrorPage, CardsPage } from "../pages";
import { formatRoutes } from "./utils";
import CustomLayout from "../layouts/Custom";
import {
  ROUTE_PRIVATE_ROOT_PATH,
  ROUTE_PUBLIC_ROOT_PATH,
  ERROR_PAGES,
} from "./constants";
import { ScheduleOutlined } from "@ant-design/icons";
import { CheckOutlined } from "@ant-design/icons";
import { App } from "antd";

const routes = formatRoutes([
  //Public routes
  {
    path: ROUTE_PUBLIC_ROOT_PATH,
    exact: true,
    layout: "custom",
    layoutComponent: CustomLayout,
    component: LoginPage,
    page: { title: "Entrar" },
  },

  {
    path: ROUTE_PRIVATE_ROOT_PATH,
    exact: true,
    component: EmployeesListPage,
    layout: "private",
    page: { title: "Tarefas" },
    menu: {
      title: "Criar Tarefas",
      icon: ScheduleOutlined,
      insideSubmenu: {
        title: "Minhas Tarefas",
        icon: UnorderedListOutlined,
      },
    },
  },
  {
    path: "/Tarefas Concluidas",
    exact: true,
    component: CompletedList,
    layout: "private",
    page: { title: "Tarefas Concluidas" },
    menu: {
      title: "Tarefas Concluidas",
      icon: CheckOutlined,
    },
  },
  {
    path: "/Tarefas Permanentes",
    exact: true,
    layout: "private",
    component: PermanentsLists,
    page: { title: "Tarefas Permanentes" },
    menu: {
      title: "Tarefas Permanentes",
      icon: ScheduleOutlined,
      insideSubmenu: {
        title: "Minhas Permanentes",
        icon: UnorderedListOutlined,
      },
    },
  },
  {
    path: "/usuarios",
    exact: true,
    layout: "private",
    component: CardsPage,
    page: { title: "Usuarios" },
    menu: { icon: IdcardOutlined, title: "Usuarios" },
    layoutContentStyle: { overflowY: "auto" },
  },
  // Routes errors
  {
    path: ERROR_PAGES[403],
    exact: true,
    layout: "custom",
    layoutComponent: CustomLayout,
    component: ErrorPage,
    page: {
      title: "403",
      subTitle: "Desculpe! Você não tem permissão para ver essa página.",
      status: 403,
    },
  },
  {
    path: ERROR_PAGES[500],
    layout: "custom",
    layoutComponent: CustomLayout,
    component: ErrorPage,
    page: {
      title: "500",
      subTitle: "Eita! Algo de errado não está certo.",
      status: 500,
    },
  },
  {
    path: ERROR_PAGES[404],
    layout: "custom",
    layoutComponent: CustomLayout,
    component: ErrorPage,
    page: {
      title: "404",
      subTitle: "Ops! A página solicitada não existe.",
      status: 404,
    },
  },
]);

export default routes;
