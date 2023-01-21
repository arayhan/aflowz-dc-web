import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	page: {
		flexDirection: 'row',
		backgroundColor: '#E4E4E4'
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1
	}
});

export const PDFDatabaseReport = () => {
	return (
		<Document>
			<Page size="A4" style={styles.page} wrap>
				<View style={styles.section}>
					<Text break>Section #1</Text>
					<Text break>Section #1</Text>
					<Text break>Section #1</Text>
				</View>
				<View style={styles.section} break>
					<Text break>Section #2</Text>
				</View>
			</Page>
			<Page size="A4" style={styles.page} wrap>
				<View style={styles.section} break>
					<Text break>Section #1</Text>
				</View>
				<View style={styles.section} break>
					<Text break>Section #2</Text>
				</View>
			</Page>
		</Document>
	);
};
