import React, { useState, useRef } from 'react';
import { Upload, Camera, ShieldCheck, CheckCircle, FileText, UserSquare2 } from 'lucide-react';
import { User } from '../types';

interface KYCProps {
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
}

export const KYC: React.FC<KYCProps> = ({ user, onUpdateUser }) => {
  const [step, setStep] = useState(1);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Simulated OTP State
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Camera permission denied");
    }
  };

  const captureFace = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      setCapturedImage(canvas.toDataURL());
      // Stop stream
      videoStream?.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    }
  };

  const verifyFace = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onUpdateUser({ isFaceVerified: true });
      setStep(3);
    }, 2000);
  };

  const verifyOTP = () => {
    if (otp === '1234') { // Mock OTP
       onUpdateUser({ isKycVerified: true });
       alert("KYC Approved!");
    } else {
       alert("Invalid OTP (Use 1234)");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <ShieldCheck className="text-primary" />
          Identity Verification
        </h2>
        <p className="text-gray-500 mb-8">Complete your KYC to unlock withdrawals and higher earnings.</p>

        {/* Steps Indicator */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10"></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
        </div>

        {/* Step 1: Documents */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
             <h3 className="text-lg font-semibold text-gray-700">Document Upload</h3>
             <div className="grid md:grid-cols-2 gap-4">
               <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
                 <UserSquare2 className="h-8 w-8 text-gray-400 mb-2"/>
                 <span className="text-sm font-medium text-gray-600">Upload Aadhar Card (Front)</span>
                 <input type="file" className="hidden" />
               </div>
               <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
                 <FileText className="h-8 w-8 text-gray-400 mb-2"/>
                 <span className="text-sm font-medium text-gray-600">Upload Study Certificate</span>
                 <input type="file" className="hidden" />
               </div>
             </div>
             <button 
                onClick={() => setStep(2)}
                className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors"
              >
                Continue to Face Verify
              </button>
          </div>
        )}

        {/* Step 2: Face Verify */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in text-center">
            <h3 className="text-lg font-semibold text-gray-700">Face Verification</h3>
            
            {!capturedImage ? (
              <div className="relative w-full max-w-sm mx-auto aspect-video bg-black rounded-lg overflow-hidden">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
                {!videoStream && (
                   <div className="absolute inset-0 flex items-center justify-center">
                     <button onClick={startCamera} className="bg-primary px-4 py-2 rounded-full text-white flex items-center gap-2">
                       <Camera className="w-4 h-4" /> Enable Camera
                     </button>
                   </div>
                )}
                {videoStream && (
                   <button onClick={captureFace} className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 rounded-full font-bold">
                     Capture
                   </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <img src={capturedImage} alt="Captured" className="w-full max-w-sm mx-auto rounded-lg" />
                <button onClick={() => setCapturedImage(null)} className="text-sm text-red-500 underline">Retake</button>
              </div>
            )}

            {capturedImage && (
              <button 
                onClick={verifyFace}
                disabled={isVerifying}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50"
              >
                {isVerifying ? 'Verifying...' : 'Submit Verification'}
              </button>
            )}
          </div>
        )}

        {/* Step 3: OTP */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
             <h3 className="text-lg font-semibold text-gray-700">Final Verification</h3>
             {user.isFaceVerified && <div className="p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2"><CheckCircle className="w-4 h-4"/> Face Verified Successfully</div>}
             
             {!otpSent ? (
                <button onClick={() => setOtpSent(true)} className="w-full bg-secondary text-white py-3 rounded-lg">
                  Send OTP to Mobile
                </button>
             ) : (
                <div className="space-y-4">
                   <p className="text-sm text-gray-500">OTP sent to {user.mobile}</p>
                   <input 
                      type="text" 
                      placeholder="Enter OTP (Use 1234)"
                      className="w-full px-4 py-2 border rounded-lg text-center tracking-widest text-xl"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                   />
                   <button onClick={verifyOTP} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
                     Complete KYC
                   </button>
                </div>
             )}
          </div>
        )}

        {user.isKycVerified && (
           <div className="mt-6 p-4 bg-green-100 border border-green-200 rounded-xl text-center">
             <h3 className="text-xl font-bold text-green-800">Account Verified!</h3>
             <p className="text-green-700">You are now eligible for all premium tasks and withdrawals.</p>
           </div>
        )}
      </div>
    </div>
  );
};