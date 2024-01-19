/**
 *
 * EmployeesList Page
 *
 */

import { Card } from "antd";

import withContext from "../../../contexts/withContexts";
import { useState } from "react";
import { PageEventsProvider } from "../../../contexts";
import { EmployeesFilter, EmployeesList } from "../../../components/tasks";
import { useNavigate } from "react-router-dom";

function EmployeesListPage({ route, ...props }) {
	const navigate = useNavigate();
	const [filter, setFilter] = useState({
		sortDirection: 0,
		search: "", // Include search parameter in the filter
	});

	function onEdit(employee) {
		navigate(`/employees/${employee.id}`);
	}

	function onItemsEdit(employee) {
		navigate(`/employees/${employee.id}/items`);
	}

	return (
		<Card className="container">
			<div className="margin-bottom">
				<EmployeesFilter values={filter} onChange={setFilter} />
			</div>

			<EmployeesList
				filter={{
					sortDirection: filter.sortDirection,
					search: filter.search, // Pass search parameter to EmployeesList

					page: 1,
				}}
				onEdit={onEdit}
				onItemsEdit={onItemsEdit}
			/>
		</Card>
	);
}

export default withContext(PageEventsProvider)(EmployeesListPage);
