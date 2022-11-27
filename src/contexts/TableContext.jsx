import { createContext, useContext, useState } from 'react';

export const TableContext = createContext({
	page: 0,
	perPage: 0,
	perPageOptions: [],
	setPage: () => {},
	setPerPage: () => {}
});

export const TableContextProvider = ({ children }) => {
	const PER_PAGE_OPTIONS = [10, 20, 50, 100];

	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	return (
		<TableContext.Provider value={{ page, setPage, perPage, setPerPage, perPageOptions: PER_PAGE_OPTIONS }}>
			{children}
		</TableContext.Provider>
	);
};

export const useTableContext = () => useContext(TableContext);
