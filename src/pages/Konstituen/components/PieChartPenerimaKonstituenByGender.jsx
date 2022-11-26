import { NegativeCase } from '@/components/atoms';
import { NEGATIVE_CASE_TYPES } from '@/utils/constants';
import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const PieChartPenerimaKonstituenByGender = ({ totalPria, totalWanita }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    };
    
    return (
        <div>
            <div className="p-4 space-y-2">
                <div className="font-light text-xl">
                    Penerima Program by Gender
                </div>
                <div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
            </div>
            <hr />
            {(totalPria + totalWanita) === 0 && <NegativeCase type={NEGATIVE_CASE_TYPES.EMPTY_RESULT} />}
            {(totalPria + totalWanita) > 0 && (
                <div className="flex items-center justify-center px-4 md:px-8 xl:px-12 py-4 w-auto h-96">
                    <Pie
                        options={options}
                        data={{
                            labels: [`Pria (${totalPria} Orang)`, `Wanita (${totalWanita} Orang)`],
                            datasets: [
                                {
                                    label: 'Total Penerima',
                                    data: [totalPria, totalWanita],
                                    backgroundColor: ['rgba(40, 74, 245, 0.6)', 'rgba(255, 35, 138, 0.6)'],
                                    borderWidth: 1,
                                    indexLabel: [`${totalPria} Orang`, `${totalWanita} Orang`],
                                }
                            ],
                            datalabels: {
                                font: {
                                    weight: 'bold'
                                }
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
};

