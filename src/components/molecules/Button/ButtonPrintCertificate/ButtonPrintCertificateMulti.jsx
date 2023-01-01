import React from 'react';
import certif from '../../../../images/certificate_dc_2020.jpg';
import { jsPDF } from 'jspdf';

export const ButtonPrintCertificateMulti = ({ names }) => {
	const handlePrintMulti = () => {
		names.forEach((name) => {
			let studentname = name;
			let year = new Date().getFullYear();
			let filename = `sertifikat-${name}-${year}`;
			let doc = new jsPDF('landscape', 'mm', 'a4');
			doc.addImage(certif, 'JPEG', 0, 0, 297, 210); // image certif bisa diganti sesuai dengan kebutuhan
			doc.setFont('times');

			/* Name */
			if (studentname.length > 42) {
				doc.setFontSize(20);
				doc.text(148.5, 103, studentname, 'center');
			} else if (studentname.length > 35 && studentname.length <= 42) {
				doc.setFontSize(22);
				doc.text(148.5, 103, studentname, 'center');
			} else if (studentname.length > 21 && studentname.length <= 35) {
				doc.setFontSize(24);
				doc.text(148.5, 103, studentname, 'center');
			} else if (studentname.length > 0 && studentname.length <= 21) {
				doc.setFontSize(28);
				doc.text(148.5, 103, studentname, 'center');
			}

			doc.save(filename + '.pdf');
		});
	};

	return (
		<div>
			<button
				className="bg-green-500 hover:bg-green-600 w-full lg:w-auto space-x-2 text-white px-5 py-3 flex items-center justify-center rounded-sm transition-all"
				onClick={handlePrintMulti}
			>
				Print Certificate
			</button>
		</div>
	);
};
