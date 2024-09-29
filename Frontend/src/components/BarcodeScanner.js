import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';

export default function BarcodeScanner({ onDetected }) {
  const [error, setError] = useState('');

  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner-container'),
      },
      decoder: {
        readers: [
          "code_128_reader",
          "ean_reader",
          "ean_8_reader",
          "code_39_reader",
          "code_39_vin_reader",
          "codabar_reader",
          "upc_reader",
          "upc_e_reader",
          "i2of5_reader",
        ],
      },
    }, (err) => {
      if (err) {
        console.error(err);
        setError('Failed to initialize the scanner. Please check your camera permissions.');
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      onDetected(data.codeResult.code);
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div className="flex flex-col items-center">
      {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}
      <div
        id="scanner-container"
        className="border border-gray-300 rounded-lg shadow-md mb-4"
        style={{ width: '100%', maxWidth: '640px', height: '480px' }}
      ></div>
      <p className="text-gray-600 text-sm text-center">
        Point the camera at the barcode to scan it.
      </p>
    </div>
  );
}
