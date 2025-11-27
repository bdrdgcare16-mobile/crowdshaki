// "use client";
// import React, { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { pharmaciesDetails, sendOTP, verifyOTP } from "../../../actions/pharmaciesDetails";
// import Navbar from "../../../components/Navbar";
// import { toast } from "react-toastify";
// import Footer from "../../../components/Footer";
// import useAuthStore from "../../../store/authStore"

// const pharmacyForm = () => {
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [formData, setFormData] = useState({
//     //pharmacyName
//     pharmacyName: "",

//     //contact details
//     email: "",
//     mobile: "",
//     address: "",
//     pincode: "",

//     //lab details
//     pharmacyType: "",
//     yearsOfOperation: "",

//     //lab license & accreditation
//     pharmacyLicenseNumber: "",
//     dateOfIssue: "",
//     issuingAuthority: "",

//     //services provided
//     serviceTypes: "",
//     specialTests: "",
//     facilities: "",

//     //compliance
//     compliantOrnot: "",
//   });

//   const { isAuthenticated, user, logout } = useAuthStore();

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevValues) => ({ ...prevValues, [name]: value }));
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault(); // Prevent the form from submitting on load/reload

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       data.append(key, value);
//     });

//     if (!otpSent) {
//       const otpHasSent = await sendOTP(user?.email, user?.phone)
//       if (otpHasSent.success == true) {
//         setOtpSent(true)
//       }
//     } else {
//       const verifyingOTP = await verifyOTP(user?.email, otp)
//       if (verifyingOTP.success == true) {

//         const res = await pharmaciesDetails(data);
//         if (
//           (res)
//         ) {
//           toast.success("Updated Successfully", {
//             position: "bottom-right",
//             autoClose: 4000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "dark",
//           });

//           setFormData({
//             pharmacyName: "",

//             //contact details
//             email: "",
//             mobile: "",
//             address: "",
//             pincode: "",

//             //lab details
//             pharmacyType: "",
//             yearsOfOperation: "",

//             //lab license & accreditation
//             pharmacyLicenseNumber: "",
//             dateOfIssue: "",
//             issuingAuthority: "",

//             //services provided
//             serviceTypes: "",
//             specialTests: "",
//             facilities: "",

//             //compliance
//             compliantOrnot: "",
//           })
//         }
//         else {
//           toast.error("Something went wrong", {
//             position: "bottom-right",
//             autoClose: 4000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "dark",
//           });
//         }
//       }
//     }
//   };

