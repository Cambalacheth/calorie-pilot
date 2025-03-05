
import React, { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';
import { Button } from '@/components/ui/button';
import { X, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface BarcodeScannerProps {
  onDetected: (barcode: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onDetected, onClose }) => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startScanner = () => {
    if (scannerRef.current) {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            facingMode: "environment", // Use rear camera on mobile
          },
        },
        decoder: {
          readers: [
            "ean_reader",
            "ean_8_reader",
            "code_128_reader",
            "code_39_reader",
            "upc_reader",
            "upc_e_reader"
          ],
        },
      }, (err) => {
        if (err) {
          console.error("Error initializing Quagga:", err);
          setError("No se pudo iniciar la cámara. Verifica los permisos.");
          return;
        }
        
        Quagga.start();
        setScanning(true);
        setError(null);
      });

      // When a barcode is detected
      Quagga.onDetected((result) => {
        if (result && result.codeResult) {
          const code = result.codeResult.code;
          if (code) {
            // Play a success sound
            const successSound = new Audio('/beep.mp3');
            successSound.play().catch(() => console.log('Unable to play success sound'));
            
            // Vibrate if supported
            if (navigator.vibrate) {
              navigator.vibrate(200);
            }
            
            stopScanner();
            onDetected(code);
          }
        }
      });
    }
  };

  const stopScanner = () => {
    Quagga.stop();
    setScanning(false);
  };

  const restartScanner = () => {
    stopScanner();
    startScanner();
  };

  useEffect(() => {
    startScanner();
    
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="flex items-center justify-between p-4 bg-black text-white">
        <h2 className="text-lg font-semibold">Escáner de código de barras</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="relative flex-1 overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
            <p className="text-center mb-4">{error}</p>
            <Button onClick={restartScanner}>
              Intentar nuevamente
            </Button>
          </div>
        ) : (
          <>
            <div 
              ref={scannerRef} 
              className="absolute inset-0 overflow-hidden"
            />
            <div className="absolute inset-0 pointer-events-none">
              <div className="h-1/3 w-full bg-black opacity-50" />
              <div className="flex h-1/3">
                <div className="w-1/4 bg-black opacity-50" />
                <div className="w-1/2 border-2 border-[#FF7043]">
                  {scanning && (
                    <div className="h-0.5 w-full bg-[#FF7043] animate-scan" />
                  )}
                </div>
                <div className="w-1/4 bg-black opacity-50" />
              </div>
              <div className="h-1/3 w-full bg-black opacity-50" />
            </div>
          </>
        )}
      </div>
      
      <div className="p-4 bg-black text-white">
        <p className="text-sm mb-2 text-center">
          Coloca el código de barras en el centro del recuadro
        </p>
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={restartScanner}
            className="text-white border-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reiniciar cámara
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
