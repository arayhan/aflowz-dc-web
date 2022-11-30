import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import range from 'lodash/range';
import { BsCalendar2Event } from 'react-icons/bs';
import 'react-datepicker/dist/react-datepicker.css';

export const InputSelectDate = ({ selectedDate, onChange }) => {
	const years = range(1950, getYear(new Date()) + 1, 1);
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	return (
		<DatePicker
			customInput={<ExampleCustomInput />}
			renderCustomHeader={({
				date,
				changeYear,
				changeMonth,
				decreaseMonth,
				increaseMonth,
				prevMonthButtonDisabled,
				nextMonthButtonDisabled
			}) => (
				<div style={{ margin: 10, display: 'flex', justifyContent: 'center' }} className="self-end">
					<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
						{'<'}
					</button>
					<select value={getYear(date)} onChange={({ target: { value } }) => changeYear(value)}>
						{years.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>

					<select
						value={months[getMonth(date)]}
						onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
					>
						{months.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>

					<button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
						{'>'}
					</button>
				</div>
			)}
			selected={selectedDate}
			onChange={onChange}
		/>
	);
};

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
	<button type="button" className="flex justify-between items-center w-full" onClick={onClick} ref={ref}>
		{value || <p className="text-gray-400">{'Pilih Tanggal Lahir'}</p>}
		<BsCalendar2Event />
	</button>
));

ExampleCustomInput.displayName = 'ExampleCustomInput';

InputSelectDate.defaultProps = {
	onChange: () => {}
};