//   return (
//     <main className="md:px-8 md:py-4 shadow-xl md:border-2 md:border-gray-200">
//       <Navbar></Navbar>
//       <h1 className="font-semibold text-[24px] my-8 lg:text-[28px] xl:text-[34px] leading-tight text-black text-center md:text-center">
//         Fill the form! Become a Member!
//       </h1>
//       <div className="p-4 md:flex md:flex-row md:justify-center md:items-center">
//         <form onSubmit={handleSubmit}>
//           {/* pharmacyName */}
//           <h1 className="my-8 text-2xl font-semibold">1. Pharmacy Details</h1>
//           <div className="m-2 flex flex-col gap-4">
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label htmlFor="pharmacyName" className="block font-medium mb-2">
//                   Pharmacy Name
//                 </label>
//                 <input
//                   type="text"
//                   name="pharmacyName"
//                   id="pharmacyName"
//                   placeholder="Enter your pharmacy name"
//                   value={formData.pharmacyName}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
//           </div>
//           {/* contact details */}
//           <h1 className="my-8 text-2xl font-semibold">2. Contact Details</h1>
//           <div className="m-2 flex flex-col gap-4">
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label htmlFor="email" className="block font-medium mb-2">
//                   Email ID
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   placeholder="Enter your email ID"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="mobile" className="block font-medium mb-2">
//                   Mobile Number
//                 </label>
//                 <input
//                   type="number"
//                   name="mobile"
//                   id="mobile"
//                   placeholder="Enter your mobile number"
//                   value={formData.mobile}
//                   onChange={handleInputChange}
//                   required
//                   maxLength={10}
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="m-2 flex flex-col gap-4">
//             <div>
//               <label htmlFor="address" className="block font-medium mb-2">
//                 Address
//               </label>
//               <input
//                 type="text"
//                 name="address"
//                 id="address"
//                 placeholder="Enter your address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//               />
//             </div>
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label htmlFor="pincode" className="block font-medium mb-2">
//                   Pincode
//                 </label>
//                 <input
//                   type="number"
//                   name="pincode"
//                   id="pincode"
//                   placeholder="Enter your pincode"
//                   value={formData.pincode}
//                   onChange={handleInputChange}
//                   required
//                   maxLength={6}
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
//             {/* lab details */}
//             <h1 className="my-8 text-2xl font-semibold">3. Business Details</h1>
//             <div className=" flex flex-col gap-4">
//               <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//                 <div>
//                   <label htmlFor="pharmacyType" className="block font-medium mb-2">
//                     Lab type
//                   </label>
//                   <select
//                     name="pharmacyType"
//                     id="pharmacyType"
//                     value={formData.pharmacyType}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                   >
//                     <option value="" disabled>
//                       Select your choice
//                     </option>
//                     <option value="independent">Independent</option>
//                     <option value="franchise">Franchise</option>
//                     {/* <option value="others">Others</option> */}
//                   </select>
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="yearsOfOperation"
//                     className="block font-medium mb-2"
//                   >
//                     Years of Operation
//                   </label>
//                   <input
//                     type="number"
//                     name="yearsOfOperation"
//                     id="yearsOfOperation"
//                     placeholder="Enter the years of operation"
//                     value={formData.yearsOfOperation}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                   />
//                 </div>
//               </div>
//             </div>
//             <h1 className="my-8 text-2xl font-semibold">
//               4. Pharmacy License & Accreditation
//             </h1>
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label
//                   htmlFor="pharmacyLicenseNumber"
//                   className="block font-medium mb-2"
//                 >
//                   Pharmacy License Number
//                 </label>
//                 <input
//                   type="number"
//                   name="pharmacyLicenseNumber"
//                   id="pharmacyLicenseNumber"
//                   placeholder="Enter the license number"
//                   value={formData.pharmacyLicenseNumber}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="dateOfIssue" className="block font-medium mb-2">
//                   Date of Issue
//                 </label>
//                 <input
//                   type="text"
//                   name="dateOfIssue"
//                   id="dateOfIssue"
//                   placeholder="dd/mm/yyyy"
//                   value={formData.dateOfIssue}
//                   onChange={handleInputChange}
//                   required
//                   pattern="\d{2}/\d{2}/\d{4}"
//                   title="Enter the Pharmacy Issue date"
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label
//                   htmlFor="issuingAuthority"
//                   className="block font-medium mb-2"
//                 >
//                   Issuing Authority
//                 </label>
//                 <input
//                   type="text"
//                   name="issuingAuthority"
//                   id="issuingAuthority"
//                   placeholder="Enter the Issuing Authority Name"
//                   value={formData.issuingAuthority}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
//             {/* 3 dropdowns - services provided */}
//             <h1 className="my-8 text-2xl font-semibold">5. Services Provided</h1>
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40 mb-8">
//               {/* serviceTypes */}
//               <div>
//                 <label
//                   htmlFor="serviceTypes"
//                   className="block font-medium mb-2"
//                 >
//                   Service Type
//                 </label>

//                 <div className="space-y-2">
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Retail Pharmacy Services"
//                       className="mr-2"
//                     />
//                     Retail Pharmacy Services
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Over-the-Counter (OTC) Medicine Sales"
//                       className="mr-2"
//                     />
//                     Over-the-Counter (OTC) Medicine Sales
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Prescription Medicine Sales"
//                       className="mr-2"
//                     />
//                     Prescription Medicine Sales
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Medical Equipment Sales"
//                       className="mr-2"
//                     />
//                     Medical Equipment Sales
//                   </label>
//                 </div>
//               </div>

//               {/* specialTests */}
//               <div>
//                 <label
//                   htmlFor="serviceTypes"
//                   className="block font-medium mb-2"
//                 >
//                   Special Tests
//                 </label>

//                 <div className="space-y-2">
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="specialTests"
//                       value="Compounding Services"
//                       className="mr-2"
//                     />
//                     Compounding Services
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="specialTests"
//                       value="Home Delivery Services"
//                       className="mr-2"
//                     />
//                     Home Delivery Services
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="specialTests"
//                       value="Medical Consultation Services"
//                       className="mr-2"
//                     />
//                     Medical Consultation Services
//                   </label>
//                 </div>
//               </div>
//             </div>
//             {/* facilities */}
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label htmlFor="facilities" className="block font-medium mb-2">
//                   Facilities
//                 </label>

