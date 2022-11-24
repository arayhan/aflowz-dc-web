import { NegativeCaseView } from '@/components/molecules';
import { NEGATIVE_CASE_TYPES } from '@/utils/constants';
import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const PieChartPenerimaKonstituenByGender = ({ totalPria, totalWanita }) => {
    const options = {
        responsive: true,
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
            {(totalPria + totalWanita) === 0 && <NegativeCaseView type={NEGATIVE_CASE_TYPES.EMPTY_RESULT} />}
            {(totalPria + totalWanita) > 0 && (
                <div className="flex items-center justify-center px-4 md:px-8 xl:px-12 py-4">
                    <Pie
                        options={options}
                        data={{
                            labels: ['Pria', 'Wanita'],
                            datasets: [
                                {
                                    label: 'Total Penerima',
                                    data: [totalPria, totalWanita],
                                    backgroundColor: ['rgba(40, 74, 245, 0.6)', 'rgba(255, 35, 138, 0.6)'],
                                    borderWidth: 1,
                                    indexLabel: [`${totalPria} Orang`, `${totalWanita} Orang`],
                                    indexLabelPlacement: "inside"
                                }
                            ]
                        }}
                    />
                </div>
            )}
        </div>
    );
};

