import { InputText, Button } from '@/components/atoms';

export const SearchOnTable = ({ onChange, placeholder, value, search, clear }) => {
	return (
		<>
			<InputText showLabel={false} onChange={onChange} placeholder={placeholder} value={value} />
			<Button className="mx-1 px-5 py-1" variant={'primary'} type="button" onClick={search}>
				Cari
			</Button>
			<Button className="px-5 py-1" variant={'warning'} type="button" onClick={clear}>
				Clear
			</Button>
		</>
	);
};
