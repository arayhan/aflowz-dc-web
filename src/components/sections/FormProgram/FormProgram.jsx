import { InputText } from '@/components/atoms';
import { InputSelectMitra } from '@/components/molecules';
import React from 'react';

export const FormProgram = () => {
	return (
		<section className="bg-gray-100">
			<div className="container py-16">
				<div className="max-w-screen-lg mx-auto">
					<div className="bg-white p-8 rounded-md space-y-8">
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
				</div>
			</div>
		</section>
	);
};
