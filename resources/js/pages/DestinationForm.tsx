    import React, { useState, useCallback } from 'react';
    import { useForm, Link } from '@inertiajs/react';
    import AdminLayout from '@/layouts/app/AdminLayout';
    import { Destination } from '@/types';

    interface Props {
  destination?: Destination;
}

const DestinationForm = ({ destination }: Props) => {
  // State untuk preview gambar
  const [previewImages, setPreviewImages] = useState<string[]>(destination?.images || []);
  
  // Form data dengan Inertia
  const { data, setData, post, put, processing, errors, reset } = useForm({
    location: destination?.location || '',
    spot: destination?.spot || '',
    package: destination?.package || [''],
    rundown: destination?.rundown || [''],
    price: destination?.price || [''],
    duration: destination?.duration || '',
    images: destination?.images || [],
    new_images: [] as File[],
    deleted_images: [] as string[],
  });

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const formData = new FormData();
  
  // Append data biasa
  formData.append('location', data.location);
  formData.append('spot', data.spot);
  formData.append('package', JSON.stringify(data.package));
  formData.append('rundown', JSON.stringify(data.rundown));
  formData.append('price', JSON.stringify(data.price));
  formData.append('duration', data.duration);
  formData.append('deleted_images', JSON.stringify(data.deleted_images));

  // Append file gambar baru
  data.new_images.forEach((file: File) => {
    formData.append('new_images[]', file);
  });

  // Gunakan Inertia's form helper
  if (destination) {
    put(`/admin/destinations/${destination.id}`, formData);
  } else {
    post('/admin/destinations', formData);
  }
};


  // Menangani upload gambar
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);  // Fixed assignment and variable name
      const newPreviewUrls: string[] = [];
      const newImages: File[] = [];

      files.forEach(file => {
        if (!file.type.match('image.*')) {
          alert('Hanya file gambar yang diperbolehkan');
          return;
        }

        if (file.size > 2 * 1024 * 1024) {
          alert('Ukuran file maksimal 2MB');
          return;
        }

        newPreviewUrls.push(URL.createObjectURL(file));
        newImages.push(file);
      });

      setPreviewImages(prev => [...prev, ...newPreviewUrls]);
      setData('new_images', [...data.new_images, ...newImages]);
    }
  }, [data.new_images, setData]);

  // Menghapus gambar
  const removeImage = useCallback((index: number) => {
    const imageToRemove = previewImages[index];
    
    // Cek apakah gambar baru atau yang sudah ada di database
    if (imageToRemove.startsWith('blob:')) {
      // Gambar baru (blob URL) - hapus dari new_images
      const blobIndex = data.new_images.findIndex((_, i) => 
        previewImages[i] === imageToRemove && previewImages[i].startsWith('blob:')
      );
      
      if (blobIndex >= 0) {
        const newImages = [...data.new_images];
        newImages.splice(blobIndex, 1);
        setData('new_images', newImages);
      }
    } else {
      // Gambar yang sudah ada - tambahkan ke deleted_images
      setData('deleted_images', [...data.deleted_images, imageToRemove]);
    }

    // Hapus dari preview
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
  }, [previewImages, data.new_images, data.deleted_images, setData]);

  // Fungsi untuk menambah field dinamis
  const addField = (field: 'package' | 'rundown' | 'price') => {
    setData(field, [...data[field], '']);
  };

  // Fungsi untuk menghapus field dinamis
  const removeField = (field: 'package' | 'rundown' | 'price', index: number) => {
    if (data[field].length > 1) {
      const newFields = data[field].filter((_, i) => i !== index);
      setData(field, newFields);
    }
  }
    return (
        <AdminLayout title={destination ? 'Edit Destinasi' : 'Tambah Destinasi Baru'}>
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
                {destination ? 'Edit Destinasi' : 'Tambah Destinasi Baru'}
            </h1>
            <Link 
                href={route('destinations.index')} 
                className="text-gray-600 hover:text-gray-900 flex items-center"
            >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali
            </Link>
            </div>

            <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lokasi */}
                <div>
                <label className="block text-gray-700 mb-2">Lokasi</label>
                <input
                    type="text"
                    value={data.location}
                    onChange={(e) => setData('location', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                       placeholder="Contoh: Banyuwangi Selatan"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                {/* Spot */}
                <div>
                <label className="block text-gray-700 mb-2">Spot Wisata</label>
                <input
                    type="text"
                    value={data.spot}
                    onChange={(e) => setData('spot', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Contoh: Pantai"
                />
                {errors.spot && <p className="text-red-500 text-sm mt-1">{errors.spot}</p>}
                </div>

                {/* Package */}
                <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Paket Lokasi Wisata</label>
                {data.package.map((pkg, index) => (
                    <div key={index} className="flex mb-2">
                    <input
                        type="text"
                        value={pkg}
                        onChange={(e) => {
                        const newPackages = [...data.package];
                        newPackages[index] = e.target.value;
                        setData('package', newPackages);
                        }}
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Contoh: Kawah Ijen"
                    />
                    {data.package.length > 1 && (
                        <button
                        type="button"
                        onClick={() => removeField('package', index)}
                        className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                        Hapus
                        </button>
                    )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addField('package')}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Tambah Paket
                </button>
                {errors.package && <p className="text-red-500 text-sm mt-1">{errors.package}</p>}
                </div>

                {/* Rundown */}
                <div className="md:col-span-2">
                  
                <label className="block text-gray-700 mb-2">Rundown Kegiatan</label>
                  <div className="text-sm text-gray-600 mb-2">
                  * Isi dengan format waktu - deskripsi kegiatan (misal: 13:00 - 14:00 Berangkat)
                    </div>
                {data.rundown.map((item, index) => (
                    <div key={index} className="flex mb-2">
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                        const newRundowns = [...data.rundown];
                        newRundowns[index] = e.target.value;
                        setData('rundown', newRundowns);
                        }}
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    {data.rundown.length > 1 && (
                        <button
                        type="button"
                        onClick={() => removeField('rundown', index)}
                        className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                        Hapus
                        </button>
                    )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addField('rundown')}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Tambah Rundown
                </button>
                {errors.rundown && <p className="text-red-500 text-sm mt-1">{errors.rundown}</p>}
                </div>

                {/* Price */}
                <div className="md:col-span-2">
                  
                <label className="block text-gray-700 mb-2">Harga Paket</label>
                  <div className="text-sm text-gray-600 mb-2">
                  * Contoh input harga: 1500000
                    </div>
                {data.price.map((prc, index) => (
                    <div key={index} className="flex mb-2">
                    <input
                        type="text"
                        value={prc}
                        
                        onChange={(e) => {
                        const newPrices = [...data.price];
                        newPrices[index] = e.target.value;
                        setData('price', newPrices);
                        }}
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    {data.price.length > 1 && (
                        <button
                        type="button"
                        onClick={() => removeField('price', index)}
                        className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                        Hapus
                        </button>
                    )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addField('price')}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Tambah Harga
                </button>
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>

                {/* Duration */}
                <div>
                <label className="block text-gray-700 mb-2">Durasi</label>
                <input
                    type="text"
                    value={data.duration}
                    onChange={(e) => setData('duration', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Contoh: 3 Hari 2 Malam"
                />
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                </div>
            </div>
    
            {/* ... (bagian form yang sudah ada tetap sama) ... */}

            {/* Bagian Upload Gambar Sederhana */}
            <div className="mt-6">
            <label className="block text-gray-700 mb-2">Gambar Destinasi</label>
            
            {/* Input File Standar */}
            <div className="flex items-center">
                <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="mt-2 text-sm text-gray-600">Pilih Gambar</span>
                <input 
                    type="file" 
                    onChange={handleImageUpload}
                    className="hidden"
                    multiple
                    accept="image/*"
                />
                </label>
                
                <span className="ml-4 text-sm text-gray-500">
                Format: JPG, PNG (Maks. 2MB per gambar)
                </span>
            </div>
                    </div>
            {/* Preview Gambar */}
        {Array.isArray(previewImages) && previewImages.length > 0 && (
    <div className="mt-4">
        <div className="flex flex-wrap gap-4">
            {previewImages.map((image, index) => (
                <div key={index} className="relative group">
                    <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="h-32 w-32 object-cover rounded-lg border"
                    />
                    <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Hapus gambar"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
        <p className="mt-2 text-sm text-gray-500">
            {previewImages.length} gambar dipilih
        </p>
    </div>
)}

        
            <div className="mt-8">
                <button
                type="submit"
                disabled={processing}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 w-full md:w-auto"
                >
                {processing ? 'Menyimpan...' : 'Simpan Destinasi'}
                </button>
            </div>
            </form>
        </div>
        </AdminLayout>
    );
    };

    export default DestinationForm;