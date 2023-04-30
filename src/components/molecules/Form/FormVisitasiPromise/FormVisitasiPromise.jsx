import { Button, InputCheckbox, InputText } from '@/components/atoms';
import { useVisitasiStore } from '@/store';
import { formVisitasiPromiseSchema } from '@/utils/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

export const FormVisitasiPromise = () => {
	const { visitasiID, visitasiPromiseID } = useParams();
	const navigate = useNavigate();

	const {
		visitasiItem,
		visitasiPromiseItem,
		processingCreateVisitasiPromise,
		fetchingVisitasiPromiseItem,
		getVisitasiPromiseItem,
		createVisitasiPromise,
		updateVisitasiPromise,
		clearStateVisitasiPromise
	} = useVisitasiStore();

	const { control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formVisitasiPromiseSchema),
		defaultValues: {
			name: '',
			visitasi_id: Number(visitasiID),
			realization: false
		}
	});

	const onSubmitVisitasi = (values) => {
		if (visitasiPromiseID) {
			updateVisitasiPromise(visitasiPromiseID, values, ({ success }) => {
				if (success) navigate(-1, { replace: true });
			});
		} else {
			createVisitasiPromise(values, ({ success }) => {
				if (success) navigate(-1, { replace: true });
			});
		}
	};

	useEffect(() => {
		if (visitasiPromiseID) getVisitasiPromiseItem(visitasiPromiseID);
	}, [visitasiPromiseID]);

	useEffect(() => {
		if (visitasiPromiseID && visitasiPromiseItem) {
			setValue('name', visitasiPromiseItem.name || '');
			setValue('realization', visitasiPromiseItem.realization || false);
		}
	}, [visitasiPromiseID, visitasiPromiseItem]);

	useEffect(() => () => clearStateVisitasiPromise(), []);

	return (
		<div className="space-y-8">
			<div>
				<div className="text-xl font-light">{visitasiPromiseID ? 'Edit' : 'Tambah'} Janji Visitasi</div>
				<div className="text-sm text-gray-400"></div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				{visitasiItem && visitasiID && <InputText label="Visitasi Nama Mahasiswa" value={visitasiItem.name} disabled />}

				<Controller
					name={'name'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Janji"
							placeholder="Janji"
							disabled={visitasiPromiseID || processingCreateVisitasiPromise || fetchingVisitasiPromiseItem}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'realization'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputCheckbox
							{...field}
							label="Realized?"
							disabled={processingCreateVisitasiPromise || fetchingVisitasiPromiseItem}
							error={error}
						/>
					)}
				/>
			</div>
			<hr />
			<div className="flex justify-end">
				<Button
					className={'px-7 py-3 rounded-sm mx-2'}
					variant="warning"
					disabled={processingCreateVisitasiPromise || fetchingVisitasiPromiseItem}
					onClick={() => navigate(-1)}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingCreateVisitasiPromise || fetchingVisitasiPromiseItem}
					onClick={handleSubmit(onSubmitVisitasi)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
