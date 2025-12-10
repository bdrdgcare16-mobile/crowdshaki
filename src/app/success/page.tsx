// "use client";
// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import confetti from 'canvas-confetti';

// const SuccessPage = () => {
//   const router = useRouter();

//   const handleHomeRedirect = () => {
//     router.push('/');
//   };

//   // Trigger confetti on page load
//   useEffect(() => {
//     const launchConfetti = () => {
//       confetti({
//         particleCount: 600,
//         spread: 600,
//         origin: { y: 0.1 },
//       });
//     };

//     launchConfetti();
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <div className="flex flex-col items-center justify-center gap-10 bg-white rounded-lg p-6 text-center">
//         <h1 className="text-7xl font-semibold text-green-600 mb-4">SUCCESS!</h1>
//         <p className="text-4xl text-gray-700 mb-6">
//           Hey there! Crowdshaki team has been notified of your signup request. 
//           You'll receive an email if your registration gets Approved or Rejected. 
//           Stay tuned!
//         </p>
//         <button
//           onClick={handleHomeRedirect}
//           className="w-[200px] px-10 py-5 text-white bg-[#0D9488] rounded-md hover:bg-white hover:border-2 hover:border-[#0D9488] hover:text-[#0D9488]"
//         >
//           Go to Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SuccessPage;




"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "User";
    const email = searchParams.get("email") || "";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                {/* Success Icon */}
                <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Account Created Successfully! 🎉
                </h1>
                <p className="text-gray-600 mb-6">
                    Welcome to Crowdshaki, <span className="font-semibold text-indigo-600">{name}</span>!
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                        📧 A verification email has been sent to <br />
                        <span className="font-semibold">{email}</span>
                    </p>
                </div>

                <div className="space-y-3">
                    <Link
                        href="/login"
                        className="block w-full py-3 px-4 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
                    >
                        Go to Login
                    </Link>
                    <Link
                        href="/"
                        className="block w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}