//                 <div className="space-y-2">
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Air-conditioned Storage"
//                       className="mr-2"
//                     />
//                     Air-conditioned Storage
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Refrigerated Storage for Samples"
//                       className="mr-2"
//                     />
//                     Refrigerated Storage for Samples
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Automated Dispensing Systems"
//                       className="mr-2"
//                     />
//                     Automated Dispensing Systems
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <h1 className="my-8 text-2xl font-semibold">6. Compliance and Quality Assurance</h1>
//             <div className=" flex flex-col gap-4">
//               <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//                 <div>
//                   <label
//                     htmlFor="compliantOrnot"
//                     className="block font-medium mb-2"
//                   >
//                     Are you Compliant to Government Regulations or not?
//                   </label>
//                   <select
//                     name="compliantOrnot"
//                     id="compliantOrnot"
//                     value={formData.compliantOrnot}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                   >
//                     <option value="" disabled>
//                       Select your choice
//                     </option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//             {!otpSent ? (
//               <button
//                 type="submit"
//                 className="w-[200px] p-4 bg-black text-white rounded-sm my-10 lg:w-[400px]"
//               >
//                 Submit
//               </button>
//             ) : (
//               <div className="flex flex-col">
//                 <input
//                   type="text"
//                   name="otp"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="w-[200px] p-4 border rounded-sm my-4 lg:w-[400px]"
//                 />
//                 <button
//                   type="submit"
//                   className="w-[200px] p-4 bg-black text-white rounded-sm my-10 lg:w-[400px]"
//                 >
//                   Verify OTP and Submit
//                 </button>
//               </div>
//             )}

//           </div>
//         </form>
//       </div>
//       <Footer></Footer>
//     </main>
//   );
// };

// export default pharmacyForm;




// "use client";
// import React, { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { pharmaciesDetails, sendOTP, verifyOTP } from "../../../actions/pharmaciesDetails";
// import Navbar from "../../../components/Navbar";
// import { toast } from "react-toastify";
// import Footer from "../../../components/Footer";
// import useAuthStore from "../../../store/authStore"

