import { ACTION_TYPES } from '@/utils/constants';
import { ButtonAction } from '../Button/ButtonAction';
import { ButtonPrintCertificate } from '@/components/molecules/index';

export const Card = ({
	title,
	description,
	className,
	bodyClassName,
	children,
	isInDetail,
	linkRoute,
	isPrintCertif,
	penerima,
	rightComponent
}) => {
	return (
		<div className={className}>
			<div className="flex flex-col justify-between gap-3 p-4 md:items-center md:flex-row">
				<div className="space-y-2">
					{title && <div className="text-xl font-light">{title}</div>}
					{description && <div className="text-sm text-gray-400">{description}</div>}
				</div>
				{rightComponent && <div className="flex items-center justify-center">{rightComponent}</div>}
				{isInDetail && (
					<>
						<div className="flex items-center justify-center">
							{isPrintCertif && (
								<div className="mx-2">
									<ButtonPrintCertificate penerima={penerima} />
								</div>
							)}
							<ButtonAction
								action={ACTION_TYPES.UPDATE}
								linkTo={linkRoute}
								className={'w-full md:w-auto text-base px-5 py-3'}
								text="Update"
							/>
						</div>
					</>
				)}
			</div>
			<hr />
			<div className={bodyClassName}>{children}</div>
		</div>
	);
};
