import { Button } from '@/components/atoms';
import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';

export const BannerFeature = ({ title, description, loading, backButtonLinkTo }) => {
	const navigate = useNavigate();

	return (
		<div className="bg-primary">
			<div className={`container ${backButtonLinkTo ? 'pt-14 pb-20' : 'py-20'}`}>
				{loading && (
					<div className="space-y-2 flex flex-col opacity-30">
						<Skeleton width={220} height={40} />
						<Skeleton className="max-w-full" width={400} height={25} />
					</div>
				)}

				{!loading && (
					<div className="space-y-10 text-white">
						<Button
							className={
								'flex items-center space-x-3 bg-white bg-opacity-5 hover:bg-opacity-10 opacity-60 px-5 py-2 rounded-md trans'
							}
							onClick={() => navigate(-1)}
						>
							<IoIosArrowRoundBack size={24} />
							<span>Kembali</span>
						</Button>
						<div className="space-y-6 ">
							{title && <div className="font-extralight text-4xl md:text-5xl">{title}</div>}
							{description && <div className="opacity-60 text-white">{description}</div>}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

BannerFeature.defaultProps = {
	loading: false
};
