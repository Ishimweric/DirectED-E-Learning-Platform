// src/pages/CertificatePage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
// import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { FiDownload } from 'react-icons/fi';
import { getCertificate } from '../services/api';
// import { useAuth } from '../contexts/AuthContext';

interface CertificateData {
  _id: string;
  student: {
    firstName: string;
    lastName: string;
  };
  course: {
    title: string;
  };
  issuedAt: string;
  verificationCode: string;
}

const CertificatePage: React.FC = () => {
  const { verificationCode } = useParams<{ verificationCode: string }>();
  // const { user } = useAuth();
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!verificationCode) return;
      
      try {
        const response = await getCertificate(verificationCode);
        setCertificate(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch certificate');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [verificationCode]);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        useCORS: true,
        scale: 2 // Higher quality
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `DirectEd-Certificate-${certificate?.verificationCode}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error downloading certificate:', err);
      setError('Failed to download certificate');
    }
  };

  if (loading) return <div className="flex justify-center py-12 dark:text-white text-slate-950 animate-pulse">Loading certificate...</div>;
  if (error) return <div className="text-red-500 text-center py-12">Error: {error}</div>;
  if (!certificate) return <div className="text-center py-12">Certificate not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Your Certificate</h1>
            <p className="text-gray-600 mt-2">
              Congratulations on completing your course!
            </p>
          </div>

          {/* Certificate */}
          <div className="mb-6 relative">
            <div 
              ref={certificateRef}
              className="bg-white border-2 border-gold p-8 rounded-lg shadow-lg"
              style={{
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("/api/placeholder/800/600")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Certificate Design */}
              <div className="text-center py-8 px-4">
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-4xl font-serif font-bold text-blue-800 mb-2">CERTIFICATE OF ACHIEVEMENT</h2>
                  <div className="w-32 h-1 bg-blue-600 mx-auto"></div>
                </div>

                {/* Body */}
                <div className="mb-8">
                  <p className="text-gray-600 mb-2">This certifies that</p>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    {certificate.student.firstName} {certificate.student.lastName}
                  </h3>
                  <p className="text-gray-600 mb-4">has successfully completed the course</p>
                  <h4 className="text-2xl font-semibold text-blue-700 mb-6">
                    {certificate.course.title}
                  </h4>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-12">
                  <div className="text-center">
                    <div className="w-32 h-0.5 bg-gray-400 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="text-gray-800">
                      {new Date(certificate.issuedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-32 h-0.5 bg-gray-400 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Verification Code</p>
                    <p className="text-gray-800 font-mono">{certificate.verificationCode}</p>
                  </div>
                </div>

                {/* DirectEd Logo */}
                <div className="mt-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xl">DE</span>
                  </div>
                  <p className="text-blue-600 font-semibold">DirectEd Learning Platform</p>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center">
            <button
              onClick={downloadCertificate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center mx-auto"
            >
              <FiDownload className="h-5 w-5 mr-2" />
              Download Certificate
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              Share your achievement with others! Your certificate can be verified using the code:{" "}
              <span className="font-mono">{certificate.verificationCode}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;