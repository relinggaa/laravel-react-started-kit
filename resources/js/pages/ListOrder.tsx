import React, { useState } from 'react';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/app/AdminLayout';

interface Order {
  id: number;
  order_id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  destination_name: string;
  package_id: number;
  price: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface PageProps {
  orders: Order[];
  flash?: {
    success?: string;
    error?: string;
  };
  [key: string]: unknown;
}

const ListOrder = ({ orders }: PageProps) => {
  const { flash } = usePage<PageProps>().props;
  const [editingOrder, setEditingOrder] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'canceled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditClick = (order: Order) => {
    setEditingOrder(order.id);
    setSelectedStatus(order.status);
  };

  const handleStatusChange = (orderId: number, newStatus: string) => {
    router.put(`/admin/orders/${orderId}/status`, {
      status: newStatus
    }, {
      onSuccess: () => {
        setEditingOrder(null);
        setSelectedStatus('');
      }
    });
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
    setSelectedStatus('');
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'success', label: 'Success', color: 'bg-green-100 text-green-800' },
    { value: 'completed', label: 'Completed', color: 'bg-blue-100 text-blue-800' },
    { value: 'failed', label: 'Failed', color: 'bg-red-100 text-red-800' },
    { value: 'canceled', label: 'Canceled', color: 'bg-gray-100 text-gray-800' },
  ];

  return (
    <AdminLayout title="Daftar Order">
      <div className="p-6">
        {flash?.success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {flash.success}
          </div>
        )}
        
        {flash?.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {flash.error}
          </div>
        )}

        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Daftar Order</h1>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destinasi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Harga
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.order_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <div className="font-medium">{order.user_name}</div>
                        <div className="text-gray-400">{order.user_email}</div>
                        <div className="text-gray-400">{order.user_phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.destination_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Paket {order.package_id + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rp {order.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingOrder === order.id ? (
                        <div className="flex items-center space-x-2">
                          <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          >
                            {statusOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleStatusChange(order.id, selectedStatus)}
                            className="px-2 py-1 bg-green-500 text-white rounded-md text-xs hover:bg-green-600"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-2 py-1 bg-gray-500 text-white rounded-md text-xs hover:bg-gray-600"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {statusOptions.find(opt => opt.value === order.status)?.label || order.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.created_at}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditClick(order)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit Status
                      </button>
                      <Link
                        href="#"
                        className="text-red-600 hover:text-red-900"
                      >
                        Hapus
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada order yang ditemukan.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListOrder;