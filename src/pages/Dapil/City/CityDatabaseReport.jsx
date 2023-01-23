import { PDFDatabaseReport } from '@/components/molecules';
import React from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Button } from '@/components/atoms';

const CityDatabaseReport = () => {
	const PDFDatabaseReportComponent = () => <PDFDatabaseReport title="KOTA/KAB" />;

	return (
		<div className="bg-gray-100">
			<div className="container py-8 space-y-4">
				<div className="flex justify-end">
					<Button className="px-6 py-3 text-sm rounded-sm" variant={'primary'}>
						<PDFDownloadLink document={<PDFDatabaseReportComponent />} fileName="sample.pdf">
							{({ blob, url, loading, error }) => (loading ? 'Downloading...' : 'Export to PDF')}
						</PDFDownloadLink>
					</Button>
				</div>
				<div className="overflow-hidden rounded-md">
					<div className="flex flex-col items-center bg-[#525659] h-[830.44px] p-8 overflow-y-scroll gap-8">
						<div className="w-[720px] min-h-[830.44px] bg-white rounded-md p-12">
							<div className="items-center">
								<img className="w-20" src={require('@/images/icons/3.png')} alt="" />
								<span>
									Database <br /> Report
								</span>
							</div>
							<div className="">KOTA/KAB</div>
						</div>
						<div className="w-[720px] min-h-[830.44px] bg-white rounded-md p-12">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quae est qui repellat id iste velit
							beatae, ab perspiciatis fugit blanditiis illum saepe eligendi quo? Illo ab dicta cumque voluptas? Natus
							perferendis qui doloremque amet dolores iste, numquam nulla eum quaerat aliquam quas necessitatibus cum
							repudiandae aut consectetur nisi commodi odit optio quo consequuntur. Enim doloremque illo sed repellat
							eius! Alias asperiores non, et, sequi dolorum, facere quod suscipit tempore doloribus officiis provident.
							Suscipit sequi iure, et blanditiis quis adipisci repellat. Eaque aspernatur nesciunt velit provident ipsam
							earum impedit dignissimos! Ducimus, fuga! Ipsum praesentium odio itaque, ex, rem possimus mollitia
							recusandae debitis rerum voluptatem nisi tenetur a. Iusto, sapiente sed modi recusandae eaque iste. Sequi
							accusamus quas deleniti veniam ipsam! Error fugiat deserunt cumque eveniet nisi ex dolorum tempore, nam
							quidem consectetur illo ratione exercitationem! Quibusdam saepe veniam, numquam suscipit quo qui maiores
							autem, alias facilis atque, amet nobis modi. Perspiciatis, vel deleniti ab maiores, fuga porro cupiditate
							minima nobis delectus accusamus amet autem libero dolores tempore eos accusantium debitis numquam
							consequatur quidem ea. Aliquid assumenda reiciendis iure aut beatae? Velit optio unde libero magnam harum
							maxime sunt molestiae est rem eveniet! Quam sed repudiandae enim optio blanditiis tempore porro excepturi
							iusto. Eligendi, similique quibusdam quos veniam adipisci reiciendis placeat. Dolores quos sed dolorum! A,
							atque velit assumenda id, debitis nisi ex libero deleniti, esse consectetur necessitatibus? Architecto
							necessitatibus nulla vero rem cupiditate, fuga nesciunt quia tenetur voluptatem repudiandae ipsam!
						</div>
					</div>
					{/* <PDFViewer className="w-full h-[85vh]" showToolbar={false}>
						<PDFDatabaseReportComponent />
					</PDFViewer> */}
				</div>
			</div>
		</div>
	);
};

export default CityDatabaseReport;
