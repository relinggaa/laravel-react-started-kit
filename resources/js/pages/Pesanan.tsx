import React, { useState, useRef } from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';

interface Order {
  id: number;
  order_id: string;
  destination_name: string;
  destination_id: number;
  package_id: number;
  price: string;
  status: string;
  created_at: string;
  has_testimonial: boolean;
  testimonial: any;
}

interface PageProps {
  orders: Order[];
  flash?: {
    success?: string;
    error?: string;
  };
  [key: string]: unknown;
}

const Pesanan = () => {
  const { orders, flash } = usePage<PageProps>().props;
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data, setData, post, processing, errors, reset } = useForm({
    order_id: '',
    destination_id: '',
    content: '',
    rating: 5,
    image: null as File | null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('image', file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setData('image', null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };



const handleTestimonialSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log('Form submitted'); // Debugging
  
  // Gunakan FormData untuk file upload
  const formData = new FormData();
  formData.append('order_id', data.order_id);
  formData.append('destination_id', data.destination_id);
  formData.append('content', data.content);
  formData.append('rating', data.rating.toString());
  if (data.image) {
    formData.append('image', data.image);
    console.log('Image added to form data'); // Debugging
  }

  console.log('Form data prepared, sending...'); // Debugging
  
  // Gunakan Inertia's post method dengan FormData
  router.post(route('user.testimonials.store'), formData, {
    onSuccess: () => {
      console.log('Testimonial submitted successfully'); // Debugging
      setShowTestimonialModal(false);
      reset();
      setImagePreview(null);
    },
    onError: (errors) => {
      console.log('Error submitting testimonial:', errors); // Debugging
    },
    forceFormData: true,
  });
};


  const openTestimonialModal = (order: Order) => {
    setSelectedOrder(order);
    setData({
      order_id: order.id.toString(),
      destination_id: order.destination_id.toString(),
      content: '',
      rating: 5,
      image: null,
    });
    setImagePreview(null);
    setShowTestimonialModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'success':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Selesai';
      case 'success':
        return 'Berhasil';
      case 'pending':
        return 'Menunggu';
      case 'failed':
        return 'Gagal';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
         
      <Head title="Pesanan Saya" />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Pesanan Saya</h1>

        {flash?.success && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
            {flash.success}
          </div>
        )}

        {flash?.error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
            {flash.error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Anda belum memiliki pesanan.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
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
                      Testimoni
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
                        {order.destination_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Paket {order.package_id + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rp {order.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.created_at}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {order.status === 'completed' && !order.has_testimonial && (
                          <button
                            onClick={() => openTestimonialModal(order)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Beri Testimoni
                          </button>
                        )}
                        {order.has_testimonial && (
                          <div>
                            <span className="text-green-600">Testimoni Terkirim</span>
                            {order.testimonial.image_url && (
                              <div className="mt-2">
                                <img 
                                  src={order.testimonial.image_url} 
                                  alt="Testimoni" 
                                  className="w-16 h-16 object-cover rounded"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Testimonial Modal */}
        {showTestimonialModal && selectedOrder && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Beri Testimoni untuk {selectedOrder.destination_name}
              </h3>
              
              <form onSubmit={handleTestimonialSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Rating</label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setData('rating', star)}
                        className="text-2xl focus:outline-none"
                      >
                        {star <= data.rating ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                  {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Testimoni</label>
                  <textarea
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    placeholder="Bagikan pengalaman Anda..."
                    required
                  />
                  {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Upload Gambar (Opsional)</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                  
                  {imagePreview && (
                    <div className="mt-4 relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowTestimonialModal(false);
                      removeImage();
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {processing ? 'Mengirim...' : 'Kirim Testimoni'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pesanan;