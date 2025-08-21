import { Head, useForm ,usePage} from '@inertiajs/react';
import axios from 'axios';
import { useState ,useEffect} from 'react';

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
declare global {
  interface Window {
    snap: any;
  }
}
  interface SnapPayResult {
    status_message?: string;
    [key: string]: any;
  }
interface Auth {
  user?: {
    id: number;
    name: string;
    // Tambahkan properti lainnya dari objek user jika diperlukan
  };
  // Jika ada properti lain di objek auth, tambahkan di sini
}
export default function DestinationDetail({ destination }: { destination: Destination }) {
     const { auth } = usePage<{ auth: Auth }>().props;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);  // Track loading state
  const [paymentError, setPaymentError] = useState<string | null>(null);  // Track payment errors
  const [paymentSuccess, setPaymentSuccess] = useState(false);  // Track successful payment
 const [snapToken, setSnapToken] = useState<string | null>(null);
 
  // Form handling with Inertia
  const { post } = useForm();  

  // Functions for image navigation
  const prevImage = () => setCurrentImageIndex(prevIndex => (prevIndex === 0 ? destination.images.length - 1 : prevIndex - 1));
  const nextImage = () => setCurrentImageIndex(prevIndex => (prevIndex === destination.images.length - 1 ? 0 : prevIndex + 1));
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", "Mid-client-qs4nyofjzY1xqzpC");
    script.async = true;
    
    script.onload = () => {
        console.log('Midtrans script loaded successfully');
    };
    
    script.onerror = () => {
        console.error('Failed to load Midtrans script');
    };
    
    document.body.appendChild(script);
    
    return () => {
        document.body.removeChild(script);
    };
}, []);
  // Handle package selection
  const handlePackageSelect = (index: number) => {
    setSelectedPackageIndex(index);
  };
  // Fungsi untuk mengonversi format harga string ke angka
const parsePrice = (priceString: string): number => {
  // Remove any characters that are not digits or commas (for thousands separator)
  const numericString = priceString.replace(/[^\d]/g, '');

  // Convert the cleaned numeric string to an integer
  const price = parseInt(numericString, 10);

  // If the result is NaN (invalid), return 0
  return isNaN(price) ? 0 : price;
};

// Kirim data pemesanan menggunakan `user_id` dari auth
// Ganti kode handleOrderSubmit dengan ini:
const handleOrderSubmit = async () => {
  if (selectedPackageIndex === null) {
    alert("Please select a package.");
    return;
  }

  setIsLoading(true);
  setPaymentError(null);

  try {
    const userId = auth.user?.id;
    if (!userId) {
      alert("User is not authenticated.");
      setIsLoading(false);
      return;
    }

    const payload = {
      destination_id: destination.id,
      package_id: selectedPackageIndex,
      price: parsePrice(destination.price[selectedPackageIndex]),
      user_id: userId,
    };
    console.log('payload price:', payload.price);
    // Gunakan axios/fetch langsung karena useForm mungkin tidak mengirim JSON
    const response = await axios.post('/api/orders', payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      }
    });

    if (response.data.snap_token) {
      setSnapToken(response.data.snap_token);
    } else {
      setPaymentError("Snap token is missing");
      setIsLoading(false);
    }
  } catch (error: any) {
    console.error('Order error:', error);
    setPaymentError(error.response?.data?.message || "An error occurred while processing your payment.");
    setIsLoading(false);
  }
};


useEffect(() => {
  if (snapToken) {
    window.snap.pay(snapToken as string, {
      onSuccess: function (result: SnapPayResult) {
        console.log('Payment Success:', result);
        setPaymentSuccess(true);
        setIsLoading(false);
      },
      onPending: function (result: SnapPayResult) {
        console.log('Payment Pending:', result);
        setIsLoading(false);
      },
      onError: function (result: SnapPayResult) {
        console.error('Payment Error:', result);
        setPaymentError(result.status_message ?? "An unknown error occurred.");
        setIsLoading(false);
      },
      onClose: function () {
        console.log('Payment Popup Closed');
        setIsLoading(false);
      }
    });
  }
}, [snapToken]);


  if (!destination) return <div>No destination data available</div>;

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <Head title={destination.name} />
      
      {/* Custom Header Section with Image Slider */}
      <header className="relative w-full h-[60vh] overflow-hidden">
        <div className="relative w-full h-full">
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
          <div className="lg:col-span-2">
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
                    className={`bg-white rounded-lg shadow-lg p-6 flex flex-col items-center cursor-pointer transition-transform transform ${selectedPackageIndex === index ? 'scale-105 border-2 border-blue-600' : ''}`}
                    onClick={() => handlePackageSelect(index)}
                  >
                    <h3 className="text-xl font-semibold mb-4">Paket {index + 1}</h3>
                    <p className="text-lg font-bold text-blue-600">Harga: {destination.price[index] || 'Hubungi kami'}</p>
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
                    <span className="mr-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-800">{index + 1}</span>
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
                  {selectedPackageIndex !== null ? destination.price[selectedPackageIndex] : 'Pilih Paket'}
                </p>
              </div>

              {/* Booking Button */}
              <button
                onClick={handleOrderSubmit}
                disabled={isLoading}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 transition duration-300"
              >
                {isLoading ? "Processing..." : "Pesan Sekarang"}
              </button>

              {paymentError && <p className="mt-4 text-red-600">{paymentError}</p>}
              {paymentSuccess && <p className="mt-4 text-green-600">Payment successful! Your order is being processed.</p>}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 All rights reserved | Your Travel Agency</p>
        </div>
      </footer>
    </div>
  );
}
