import { PDFDatabaseReport } from '@/components/molecules';
import React from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Button } from '@/components/atoms';

const VillageDatabaseReport = () => {
	const PDFDatabaseReportComponent = () => <PDFDatabaseReport title="Kelurahan/Desa" />;

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
					<PDFViewer className="w-full h-[85vh]" showToolbar={false}>
						<PDFDatabaseReportComponent />
					</PDFViewer>
				</div>
			</div>
		</div>
	);
};

export default VillageDatabaseReport;
