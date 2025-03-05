
import React, { useState } from 'react';
import { Barcode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BarcodeScanner from '@/components/BarcodeScanner';
import { useNavigate } from 'react-router-dom';

interface QuickScanButtonProps {
  onScan?: (barcode: string) => void;
}

const QuickScanButton: React.FC<QuickScanButtonProps> = ({ onScan }) => {
  const [showScanner, setShowScanner] = useState(false);
  const navigate = useNavigate();

  const handleBarcodeScan = (barcode: string) => {
    setShowScanner(false);
    
    if (onScan) {
      onScan(barcode);
    } else {
      // If no callback provided, navigate to add food with barcode param
      navigate(`/add?barcode=${barcode}`);
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="fixed bottom-20 right-4 rounded-full w-12 h-12 shadow-md bg-[#FF7043] border-none text-white hover:bg-orange-600 z-20"
        onClick={() => setShowScanner(true)}
      >
        <Barcode className="h-5 w-5" />
      </Button>
      
      {showScanner && (
        <BarcodeScanner
          onDetected={handleBarcodeScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </>
  );
};

export default QuickScanButton;
