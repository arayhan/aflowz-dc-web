import moment from 'moment';
import React, { useState } from 'react';

const VALUES = [moment().subtract(2, 'year').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];

export const Timeline = () => {
	const [state, setState] = useState({ value: 0, previous: 0 });

	return (
		<div>
			{/* Bounding box for the Timeline */}
			<div className="w-full py-20">TIMELINE HERE</div>
			<div className="text-center">
				{/* any arbitrary component can go here */}
				{state.value}
			</div>
		</div>
	);
};
