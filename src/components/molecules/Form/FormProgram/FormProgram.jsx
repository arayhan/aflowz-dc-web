import { InputText } from '@/components/atoms';
import { InputSelectMitra } from '@/components/molecules';
import React from 'react';

export const FormProgram = () => {
	return (
		<div className="space-y-8">
			<div>
				<div className="font-light text-xl">Tambah Program</div>
				<div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<InputSelectMitra />
				<InputText label="Nama Program" name="nama_program" placeholder="Nama Program" />
				<InputText label="Periode" name="periode" placeholder="Periode" />
			</div>
			<hr />
			<div className="flex justify-end">
				<button className="px-8 py-3 bg-primary-500 hover:bg-primary-600 rounded-md text-white">Submit</button>
			</div>
		</div>
	);
};
