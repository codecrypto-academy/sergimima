import React from 'react';

const TransferHistory = ({ transfers, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Transfer History</h3>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Date Sent</th>
                            <th className="px-4 py-2 text-left">Quantity</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transfers.map((transfer, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="px-4 py-2">{new Date(transfer.date_sent_almacen).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{transfer.quantity_sent_almacen}</td>
                                <td className="px-4 py-2">{transfer.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Close
                </button>
            </div>
        </div>
    );
};

export default TransferHistory;