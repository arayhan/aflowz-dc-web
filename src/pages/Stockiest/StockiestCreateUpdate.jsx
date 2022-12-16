import { BannerFeature, FormStockiest } from '@/components/molecules';
import { useParams } from 'react-router-dom';

const StockiestCreateUpdate = () => {
	const params = useParams();

	return (
		<div>
			<BannerFeature
				title={`${params.stockiestID ? 'Update' : 'Create'} - Barang`}
				backButtonLinkTo={'/stockiest'}
				backButtonText="Kembali ke Daftar Barang"
			/>

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto">
						<div className="bg-white p-8 rounded-md">
							<FormStockiest />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default StockiestCreateUpdate;
