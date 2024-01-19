/**
 *
 * PageEvents Context
 *
 */

import { createContext, useContext, useState } from "react";

const PageEventsContext = createContext({});

function PageEventsProvider(props) {
	const [data, setData] = useState({ reloadList: false, filter: null });

	function setReloadList(reloadList) {
		setData({
			...data,
			reloadList: typeof reloadList === "boolean" ? reloadList : true,
		});
	}

	function onChangeFilter(filter) {
		setData({
			...data,
			filter,
		});
	}

	return (
		<PageEventsContext.Provider
			value={{ ...data, setReloadList, onChangeFilter }}
		>
			{props.children}
		</PageEventsContext.Provider>
	);
}

export function usePageEvents() {
	return useContext(PageEventsContext);
}

export default PageEventsProvider;
