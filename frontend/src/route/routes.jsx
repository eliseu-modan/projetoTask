import {
	DashboardOutlined,
	UserOutlined,
	IdcardOutlined,
	ApiOutlined,
	UserSwitchOutlined,
	CarOutlined,
	ClockCircleOutlined,
	PlusOutlined,
	UnorderedListOutlined,
} from "@ant-design/icons";
import { EmployeesListPage, EmployeesCreatePage } from "../pages/Tasks";
import { LoginPage, ErrorPage, DashoardPage, CardsPage } from "../pages";
import { formatRoutes } from "./utils";
import CustomLayout from "../layouts/Custom";
import {
	ROUTE_PRIVATE_ROOT_PATH,
	ROUTE_PUBLIC_ROOT_PATH,
	ERROR_PAGES,
} from "./constants";

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

	//Private routes
	// {
	// 	// path: ROUTE_PRIVATE_ROOT_PATH,
	// 	exact: true,
	// 	layout: "private",
	// 	component: DashoardPage,
	// 	page: { title: "Dashboard" },
	// 	menu: { icon: DashboardOutlined, title: "Dashboard" },
	// 	layoutContentStyle: { overflowY: "auto" },
	// },
	{
		path: ROUTE_PRIVATE_ROOT_PATH,
		exact: true,
		component: EmployeesListPage,
		layout: "private",
		page: { title: "Tarefas" },
		menu: {
			title: "Criar Tarefas",
			icon: UserOutlined,
			insideSubmenu: {
				title: "Minhas Tarefas",
				icon: UnorderedListOutlined,
			},
		},
		layoutContentStyle: { overflowY: "auto" },
		routes: [
			{
				path: "/create",
				exact: true,
				component: EmployeesCreatePage,
				layout: "private",
				page: { title: "Tarefas" },
				menu: {
					icon: PlusOutlined,
					title: "Cadastrar",
				},
				layoutContentStyle: { overflowY: "auto" },
			},
		],
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
