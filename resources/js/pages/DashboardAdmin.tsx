import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { Destination } from "@/types";
import AdminLayout from "@/layouts/app/AdminLayout";

type Props = {
  destinations: Destination[];
};

export default function DashboardAdmin({ destinations }: Props) {
  const { delete: destroy, processing } = useForm({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State untuk gambar yang dipilih

  const handleDelete = (id: number) => {
    if (confirm("Yakin mau hapus?")) {
      destroy(route("destinations.destroy", id));
    }
  };

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <AdminLayout title="Dashboard Destinasi">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Destinasi</h1>
        <Link
           href="/admin/destinations/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Tambah Destinasi
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lokasi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Spot Wisata
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durasi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jumlah Paket
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {destinations.map((destination) => (
              <tr key={destination.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {destination.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{destination.spot}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {destination.duration}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {destination.package.length} Paket
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Menampilkan gambar pertama */}
                  {destination.images && destination.images.length > 0 ? (
                    <img
                      src={destination.images[0]} // Menampilkan gambar pertama
                      alt="Gambar Destinasi"
                      className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                      onClick={() => openModal(destination.images[0])} // Membuka modal saat gambar diklik
                    />
                  ) : (
                    <span className="text-sm text-gray-500">Tidak ada gambar</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={route("destinations.edit", destination.id)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(destination.id)}
                    disabled={processing}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {destinations.length === 0 && (
          <div className="text-center py-8 bg-gray-50">
            <p className="text-gray-500">Belum ada data destinasi</p>
            <Link
                href="/admin/destinations/create"
              className="mt-2 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
            >
              Tambah Destinasi Pertama
            </Link>
          </div>
        )}
      </div>

      {/* Modal untuk Menampilkan Gambar Besar */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-2xl mx-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 text-2xl"
            >
              &times;
            </button>
            <img
              src={selectedImage!}
              alt="Gambar Besar"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
