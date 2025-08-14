import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface Destination {
  id: number;
  name: string;
  subtitle: string;
  location: string;
  description: string;
  images: string[];
  package: string[];
  rundown: string[];
  price: string[];
  duration: string;
}

export default function DestinationDetail({ destination }: { destination: Destination }) {
  console.log(destination); // Log the destination object for debugging.

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState<number | null>(null);

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? destination.images.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === destination.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle package selection and update the selected package
  const handlePackageSelect = (index: number) => {
    setSelectedPackageIndex(index);
  };

  if (!destination) {
    return <div>No destination data available</div>;
  }

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <Head title={destination.name} />

      {/* Custom Header Section with Image Slider */}
      <header className="relative w-full h-[60vh] overflow-hidden">
        <div className="relative w-full h-full">
          {/* Displaying images in the slider */}
          {destination.images.length > 0 ? (
            <img
              src={destination.images[currentImageIndex]}
              alt={`${destination.name} ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-300"
            />
          ) : (
            <div className="text-white text-xl text-center mt-10">No images available</div>
          )}

          {/* Slider Controls */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
          >
            &#60;
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
          >
            &#62;
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Description Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Deskripsi Destinasi</h2>
              <p className="text-gray-800 text-lg">{destination.description}</p>
            </div>

            {/* Packages Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Pilih Paket</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {destination.price.map((pkg, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-lg shadow-lg p-6 flex flex-col items-center cursor-pointer transition-transform transform ${
                      selectedPackageIndex === index ? 'scale-105 border-2 border-blue-600' : ''
                    }`}
                    onClick={() => handlePackageSelect(index)}
                  >
                    <h3 className="text-xl font-semibold mb-4">Paket {index + 1}</h3>

                    <p className="text-lg font-bold text-blue-600">
                      Harga: {destination.price[index] || 'Hubungi kami'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rundown Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Rundown Kegiatan</h2>
              <ul className="space-y-3">
                {destination.rundown.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                      {index + 1}
                    </span>
                    <p className="text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Info Box */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Informasi Destinasi</h3>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-600">Lokasi</h4>
                <p className="text-gray-800">{destination.location}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-600">Durasi</h4>
                <p className="text-gray-800">{destination.duration}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-600">Kategori</h4>
                <p className="text-gray-800">{destination.subtitle}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-600">Harga</h4>
                <p className="text-2xl font-bold text-blue-600">
                  {selectedPackageIndex !== null
                    ? destination.price[selectedPackageIndex] || 'Hubungi kami'
                    : 'Pilih Paket'}
                </p>
              </div>

              {/* Booking Button */}
              <button className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 transition duration-300">
                Pesan Sekarang
              </button>

              <div className="mt-4 text-center text-sm text-gray-500">
                <p>Butuh bantuan? Hubungi kami di:</p>
                <a href="tel:+628123456789" className="text-blue-600 hover:underline">
                  +62 812-3456-789
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 All rights reserved | Your Travel Agency</p>
        </div>
      </footer>
    </div>
  );
}
