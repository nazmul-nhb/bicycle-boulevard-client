import type { IRoute } from "../types/routes";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import AdminDashboard from "../pages/admin/Dashboard";
import CreateUser from "../pages/admin/CreateUser";
import StudentDashboard from "../pages/student/Dashboard";
import ViewResult from "../pages/student/ViewResult";

export const routes: IRoute[] = [
	{
		label: "Home",
		path: "/",
		icon: "fluent-color:home-48",
		element: <Home />,
	},
	{
		label: "About",
		path: "about",
		icon: "fluent-color:question-circle-16",
		element: <About />,
	},
	{
		label: "Contact",
		path: "contact",
		icon: "fluent-mdl2:connect-contacts",
		element: <Contact />,
	},
	{
		label: "Admin Panel",
		path: "admin",
		icon: "ic:outline-admin-panel-settings",
		children: [
			{
				label: "Dashboard",
				path: "",
				icon: "ic:outline-admin-panel-settings",
				element: <AdminDashboard />,
			},
			{
				label: "Create User",
				path: "create-user",
				icon: "mdi:user-add-outline",
				element: <CreateUser />,
			},
		],
	},
	{
		label: "Student Panel",
		path: "student",
		icon: "ph:student",
		children: [
			{
				label: "Dashboard",
				path: "",
				icon: "ph:student",
				element: <StudentDashboard />,
			},
			{
				label: "View Result",
				path: "view-result",
				icon: "carbon:result-draft",
				element: <ViewResult />,
			},
		],
	},
];
