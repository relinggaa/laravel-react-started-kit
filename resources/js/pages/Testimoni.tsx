import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AdminLayout from "@/layouts/app/AdminLayout";

interface Testimonial {
  id: number;
  user_name: string;
  destination_name: string;
  order_id: string;
  content: string;
  rating: number;
  image_url: string | null;
  is_approved: boolean;
  created_at: string;
}


interface PageProps {
  testimonials: Testimonial[];
  flash?: {
    success?: string;
    error?: string;
  };
  [key: string]: unknown;
}
const Testimoni = () => {
   const { testimonials, flash } = usePage<PageProps>().props;

  const handleApprove = (id: number) => {
    router.put(route('admin.testimonials.approve', id));
  };

  const handleReject = (id: number) => {
    router.put(route('admin.testimonials.reject', id));
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) {
      router.delete(route('admin.testimonials.destroy', id));
    }
  };

  const getStatusColor = (isApproved: boolean) => {
    return isApproved 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  const getStatusText = (isApproved: boolean) => {
    return isApproved ? 'Disetujui' : 'Menunggu';
  };

  return (
    <AdminLayout title="Kelola Testimoni">
      <div className="p-6">
        <Head title="Kelola Testimoni" />
        
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
          <h1 className="text-2xl font-bold text-gray-800">Kelola Testimoni</h1>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destinasi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Testimoni
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
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {testimonial.user_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {testimonial.destination_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {testimonial.order_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} className="text-yellow-400">
                            {i < testimonial.rating ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="max-w-xs">
                        <p className="truncate">{testimonial.content}</p>
                        {testimonial.image_url && (
                          <div className="mt-2">
                            <img 
                              src={testimonial.image_url} 
                              alt="Testimoni" 
                              className="w-16 h-16 object-cover rounded"
                            />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(testimonial.is_approved)}`}>
                        {getStatusText(testimonial.is_approved)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {testimonial.created_at}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {!testimonial.is_approved && (
                        <button
                          onClick={() => handleApprove(testimonial.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Setujui
                        </button>
                      )}
                      {testimonial.is_approved && (
                        <button
                          onClick={() => handleReject(testimonial.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          Tolak
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {testimonials.length === 0 && (
            <div className=" text-center py-8 text-gray-500">
              Tidak ada testimoni yang ditemukan.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Testimoni;