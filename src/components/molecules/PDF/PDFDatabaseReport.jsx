import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import RobotoBold from '@/fonts/roboto/Roboto-Bold.ttf';
import RobotoRegular from '@/fonts/roboto/Roboto-Regular.ttf';
import { ChartPenerimaProgramByGender } from '../Chart/ChartPenerimaProgramByGender/ChartPenerimaProgramByGender';

Font.register({ family: 'RobotoBold', format: 'truetype', src: RobotoBold });
Font.register({ family: 'RobotoRegular', format: 'truetype', src: RobotoRegular });

const styles = StyleSheet.create({
	page: {
		paddingTop: 30,
		paddingBottom: 60,
		paddingHorizontal: 30,
		backgroundColor: 'white'
	},
	header: {
		fontFamily: 'RobotoRegular',
		fontSize: 20
	},
	logo: {
		height: 40,
		marginRight: 8
	},
	divider: { width: '100%', height: 1, backgroundColor: '#ccc', marginVertical: 16 },
	sectionSpacer: { width: '100%', paddingVertical: 16 },
	sectionTitle: { fontFamily: 'RobotoBold', fontSize: 16, textAlign: 'center', marginBottom: 8 },
	text: { paddingVertical: 4 },
	highlight: { backgroundColor: '#87c1f0', paddingHorizontal: 4 },
	metadata: {},
	flexRow: { flexDirection: 'row' },
	itemsCenter: { alignItems: 'center' },
	justifyBetween: { justifyContent: 'space-between' }
});

export const PDFDatabaseReport = ({ title }) => {
	const handleGenerateChartPenerimaByGender = () => {
		return 'Test';
	};

	return (
		<Document>
			<Page size="A4" style={styles.page} wrap>
				<View style={[styles.header, styles.flexRow, styles.itemsCenter, styles.justifyBetween]}>
					<View style={[styles.flexRow, styles.itemsCenter]}>
						<Image style={styles.logo} src={require('@/images/icons/3.png')} />
						<View>
							<Text>Database</Text>
							<Text>Report</Text>
						</View>
					</View>
					<View style={[styles.flexRow, styles.itemsCenter]}>
						<Text style={{ fontFamily: 'RobotoBold', fontSize: 32 }}>{title}</Text>
					</View>
				</View>

				<View style={styles.divider} />

				<View style={[styles.flexRow, styles.itemsCenter, styles.justifyBetween]}>
					<View>
						<Text style={[{ fontFamily: 'RobotoRegular', fontSize: 14 }, styles.text]}>INSTITUSI :</Text>
						<Text style={[{ fontFamily: 'RobotoBold', fontSize: 18 }, styles.highlight, styles.text]}>ABC</Text>
					</View>
					<View>
						<Text style={[{ fontFamily: 'RobotoRegular', fontSize: 14 }, styles.text]}>KORWIL :</Text>
						<Text style={[{ fontFamily: 'RobotoRegular', fontSize: 14 }, styles.text]}>PIC TEMPAT :</Text>
					</View>
				</View>

				<View style={styles.sectionSpacer} />

				<View>
					<View>
						<Text style={[styles.sectionTitle, styles.text]}>DATA JUMLAH PENERIMA SEMUA PROGRAM</Text>
					</View>
					<View>
						<View>
							<Text>{handleGenerateChartPenerimaByGender()}</Text>
						</View>
					</View>
				</View>
			</Page>
		</Document>
	);
};