// const pharmacyForm = () => {
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [formData, setFormData] = useState({
//     // pharmacyName
//     pharmacyName: "",

//     // contact details
//     email: "",
//     mobile: "",
//     address: "",
//     pincode: "",

//     // lab details
//     pharmacyType: "",
//     yearsOfOperation: "",

//     // lab license & accreditation
//     pharmacyLicenseNumber: "",
//     dateOfIssue: "",
//     issuingAuthority: "",

//     // services provided (arrays)
//     serviceTypes: [] as string[],
//     specialTests: [] as string[],
//     facilities: [] as string[],

//     // compliance
//     compliantOrnot: "",
//   });

//   const { isAuthenticated, user, logout } = useAuthStore();

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value, type, checked } = e.target as HTMLInputElement;

//     // Checkbox handling for grouped checkbox fields
//     if (type === "checkbox") {
//       setFormData((prevValues) => {
//         // ensure the field is typed as array in our state
//         const prevArray = (prevValues as any)[name] as string[] || [];
//         if (checked) {
//           // add value if not already present
//           if (!prevArray.includes(value)) {
//             return { ...prevValues, [name]: [...prevArray, value] };
//           }
//           return prevValues;
//         } else {
//           // remove value
//           return { ...prevValues, [name]: prevArray.filter((v) => v !== value) };
//         }
//       });
//       return;
//     }

//     // For mobile: allow only digits and limit to 10
//     if (name === "mobile") {
//       const digitsOnly = value.replace(/\D/g, "");
//       const limited = digitsOnly.slice(0, 10);
//       setFormData((prevValues) => ({ ...prevValues, [name]: limited }));
//       return;
//     }

//     // For pincode: allow only digits and limit to 6
//     if (name === "pincode") {
//       const digitsOnly = value.replace(/\D/g, "");
//       const limited = digitsOnly.slice(0, 6);
//       setFormData((prevValues) => ({ ...prevValues, [name]: limited }));
//       return;
//     }

//     // For pharmacyLicenseNumber: allow alphanumeric, convert to uppercase
//     if (name === "pharmacyLicenseNumber") {
//       // allow alphanumeric and optionally keep hyphen; backend strips non-alnum anyway
//       const filtered = value.replace(/[^a-zA-Z0-9\- ]/g, "");
//       const upper = filtered.toUpperCase();
//       setFormData((prevValues) => ({ ...prevValues, [name]: upper }));
//       return;
//     }

//     // Default handling
//     setFormData((prevValues) => ({ ...prevValues, [name]: value }));
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault(); // Prevent the form from submitting on load/reload

//     // Build FormData: convert arrays to comma-separated strings
//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (Array.isArray(value)) {
//         // join arrays as comma separated string
//         data.append(key, value.join(", "));
//       } else {
//         data.append(key, value as string);
//       }
//     });

//     if (!otpSent) {
//       if (!user?.email || !user?.phone) {
//         toast.error("User email or phone missing. Please login or check your profile.", { position: "bottom-right" });
//         return;
//       }
//       const otpHasSent = await sendOTP(user?.email, user?.phone)
//       if (otpHasSent.success == true) {
//         setOtpSent(true)
//         toast.success("OTP sent to your phone", { position: "bottom-right" });
//       } else {
//         toast.error("Failed to send OTP. Try again.", { position: "bottom-right" });
//       }
//     } else {
//       if (!user?.email) {
//         toast.error("User email missing. Please login or check your profile.", { position: "bottom-right" });
//         return;
//       }
//       const verifyingOTP = await verifyOTP(user?.email, otp)
//       if (verifyingOTP.success == true) {

//         const res = await pharmaciesDetails(data);
//         if (res) {
//           toast.success("Updated Successfully", {
//             position: "bottom-right",
//             autoClose: 4000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "dark",
//           });

//           // reset form - keep arrays as empty arrays
//           setFormData({
//             pharmacyName: "",

//             email: "",
//             mobile: "",
//             address: "",
//             pincode: "",

//             pharmacyType: "",
//             yearsOfOperation: "",

//             pharmacyLicenseNumber: "",
//             dateOfIssue: "",
//             issuingAuthority: "",

//             serviceTypes: [],
//             specialTests: [],
//             facilities: [],

//             compliantOrnot: "",
//           });

//           setOtp("");
//           setOtpSent(false);
//         } else {
//           toast.error("Something went wrong", {
//             position: "bottom-right",
//             autoClose: 4000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "dark",
//           });
//         }
//       } else {
//         toast.error("Invalid or expired OTP", { position: "bottom-right" });
//       }
//     }
//   };

//   return (
//     <main className="md:px-8 md:py-4 shadow-xl md:border-2 md:border-gray-200">
//       <Navbar></Navbar>
//       <h1 className="font-semibold text-[24px] my-8 lg:text-[28px] xl:text-[34px] leading-tight text-black text-center md:text-center">
//         Fill the form! Become a Member!
//       </h1>
//       <div className="p-4 md:flex md:flex-row md:justify-center md:items-center">
//         <form onSubmit={handleSubmit}>
//           {/* pharmacyName */}
//           <h1 className="my-8 text-2xl font-semibold">1. Pharmacy Details</h1>
//           <div className="m-2 flex flex-col gap-4">
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label htmlFor="pharmacyName" className="block font-medium mb-2">
//                   Pharmacy Name
//                 </label>
//                 <input
//                   type="text"
//                   name="pharmacyName"
//                   id="pharmacyName"
//                   placeholder="Enter your pharmacy name"
//                   value={formData.pharmacyName}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
//           </div>
//           {/* contact details */}
//           <h1 className="my-8 text-2xl font-semibold">2. Contact Details</h1>
//           <div className="m-2 flex flex-col gap-4">
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label htmlFor="email" className="block font-medium mb-2">
//                   Email ID
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   placeholder="Enter your email ID"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="mobile" className="block font-medium mb-2">
//                   Mobile Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="mobile"
//                   id="mobile"
//                   placeholder="Enter your mobile number"
//                   value={formData.mobile}
//                   onChange={handleInputChange}
//                   required
//                   maxLength={10}
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="m-2 flex flex-col gap-4">
//             <div>
//               <label htmlFor="address" className="block font-medium mb-2">
//                 Address
//               </label>
//               <input
//                 type="text"
//                 name="address"
//                 id="address"
//                 placeholder="Enter your address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//               />
//             </div>
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label htmlFor="pincode" className="block font-medium mb-2">
//                   Pincode
//                 </label>
//                 <input
//                   type="tel"
//                   name="pincode"
//                   id="pincode"
//                   placeholder="Enter your pincode"
//                   value={formData.pincode}
//                   onChange={handleInputChange}
//                   required
//                   maxLength={6}
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
//             {/* lab details */}
//             <h1 className="my-8 text-2xl font-semibold">3. Business Details</h1>
//             <div className=" flex flex-col gap-4">
//               <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//                 <div>
//                   <label htmlFor="pharmacyType" className="block font-medium mb-2">
//                     Lab type
//                   </label>
//                   <select
//                     name="pharmacyType"
//                     id="pharmacyType"
//                     value={formData.pharmacyType}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                   >
//                     <option value="" disabled>
//                       Select your choice
//                     </option>
//                     <option value="independent">Independent</option>
//                     <option value="franchise">Franchise</option>
//                     {/* <option value="others">Others</option> */}
//                   </select>
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="yearsOfOperation"
//                     className="block font-medium mb-2"
//                   >
//                     Years of Operation
//                   </label>
//                   <input
//                     type="number"
//                     name="yearsOfOperation"
//                     id="yearsOfOperation"
//                     placeholder="Enter the years of operation"
//                     value={formData.yearsOfOperation}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                   />
//                 </div>
//               </div>
//             </div>
//             <h1 className="my-8 text-2xl font-semibold">
//               4. Pharmacy License & Accreditation
//             </h1>
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label
//                   htmlFor="pharmacyLicenseNumber"
//                   className="block font-medium mb-2"
//                 >
//                   Pharmacy License Number
//                 </label>
//                 <input
//                   type="text"
//                   name="pharmacyLicenseNumber"
//                   id="pharmacyLicenseNumber"
//                   placeholder="Enter the license number (e.g., AB1234)"
//                   value={formData.pharmacyLicenseNumber}
//                   onChange={handleInputChange}
//                   required
//                   pattern="[A-Za-z0-9\- ]+"
//                   title="Only letters, numbers, hyphen and spaces allowed"
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="dateOfIssue" className="block font-medium mb-2">
//                   Date of Issue
//                 </label>
//                 <input
//                   type="text"
//                   name="dateOfIssue"
//                   id="dateOfIssue"
//                   placeholder="dd/mm/yyyy"
//                   value={formData.dateOfIssue}
//                   onChange={handleInputChange}
//                   required
//                   pattern="\d{2}/\d{2}/\d{4}"
//                   title="Enter the Pharmacy Issue date"
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label
//                   htmlFor="issuingAuthority"
//                   className="block font-medium mb-2"
//                 >
//                   Issuing Authority
//                 </label>
//                 <input
//                   type="text"
//                   name="issuingAuthority"
//                   id="issuingAuthority"
//                   placeholder="Enter the Issuing Authority Name"
//                   value={formData.issuingAuthority}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
//             {/* 3 dropdowns - services provided */}
//             <h1 className="my-8 text-2xl font-semibold">5. Services Provided</h1>
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40 mb-8">
//               {/* serviceTypes */}
//               <div>
//                 <label
//                   htmlFor="serviceTypes"
//                   className="block font-medium mb-2"
//                 >
//                   Service Type
//                 </label>

//                 <div className="space-y-2">
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Retail Pharmacy Services"
//                       className="mr-2"
//                       checked={formData.serviceTypes.includes("Retail Pharmacy Services")}
//                       onChange={handleInputChange}
//                     />
//                     Retail Pharmacy Services
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Over-the-Counter (OTC) Medicine Sales"
//                       className="mr-2"
//                       checked={formData.serviceTypes.includes("Over-the-Counter (OTC) Medicine Sales")}
//                       onChange={handleInputChange}
//                     />
//                     Over-the-Counter (OTC) Medicine Sales
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Prescription Medicine Sales"
//                       className="mr-2"
//                       checked={formData.serviceTypes.includes("Prescription Medicine Sales")}
//                       onChange={handleInputChange}
//                     />
//                     Prescription Medicine Sales
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Medical Equipment Sales"
//                       className="mr-2"
//                       checked={formData.serviceTypes.includes("Medical Equipment Sales")}
//                       onChange={handleInputChange}
//                     />
//                     Medical Equipment Sales
//                   </label>
//                 </div>
//               </div>

//               {/* specialTests */}
//               <div>
//                 <label
//                   htmlFor="specialTests"
//                   className="block font-medium mb-2"
//                 >
//                   Special Tests
//                 </label>

//                 <div className="space-y-2">
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="specialTests"
//                       value="Compounding Services"
//                       className="mr-2"
//                       checked={formData.specialTests.includes("Compounding Services")}
//                       onChange={handleInputChange}
//                     />
//                     Compounding Services
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="specialTests"
//                       value="Home Delivery Services"
//                       className="mr-2"
//                       checked={formData.specialTests.includes("Home Delivery Services")}
//                       onChange={handleInputChange}
//                     />
//                     Home Delivery Services
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="specialTests"
//                       value="Medical Consultation Services"
//                       className="mr-2"
//                       checked={formData.specialTests.includes("Medical Consultation Services")}
//                       onChange={handleInputChange}
//                     />
//                     Medical Consultation Services
//                   </label>
//                 </div>
//               </div>
//             </div>
//             {/* facilities */}
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label htmlFor="facilities" className="block font-medium mb-2">
//                   Facilities
//                 </label>

//                 <div className="space-y-2">
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="facilities"
//                       value="Air-conditioned Storage"
//                       className="mr-2"
//                       checked={formData.facilities.includes("Air-conditioned Storage")}
//                       onChange={handleInputChange}
//                     />
//                     Air-conditioned Storage
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="facilities"
//                       value="Refrigerated Storage for Samples"
//                       className="mr-2"
//                       checked={formData.facilities.includes("Refrigerated Storage for Samples")}
//                       onChange={handleInputChange}
//                     />
//                     Refrigerated Storage for Samples
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="facilities"
//                       value="Automated Dispensing Systems"
//                       className="mr-2"
//                       checked={formData.facilities.includes("Automated Dispensing Systems")}
//                       onChange={handleInputChange}
//                     />
//                     Automated Dispensing Systems
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <h1 className="my-8 text-2xl font-semibold">6. Compliance and Quality Assurance</h1>
//             <div className=" flex flex-col gap-4">
//               <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//                 <div>
//                   <label
//                     htmlFor="compliantOrnot"
//                     className="block font-medium mb-2"
//                   >
//                     Are you Compliant to Government Regulations or not?
//                   </label>
//                   <select
//                     name="compliantOrnot"
//                     id="compliantOrnot"
//                     value={formData.compliantOrnot}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                   >
//                     <option value="" disabled>
//                       Select your choice
//                     </option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//             {!otpSent ? (
//               <button
//                 type="submit"
//                 className="w-[200px] p-4 bg-black text-white rounded-sm my-10 lg:w-[400px]"
//               >
//                 Submit
//               </button>
//             ) : (
//               <div className="flex flex-col">
//                 <input
//                   type="text"
//                   name="otp"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="w-[200px] p-4 border rounded-sm my-4 lg:w-[400px]"
//                 />
//                 <button
//                   type="submit"
//                   className="w-[200px] p-4 bg-black text-white rounded-sm my-10 lg:w-[400px]"
//                 >
//                   Verify OTP and Submit
//                 </button>
//               </div>
//             )}

//           </div>
//         </form>
//       </div>
//       <Footer></Footer>
//     </main>
//   );
// };

// export default pharmacyForm;




"use client";
import React, { useState } from "react";
import { pharmaciesDetails, sendOTP, verifyOTP } from "../../../actions/pharmaciesDetails";
import Navbar from "../../../components/Navbar";
import { toast } from "react-toastify";
import Footer from "../../../components/Footer";
import useAuthStore from "../../../store/authStore";

const PharmacyForm = () => {
  const [emailOTP, setEmailOTP] = useState("");
  const [mobileOTP, setMobileOTP] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [formPending, setFormPending] = useState(false);
  
  const [formData, setFormData] = useState({
    pharmacyName: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
    pharmacyType: "",
    yearsOfOperation: "",
    pharmacyLicenseNumber: "",
    dateOfIssue: "",
    issuingAuthority: "",
    serviceTypes: [] as string[],
    specialTests: [] as string[],
    facilities: [] as string[],
    compliantOrnot: "",
  });

  const { isAuthenticated, user } = useAuthStore();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const { checked } = e.target as HTMLInputElement;

    // Checkbox handling
    if (type === "checkbox") {
      setFormData((prev) => {
        const prevArray = (prev as any)[name] as string[] || [];
        if (checked) {
          if (!prevArray.includes(value)) {
            return { ...prev, [name]: [...prevArray, value] };
          }
          return prev;
        } else {
          return { ...prev, [name]: prevArray.filter((v) => v !== value) };
        }
      });
      return;
    }

    // Mobile: only digits, max 10
    if (name === "mobile") {
      const digitsOnly = value.replace(/\D/g, "");
      const limited = digitsOnly.slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: limited }));
      return;
    }

    // Pincode: only digits, max 6
    if (name === "pincode") {
      const digitsOnly = value.replace(/\D/g, "");
      const limited = digitsOnly.slice(0, 6);
      setFormData((prev) => ({ ...prev, [name]: limited }));
      return;
    }

    // License Number: alphanumeric + hyphen/space, uppercase
    if (name === "pharmacyLicenseNumber") {
      const filtered = value.replace(/[^a-zA-Z0-9\- ]/g, "");
      const upper = filtered.toUpperCase();
      setFormData((prev) => ({ ...prev, [name]: upper }));
      return;
    }

    // Default
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formPending) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        data.append(key, value.join(", "));
      } else {
        data.append(key, value as string);
      }
    });

    if (!otpSent) {
      // STEP 1: Send OTPs
      if (!formData.email || !formData.mobile) {
        toast.error("Please fill email and mobile number", { position: "bottom-right" });
        return;
      }

      setFormPending(true);
      const otpResult = await sendOTP(formData.email, formData.mobile);
      setFormPending(false);

      if (otpResult.success) {
        setOtpSent(true);
        toast.success("OTPs sent to your email and mobile!", {
          position: "bottom-right",
          autoClose: 5000,
        });
      } else {
        toast.error(otpResult.error || "Failed to send OTPs", {
          position: "bottom-right",
        });
      }
    } else {
      // STEP 2: Verify OTPs and submit
      if (emailOTP.length !== 6 || mobileOTP.length !== 6) {
        toast.error("Please enter both 6-digit OTPs", { position: "bottom-right" });
        return;
      }

      setFormPending(true);
      const verifyResult = await verifyOTP(formData.email, emailOTP, mobileOTP);

      if (verifyResult.success) {
        // Submit form
        const res = await pharmaciesDetails(data);
        setFormPending(false);

        if (res.success) {
          toast.success("Pharmacy registered successfully!", {
            position: "bottom-right",
            autoClose: 4000,
            theme: "dark",
          });

          // Reset form
          setFormData({
            pharmacyName: "",
            email: "",
            mobile: "",
            address: "",
            pincode: "",
            pharmacyType: "",
            yearsOfOperation: "",
            pharmacyLicenseNumber: "",
            dateOfIssue: "",
            issuingAuthority: "",
            serviceTypes: [],
            specialTests: [],
            facilities: [],
            compliantOrnot: "",
          });
          setEmailOTP("");
          setMobileOTP("");
          setOtpSent(false);
        } else {
          toast.error("Something went wrong", {
            position: "bottom-right",
            theme: "dark",
          });
        }
      } else {
        setFormPending(false);
        toast.error(verifyResult.error || "Invalid OTPs", {
          position: "bottom-right",
        });
      }
    }
  };

  return (
    <main className="md:px-8 md:py-4 shadow-xl md:border-2 md:border-gray-200">
      <Navbar />
      <h1 className="font-semibold text-[24px] my-8 lg:text-[28px] xl:text-[34px] leading-tight text-black text-center">
        Fill the form! Become a Member!
      </h1>
      <div className="p-4 md:flex md:flex-row md:justify-center md:items-center">
        <form onSubmit={handleSubmit}>
          {/* 1. Pharmacy Details */}
          <h1 className="my-8 text-2xl font-semibold">1. Pharmacy Details</h1>
          <div className="m-2 flex flex-col gap-4">
            <div>
              <label htmlFor="pharmacyName" className="block font-medium mb-2">
                Pharmacy Name
              </label>
              <input
                type="text"
                name="pharmacyName"
                id="pharmacyName"
                placeholder="Enter your pharmacy name"
                value={formData.pharmacyName}
                onChange={handleInputChange}
                required
                disabled={otpSent}
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              />
            </div>
          </div>

          {/* 2. Contact Details */}
          <h1 className="my-8 text-2xl font-semibold">2. Contact Details</h1>
          <div className="m-2 flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label htmlFor="email" className="block font-medium mb-2">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email ID"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={otpSent}
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
              <div>
                <label htmlFor="mobile" className="block font-medium mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  maxLength={10}
                  disabled={otpSent}
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block font-medium mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleInputChange}
                required
                disabled={otpSent}
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="pincode" className="block font-medium mb-2">
                Pincode
              </label>
              <input
                type="tel"
                name="pincode"
                id="pincode"
                placeholder="Enter 6-digit pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                required
                maxLength={6}
                disabled={otpSent}
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              />
            </div>
          </div>

          {/* 3. Business Details */}
          <h1 className="my-8 text-2xl font-semibold">3. Business Details</h1>
          <div className="m-2 flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label htmlFor="pharmacyType" className="block font-medium mb-2">
                  Pharmacy Type
                </label>
                <select
                  name="pharmacyType"
                  id="pharmacyType"
                  value={formData.pharmacyType}
                  onChange={handleInputChange}
                  required
                  disabled={otpSent}
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                >
                  <option value="" disabled>Select your choice</option>
                  <option value="independent">Independent</option>
                  <option value="franchise">Franchise</option>
                </select>
              </div>
              <div>
                <label htmlFor="yearsOfOperation" className="block font-medium mb-2">
                  Years of Operation
                </label>
                <input
                  type="number"
                  name="yearsOfOperation"
                  id="yearsOfOperation"
                  placeholder="Enter years of operation"
                  value={formData.yearsOfOperation}
                  onChange={handleInputChange}
                  required
                  disabled={otpSent}
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* 4. License & Accreditation */}
          <h1 className="my-8 text-2xl font-semibold">4. Pharmacy License & Accreditation</h1>
          <div className="m-2 flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label htmlFor="pharmacyLicenseNumber" className="block font-medium mb-2">
                  Pharmacy License Number
                </label>
                <input
                  type="text"
                  name="pharmacyLicenseNumber"
                  id="pharmacyLicenseNumber"
                  placeholder="e.g., PH123ABC"
                  value={formData.pharmacyLicenseNumber}
                  onChange={handleInputChange}
                  required
                  disabled={otpSent}
                  pattern="[A-Za-z0-9\- ]+"
                  title="Letters, numbers, hyphen and spaces allowed"
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
              <div>
                <label htmlFor="dateOfIssue" className="block font-medium mb-2">
                  Date of Issue
                </label>
                <input
                  type="text"
                  name="dateOfIssue"
                  id="dateOfIssue"
                  placeholder="dd/mm/yyyy"
                  value={formData.dateOfIssue}
                  onChange={handleInputChange}
                  required
                  disabled={otpSent}
                  pattern="\d{2}/\d{2}/\d{4}"
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
            </div>
            <div>
              <label htmlFor="issuingAuthority" className="block font-medium mb-2">
                Issuing Authority
              </label>
              <input
                type="text"
                name="issuingAuthority"
                id="issuingAuthority"
                placeholder="Enter issuing authority name"
                value={formData.issuingAuthority}
                onChange={handleInputChange}
                required
                disabled={otpSent}
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              />
            </div>
          </div>

          {/* 5. Services Provided */}
          <h1 className="my-8 text-2xl font-semibold">5. Services Provided</h1>
          <div className="m-2 flex flex-col gap-4 lg:flex-row lg:gap-40 mb-8">
            <div>
              <label className="block font-medium mb-2">Service Type</label>
              <div className="space-y-2">
                {[
                  "Retail Pharmacy Services",
                  "Over-the-Counter (OTC) Medicine Sales",
                  "Prescription Medicine Sales",
                  "Medical Equipment Sales",
                ].map((service) => (
                  <label key={service} className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value={service}
                      checked={formData.serviceTypes.includes(service)}
                      onChange={handleInputChange}
                      disabled={otpSent}
                      className="mr-2"
                    />
                    {service}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">Special Services</label>
              <div className="space-y-2">
                {[
                  "Compounding Services",
                  "Home Delivery Services",
                  "Medical Consultation Services",
                ].map((service) => (
                  <label key={service} className="flex items-center">
                    <input
                      type="checkbox"
                      name="specialTests"
                      value={service}
                      checked={formData.specialTests.includes(service)}
                      onChange={handleInputChange}
                      disabled={otpSent}
                      className="mr-2"
                    />
                    {service}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="m-2 flex flex-col gap-4">
            <div>
              <label className="block font-medium mb-2">Facilities</label>
              <div className="space-y-2">
                {[
                  "Air-conditioned Storage",
                  "Refrigerated Storage for Samples",
                  "Automated Dispensing Systems",
                ].map((facility) => (
                  <label key={facility} className="flex items-center">
                    <input
                      type="checkbox"
                      name="facilities"
                      value={facility}
                      checked={formData.facilities.includes(facility)}
                      onChange={handleInputChange}
                      disabled={otpSent}
                      className="mr-2"
                    />
                    {facility}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 6. Compliance */}
          <h1 className="my-8 text-2xl font-semibold">6. Compliance and Quality Assurance</h1>
          <div className="m-2 flex flex-col gap-4">
            <div>
              <label htmlFor="compliantOrnot" className="block font-medium mb-2">
                Are you Compliant to Government Regulations?
              </label>
              <select
                name="compliantOrnot"
                id="compliantOrnot"
                value={formData.compliantOrnot}
                onChange={handleInputChange}
                required
                disabled={otpSent}
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              >
                <option value="" disabled>Select your choice</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* OTP Section */}
          {!otpSent ? (
            <button
              type="submit"
              disabled={formPending}
              className="w-[200px] p-4 bg-black text-white rounded-sm my-10 lg:w-[400px] disabled:opacity-50"
            >
              {formPending ? "Sending OTPs..." : "Submit & Send OTPs"}
            </button>
          ) : (
            <div className="my-10">
              {/* Success Message */}
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      <strong>✅ OTPs sent successfully!</strong><br/>
                      Check your <strong>Email</strong> and <strong>Mobile</strong> for OTPs
                    </p>
                  </div>
                </div>
              </div>

              {/* Email OTP Input */}
              <div className="mb-4">
                <label htmlFor="emailOTP" className="block font-medium mb-2 text-purple-700">
                  📧 Email OTP
                </label>
                <input
                  type="text"
                  name="emailOTP"
                  id="emailOTP"
                  placeholder="Enter 6-digit Email OTP"
                  value={emailOTP}
                  onChange={(e) => setEmailOTP(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  required
                  className="w-full p-4 border-2 border-purple-300 rounded-lg lg:w-[400px] focus:border-purple-500 focus:outline-none"
                />
                <p className="text-sm text-gray-600 mt-1">Check your email inbox</p>
              </div>

              {/* Mobile OTP Input */}
              <div className="mb-6">
                <label htmlFor="mobileOTP" className="block font-medium mb-2 text-green-700">
                  📱 Mobile OTP
                </label>
                <input
                  type="text"
                  name="mobileOTP"
                  id="mobileOTP"
                  placeholder="Enter 6-digit Mobile OTP"
                  value={mobileOTP}
                  onChange={(e) => setMobileOTP(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  required
                  className="w-full p-4 border-2 border-green-300 rounded-lg lg:w-[400px] focus:border-green-500 focus:outline-none"
                />
                <p className="text-sm text-gray-600 mt-1">Check your SMS messages</p>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={formPending || emailOTP.length !== 6 || mobileOTP.length !== 6}
                className="w-full p-4 bg-green-600 text-white rounded-lg lg:w-[400px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition"
              >
                {formPending ? "Verifying OTPs..." : "Verify OTPs & Submit"}
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setEmailOTP("");
                  setMobileOTP("");
                }}
                className="w-full p-4 bg-gray-200 text-gray-700 rounded-lg lg:w-[400px] mt-4 hover:bg-gray-300 transition"
              >
                ← Back to Edit Form
              </button>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </main>
  );
};

export default PharmacyForm;