import { Button } from '@/components/atoms';
import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';

export const ButtonBack = ({ className, text, linkTo }) => {
	return (
		<Button
			className={`flex items-center justify-center space-x-3 px-5 py-3 rounded-sm ${className}`}
			variant={'primary'}
			linkTo={linkTo}
		>
			<IoIosArrowRoundBack size={24} />
			<span>{text || 'Kembali'}</span>
		</Button>
	);
};
