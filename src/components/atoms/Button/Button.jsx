import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

export const Button = ({ className, disabled, linkTo, onClick, variant, children }) => {
	const variantClasses = classNames({
		'bg-primary-500 hover:bg-primary-400 disabled:bg-primary-300 text-white': variant === 'primary',
		'bg-blue-500 hover:bg-blue-400 disabled:bg-blue-300 text-white': variant === 'info',
		'bg-green-500 hover:bg-green-400 disabled:bg-green-300 text-white': variant === 'success',
		'bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-300 text-white': variant === 'warning',
		'bg-red-500 hover:bg-red-400 disabled:bg-red-300 text-white': variant === 'danger'
	});

	const navigate = useNavigate();
	return (
		<button
			className={`inline-block text-center transition-all ${className} ${variantClasses}`}
			onClick={() => (linkTo ? navigate(linkTo) : onClick())}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

Button.defaultProps = {
	onClick: () => {}
};
