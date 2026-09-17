import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { motion, type Variants } from "framer-motion";

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function QrCheckIn() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const [cameraError, setCameraError] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        console.log("QR Code:", result.data);

        // API check-in will be added later.
      },
      {
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        returnDetailedScanResult: true,
        onDecodeError: () => {
          // Ignore normal frames where no QR code is detected.
        },
      }
    );

    scannerRef.current = scanner;

    scanner
      .start()
      .then(() => {
        setIsScanning(true);
        setCameraError(false);
      })
      .catch(() => {
        setCameraError(true);
        setIsScanning(false);
      });

    return () => {
      scanner.stop();
      scanner.destroy();
      scannerRef.current = null;
    };
  }, []);

  return (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-base-200 bg-base-100 p-8"
    >
      {/* Header */}
      <div className="mb-4 text-center">
        <h2 className="mb-2 text-xl font-bold font-display text-base-content">
          QR Code Check-In
        </h2>

        <p className="text-sm font-body text-base-content/50">
          Scan the QR code from the customer's booking confirmation.
        </p>
      </div>

      {/* Camera */}
      <div className="relative mx-auto mb-8 aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-neutral">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
        />

        {/* Camera Overlay */}
        {!cameraError && (
          <div className="pointer-events-none absolute inset-0">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Scan Frame */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-56 w-56">
                {/* Top Left */}
                <div className="absolute left-0 top-0 h-8 w-8 border-l-4 border-t-4 border-primary" />

                {/* Top Right */}
                <div className="absolute right-0 top-0 h-8 w-8 border-r-4 border-t-4 border-primary" />

                {/* Bottom Left */}
                <div className="absolute bottom-0 left-0 h-8 w-8 border-b-4 border-l-4 border-primary" />

                {/* Bottom Right */}
                <div className="absolute bottom-0 right-0 h-8 w-8 border-b-4 border-r-4 border-primary" />

                {/* Scan Line */}
                {isScanning && (
                  <motion.div
                    animate={{
                      y: [0, 208, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute left-2 right-2 top-2 h-0.5 bg-primary"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Camera Error */}
        {cameraError && (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <div>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error/10">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7 text-error"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                  <path d="m3 3 18 18" />
                </svg>
              </div>

              <p className="mb-1 font-semibold text-white">
                Camera unavailable
              </p>

              <p className="text-xs text-white/60">
                Please allow camera access for QR check-in.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Scanner Status */}
      <div className="mb-6 flex items-center justify-center gap-2 text-sm font-body">
        <span
          className={`h-2 w-2 rounded-full ${
            isScanning ? "bg-success" : "bg-base-content/20"
          }`}
        />

        <span className="text-base-content/50">
          {isScanning ? "Camera scanner active" : "Starting camera scanner..."}
        </span>
      </div>

      {/* Instructions */}
      <div className="rounded-xl bg-base-200 p-4 text-center">
        <p className="text-sm font-medium text-base-content">
          Position the QR code inside the frame
        </p>

        <p className="mt-1 text-xs text-base-content/50">
          The booking will be identified automatically when scanned.
        </p>
      </div>
    </motion.div>
  );
}
