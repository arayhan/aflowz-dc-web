import { Button, InputText } from '@/components/atoms';
import { useKonstituenStore } from '@/store';
import { formProposalSchema } from '@/utils/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

export const FormProposal = () => {
	const { konstituenID, proposalID } = useParams();
	const navigate = useNavigate();

	const { proposalItem, fetchingProposalItem, processingCreateProposal } = useKonstituenStore();
	const { getProposalItem, createProposal, updateProposal } = useKonstituenStore();

	const { control, setValue, handleSubmit } = useForm({
		resolver: yupResolver(formProposalSchema),
		defaultValues: {
			name: '',
			konstituen_id: konstituenID
		}
	});

	const onSubmitProposal = (values) => {
		if (proposalID) {
			updateProposal(proposalID, values, ({ success }) => {
				if (success) navigate(`/institusi/${konstituenID}`, { replace: true });
			});
		} else {
			createProposal(values, ({ success }) => {
				if (success) navigate(`/institusi/${konstituenID}`, { replace: true });
			});
		}
	};

	useEffect(() => {
		if (proposalID) getProposalItem(proposalID);
	}, [proposalID]);

	useEffect(() => {
		if (proposalID && proposalItem) {
			setValue('name', proposalItem.name || '');
		}
	}, [proposalID, proposalItem]);

	return (
		<div className="space-y-8">
			<div>
				<div className="text-xl font-light">{proposalID ? 'Edit' : 'Tambah'} Usulan</div>
			</div>
			<hr />
			<div className="grid gap-x-8 gap-y-6">
				<Controller
					name={'name'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Usulan"
							placeholder="Usulan"
							disabled={processingCreateProposal || fetchingProposalItem}
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
					disabled={processingCreateProposal || fetchingProposalItem}
					linkTo={proposalID ? `/proposal/${proposalID}` : '/proposal'}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingCreateProposal || fetchingProposalItem}
					onClick={handleSubmit(onSubmitProposal)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
