import { Table } from "@/components/atoms";
import { NegativeCase } from '@/components/atoms';
import { NEGATIVE_CASE_TYPES } from '@/utils/constants';
import { useMemo } from "react";

export const TablePenerimaKonstituenDetail = ({ dataPenerima, setLoading }) => {

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: '',
                disableSortBy: true,
                disableFilters: true,
                maxWidth: 5,
                Cell: (row) => {
                    return <div className="text-gray-400">{Number(row.row.id) + 1}</div>;
                }
            },
            {
                Header: 'Nama Penerima',
                minWidth: 200,
                Cell: (row) => <div className="transform: capitalize">{row.row.original.name}</div>
            },
            {
                Header: 'NIK',
                minWidth: 100,
                maxWidth: 100,
                Cell: (row) => <div className="transform: capitalize">{row.row.original.nik_number}</div>
            },
            {
                Header: 'Alamat',
                minWidth: 300,
                maxWidth: 500,
                Cell: (row) => <div className="transform: capitalize">{row.row.original.address}</div>
            }
        ],
        []
    );

    return (
        <div>
            <div className="p-4 space-y-2">
                <div className="font-light text-xl">
                    Tabel Penerima
                </div>
                <div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
            </div>
            <hr />
            {dataPenerima.length === 0 && <NegativeCase type={NEGATIVE_CASE_TYPES.EMPTY_RESULT} />}
            {dataPenerima.length > 0 && (
                <div className="overflow-x-auto">
                    <Table columns={columns} data={dataPenerima} loading={setLoading} />
                </div>
            )}
        </div>
    );

};