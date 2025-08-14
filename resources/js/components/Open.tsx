import React, { useState } from "react";
import ot1 from "./assets/img/ot-1.svg";
import ot2 from "./assets/img/ot-2.svg";
import ot3 from "./assets/img/ot-4.svg";
import ot4 from "./assets/img/ot-3.svg";

interface Destination {
  id: number;
  location: string;
  spot: string;
  package: string[];
  rundown: string[];
  price: string[];
  duration: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    location: "Banyuwangi Indah",
    spot: "Package Tour",
    package: ["Tidak termasuk: hotel, optional tour, transportasi boat"],
    rundown: [
      "Hari 1: Penjemputan di meeting point, tour, makan siang, c/o hotel free time",
      "Hari 2: Sarapan, tour, makan malam, kembali ke hotel free time",
      "Hari 3: Sarapan, tour, makan siang, persiapan tour Kawah Ijen",
      "Hari 4: Tour Kawah Ijen, sarapan, perjalanan kembali",
    ],
    price: [
      "2 orang: Rp. 3.220.000/pax",
      "4 orang: Rp. 2.125.000/pax",
      "8 orang: Rp. 2.070.000/pax",
      "10 orang: Rp. 2.100.000/pax",
    ],
    duration: "4 Hari 3 Malam",
  },
  {
    id: 2,
    location: "Private Land Tour",
    spot: "Package Tour",
    package: [
      "Termasuk: Lokal guide, transportasi, tiket masuk wisata, makan & snack",
    ],
    rundown: [
      "Hari 1: Penjemputan, tour, makan siang, free time",
      "Hari 2: Sarapan, tour, makan malam, free time",
      "Hari 3: Tour Kawah Ijen, perjalanan kembali",
    ],
    price: [
      "2 orang: Rp. 2.750.000/pax",
      "4 orang: Rp. 1.625.000/pax",
      "8 orang: Rp. 1.570.000/pax",
      "10 orang: Rp. 1.600.000/pax",
    ],
    duration: "3 Hari 2 Malam",
  },
  {
    id: 3,
    location: "Turtle Trip (Sukomade Beach)",
    spot: "Package Tour",
    package: [
      "Termasuk: Lokal guide, transportasi sesuai pax, tiket masuk wisata, makan & snack",
    ],
    rundown: [
      "Hari 1: Penjemputan, tour, makan siang, free time",
      "Hari 2: Tour Kawah Ijen, perjalanan kembali",
    ],
    price: [
      "2 orang: Rp. 1.700.000/pax",
      "4 orang: Rp. 1.125.000/pax",
      "8 orang: Rp. 1.000.000/pax",
      "10 orang: Rp. 1.100.000/pax",
    ],
    duration: "2 Hari 1 Malam",
  },
  {
    id: 4,
    location: "Banyuwangi Sesukamu",
    spot: "Package Tour",
    package: [
      "Termasuk: Lokal guide, transportasi sesuai pax, tiket masuk wisata, makan & snack",
    ],
    rundown: ["Menyesuaikan tempat dan waktu"],
    price: [
      "2 orang: Rp. 1.700.000/pax",
      "4 orang: Rp. 1.125.000/pax",
      "8 orang: Rp. 1.000.000/pax",
      "10 orang: Rp. 1.100.000/pax",
    ],
    duration: "2 Hari 1 Malam",
  },
];

const images: string[] = [ot1, ot2, ot3, ot4];

const Open: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number>(4);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const showMore = (): void => {
    setVisibleCards((prev) => prev + 4);
  };

  const showLess = (): void => {
    setVisibleCards(4);
  };

  const openModal = (content: string): void => {
    setModalContent(content);
  };

  const closeModal = (): void => {
    setModalContent(null);
  };

  return (
    <div id="opentrip" className="bg-blue-50 py-16">
      {/* Section 2: Popular Travel */}
      <div className="text-center py-10">
        <h2 className="text-4xl font-bold text-gray-800">Open Trip</h2>
        <p className="text-gray-500 mt-4">
          Explore breathtaking destinations and travel like never before
        </p>
      </div>

      {/* Section 3: Cards */}
      <div className="card w-11/12 md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {destinations.slice(0, visibleCards).map((destination, index) => (
          <div
            key={`${destination.id}-${index}`}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300"
          >
            <img
              src={images[index % images.length]}
              alt={`${destination.spot}, ${destination.location}`}
              className="w-full h-2/3 object-cover"
            />
            <div className="p-4 text-center min-h-[280px]">
              <h3 className="text-lg font-semibold text-gray-800">
                {destination.location}
              </h3>
              <p className="text-gray-500 mb-2">{destination.spot}</p>
              <p className="text-gray-700 font-medium">
                <span className="text-blue-500 font-bold">Package:</span>{" "}
                <button
                  onClick={() => openModal(destination.package.join("\n"))}
                  className="text-blue-500"
                >
                  See package
                </button>
              </p>
              <p className="text-gray-700 mt-2">
                <span className="text-blue-500 font-bold">Rundown:</span>{" "}
                <button
                  onClick={() => openModal(destination.rundown.join("\n"))}
                  className="text-blue-500"
                >
                  See rundown
                </button>
              </p>
              <p className="text-gray-700 mt-2">
                <span className="text-blue-500 font-bold">Duration:</span>{" "}
                <button
                  onClick={() => openModal(destination.duration)}
                  className="text-blue-500"
                >
                  See duration
                </button>
              </p>
              <p className="text-gray-700 mt-2">
                <span className="text-blue-500 font-bold">Price:</span>{" "}
                <button
                  onClick={() => openModal(destination.price.join("\n"))}
                  className="text-blue-500"
                >
                  See price
                </button>
              </p>
              <button
                className="bg-blue-500 text-white py-2 mt-5 px-4 w-full rounded-md hover:bg-blue-600 transition duration-300"
                onClick={() => (window.location.href = "/linktree")}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More and Show Less Buttons */}
      <div className="text-center mt-8">
        {visibleCards < destinations.length && (
          <button
            onClick={showMore}
            className="bg-blue-500 text-white py-2 px-6 rounded-md mr-4 hover:bg-blue-600 transition duration-300"
          >
            Show More
          </button>
        )}
        {visibleCards > 4 && (
          <button
            onClick={showLess}
            className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition duration-300"
          >
            Show Less
          </button>
        )}
      </div>

      {/* Modal Pop-up */}
      {modalContent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Details</h3>
            <p className="text-gray-700 whitespace-pre-line">{modalContent}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Open;
