// "use client";
// import React, { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { labDetails, sendOTP, verifyOTP } from "../../../actions/labDetails";
// import Navbar from "../../../components/Navbar";
// import { toast } from "react-toastify";
// import Footer from "../../../components/Footer";
// import useAuthStore from "../../../store/authStore"
// import { send } from "process";

// const labForm = () => {
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [formPending, setFormPending] = useState(false);

//   const [formData, setFormData] = useState({
//     //labname
//     labName: "",

//     //contact details
//     ownerName: "",
//     email: "",
//     mobile: "",
//     address: "",
//     pincode: "",

//     //lab details
//     labType: "",
//     yearsOfOperation: "",

//     //lab license & accreditation
//     labLicenseNumber: "",
//     dateOfIssue: "",
//     issuingAuthority: "",

//     //services provided
//     serviceTypes: "",
//     specialTests: "",
//     facilities: "",

//     //staffs
//     pathologistCount: "",
//     technicianCount: "",

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

//         const res = await labDetails(data);
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
//             //labname
//             labName: "",

//             //contact details
//             ownerName: "",
//             email: "",
//             mobile: "",
//             address: "",
//             pincode: "",

//             //lab details
//             labType: "",
//             yearsOfOperation: "",

//             //lab license & accreditation
//             labLicenseNumber: "",
//             dateOfIssue: "",
//             issuingAuthority: "",

//             //services provided
//             serviceTypes: "",
//             specialTests: "",
//             facilities: "",

//             //staffs
//             pathologistCount: "",
//             technicianCount: "",

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
//           {/* labname */}
//           <h1 className="my-8 text-2xl font-semibold">1. Lab Details</h1>
//           <div className="m-2 md:ml-8 flex flex-col gap-4">
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label htmlFor="labName" className="block font-medium mb-2">
//                   Lab Name
//                 </label>
//                 <input
//                   type="text"
//                   name="labName"
//                   id="labName"
//                   placeholder="Enter your Lab name"
//                   value={formData.labName}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
//           </div>
//           {/* contact details */}
//           <h1 className="my-8 text-2xl font-semibold">2. Contact Details</h1>
//           <div className="m-2 md:ml-8 flex flex-col gap-4">
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label htmlFor="ownerName" className="block font-medium mb-2">
//                   Owner Name
//                 </label>
//                 <input
//                   type="text"
//                   name="ownerName"
//                   id="ownerName"
//                   placeholder="Enter your first name"
//                   value={formData.ownerName}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
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
//           <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
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
//           </div>
//           {/* lab details */}
//           <h1 className="my-8 text-2xl font-semibold">3. Lab Details</h1>
//           <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
//             <div className=" flex flex-col gap-4">
//               <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//                 <div>
//                   <label htmlFor="labType" className="block font-medium mb-2">
//                     Lab type
//                   </label>
//                   <select
//                     name="labType"
//                     id="labType"
//                     value={formData.labType}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                   >
//                     <option value="" disabled>
//                       Select your choice
//                     </option>
//                     <option value="clinical_pathology">
//                       Clinical Pathology
//                     </option>
//                     <option value="bicroBiology">MicroBiology</option>
//                     <option value="biochemistry">Biochemistry</option>
//                     <option value="hematology">Hematology</option>
//                     <option value="immunology">Immunology</option>
//                     <option value="dermatology">Dermatology</option>
//                     <option value="genetics">Genetics</option>
//                     <option value="others">Others</option>
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
//           </div>
//           <h1 className="my-8 text-2xl font-semibold">
//             4. Lab License & Accreditation
//           </h1>
//           <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label
//                   htmlFor="labLicenseNumber"
//                   className="block font-medium mb-2"
//                 >
//                   Lab License Number
//                 </label>
//                 <input
//                   type="number"
//                   name="labLicenseNumber"
//                   id="labLicenseNumber"
//                   placeholder="Enter the license number"
//                   value={formData.labLicenseNumber}
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
//                   title="Enter the License Issue date"
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
//           </div>
//           {/* 3 dropdowns - services provided */}
//           <h1 className="my-8 text-2xl font-semibold">5. Services Provided</h1>
//           <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
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
//                       value="Routine Blood Tests"
//                       className="mr-2"
//                     />
//                     Routine Blood Tests
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Urine Analysis"
//                       className="mr-2"
//                     />
//                     Urine Analysis
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Pathogen Identification"
//                       className="mr-2"
//                     />
//                     Pathogen Identification
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Genetic Testing"
//                       className="mr-2"
//                     />
//                     Genetic Testing
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Histopathology"
//                       className="mr-2"
//                     />
//                     Histopathology
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Cytology"
//                       className="mr-2"
//                     />
//                     Cytology
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
//                       value="Allergy Testing"
//                       className="mr-2"
//                     />
//                     Allergy Testing
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="specialTests"
//                       value="Cancer Marker Testing"
//                       className="mr-2"
//                     />
//                     Cancer Marker Testing
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="specialTests"
//                       value="Infectious Disease Testing"
//                       className="mr-2"
//                     />
//                     Infectious Disease Testing
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="specialTests"
//                       value="Hormone Testing"
//                       className="mr-2"
//                     />
//                     Hormone Testing
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="specialTests"
//                       value="Toxicology Testing"
//                       className="mr-2"
//                     />
//                     Toxicology Testing
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
//                       value="Automated Testing Equipment"
//                       className="mr-2"
//                     />
//                     Automated Testing Equipment
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
//                       value="Biohazardous Waste Disposal System"
//                       className="mr-2"
//                     />
//                     Biohazardous Waste Disposal System
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Dedicated Waiting Area for Patients"
//                       className="mr-2"
//                     />
//                     Dedicated Waiting Area for Patients
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <h1 className="my-8 text-2xl font-semibold">6. Man Power</h1>
//           <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
//             <div className=" flex flex-col gap-4">
//               <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//                 <div>
//                   <label
//                     htmlFor="pathologistCount"
//                     className="block font-medium mb-2"
//                   >
//                     Pathologist Count
//                   </label>
//                   <input
//                     type="number"
//                     name="pathologistCount"
//                     id="pathologistCount"
//                     placeholder="Enter Patholoogist Count"
//                     value={formData.pathologistCount}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="accountNumber"
//                     className="block font-medium mb-2"
//                   >
//                     Account Number
//                   </label>
//                   <input
//                     type="number"
//                     name="technicianCount"
//                     id="technicianCount"
//                     placeholder="Enter Technician Count"
//                     value={formData.technicianCount}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                   />
//                 </div>
//               </div>
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

// export default labForm;





// "use client";
// import React, { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { labDetails, sendOTP, verifyOTP } from "../../../actions/labDetails";
// import Navbar from "../../../components/Navbar";
// import { toast } from "react-toastify";
// import Footer from "../../../components/Footer";
// import useAuthStore from "../../../store/authStore"

// const labForm = () => {
//   // ============================================
//   // STATE - DUAL OTP
//   // ============================================
//   const [emailOTP, setEmailOTP] = useState("");
//   const [mobileOTP, setMobileOTP] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [formPending, setFormPending] = useState(false);

//   const [formData, setFormData] = useState({
//     //labname
//     labName: "",

//     //contact details
//     ownerName: "",
//     email: "",
//     mobile: "",
//     address: "",
//     pincode: "",

//     //lab details
//     labType: "",
//     yearsOfOperation: "",

//     //lab license & accreditation
//     labLicenseNumber: "",
//     dateOfIssue: "",
//     issuingAuthority: "",

//     //services provided
//     serviceTypes: "",
//     specialTests: "",
//     facilities: "",

//     //staffs
//     pathologistCount: "",
//     technicianCount: "",

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

//   // ============================================
//   // FORM SUBMIT - DUAL OTP LOGIC
//   // ============================================
//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       data.append(key, value);
//     });

//     if (!otpSent) {
//       // STEP 1: Send OTPs to both email and mobile
//       setFormPending(true);
//       const otpResponse = await sendOTP(formData.email, formData.mobile);
//       setFormPending(false);

//       if (otpResponse.success) {
//         setOtpSent(true);
//         toast.success("OTPs sent to your email and mobile!", {
//           position: "bottom-right",
//           autoClose: 4000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "dark",
//         });
//       } else {
//         toast.error(otpResponse.error || "Failed to send OTPs", {
//           position: "bottom-right",
//           autoClose: 4000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "dark",
//         });
//       }
//     } else {
//       // STEP 2: Verify both OTPs
//       setFormPending(true);
//       const verifyResponse = await verifyOTP(formData.email, emailOTP, mobileOTP);
//       setFormPending(false);

//       if (verifyResponse.success) {
//         // STEP 3: Save lab details
//         setFormPending(true);
//         const saveResponse = await labDetails(data);
//         setFormPending(false);

//         if (saveResponse.success) {
//           toast.success("Lab registered successfully!", {
//             position: "bottom-right",
//             autoClose: 4000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             theme: "dark",
//           });

//           // Reset form
//           setFormData({
//             labName: "",
//             ownerName: "",
//             email: "",
//             mobile: "",
//             address: "",
//             pincode: "",
//             labType: "",
//             yearsOfOperation: "",
//             labLicenseNumber: "",
//             dateOfIssue: "",
//             issuingAuthority: "",
//             serviceTypes: "",
//             specialTests: "",
//             facilities: "",
//             pathologistCount: "",
//             technicianCount: "",
//             compliantOrnot: "",
//           });
//           setEmailOTP("");
//           setMobileOTP("");
//           setOtpSent(false);
//         } else {
//           toast.error(saveResponse.error || "Something went wrong", {
//             position: "bottom-right",
//             autoClose: 4000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             theme: "dark",
//           });
//         }
//       } else {
//         toast.error(verifyResponse.error || "Invalid OTPs", {
//           position: "bottom-right",
//           autoClose: 4000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "dark",
//         });
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
//           {/* labname */}
//           <h1 className="my-8 text-2xl font-semibold">1. Lab Details</h1>
//           <div className="m-2 md:ml-8 flex flex-col gap-4">
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label htmlFor="labName" className="block font-medium mb-2">
//                   Lab Name
//                 </label>
//                 <input
//                   type="text"
//                   name="labName"
//                   id="labName"
//                   placeholder="Enter your Lab name"
//                   value={formData.labName}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* contact details */}
//           <h1 className="my-8 text-2xl font-semibold">2. Contact Details</h1>
//           <div className="m-2 md:ml-8 flex flex-col gap-4">
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label htmlFor="ownerName" className="block font-medium mb-2">
//                   Owner Name
//                 </label>
//                 <input
//                   type="text"
//                   name="ownerName"
//                   id="ownerName"
//                   placeholder="Enter your first name"
//                   value={formData.ownerName}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
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

//           <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
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
//           </div>

//           {/* lab details */}
//           <h1 className="my-8 text-2xl font-semibold">3. Lab Details</h1>
//           <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
//             <div className=" flex flex-col gap-4">
//               <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//                 <div>
//                   <label htmlFor="labType" className="block font-medium mb-2">
//                     Lab type
//                   </label>
//                   <select
//                     name="labType"
//                     id="labType"
//                     value={formData.labType}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                   >
//                     <option value="" disabled>
//                       Select your choice
//                     </option>
//                     <option value="clinical_pathology">
//                       Clinical Pathology
//                     </option>
//                     <option value="bicroBiology">MicroBiology</option>
//                     <option value="biochemistry">Biochemistry</option>
//                     <option value="hematology">Hematology</option>
//                     <option value="immunology">Immunology</option>
//                     <option value="dermatology">Dermatology</option>
//                     <option value="genetics">Genetics</option>
//                     <option value="others">Others</option>
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
//           </div>

//           <h1 className="my-8 text-2xl font-semibold">
//             4. Lab License & Accreditation
//           </h1>
//           <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label
//                   htmlFor="labLicenseNumber"
//                   className="block font-medium mb-2"
//                 >
//                   Lab License Number
//                 </label>
//                 <input
//                   type="number"
//                   name="labLicenseNumber"
//                   id="labLicenseNumber"
//                   placeholder="Enter the license number"
//                   value={formData.labLicenseNumber}
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
//                   title="Enter the License Issue date"
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
//           </div>

//           {/* 3 dropdowns - services provided */}
//           <h1 className="my-8 text-2xl font-semibold">5. Services Provided</h1>
//           <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
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
//                       value="Routine Blood Tests"
//                       className="mr-2"
//                     />
//                     Routine Blood Tests
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Urine Analysis"
//                       className="mr-2"
//                     />
//                     Urine Analysis
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Pathogen Identification"
//                       className="mr-2"
//                     />
//                     Pathogen Identification
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Genetic Testing"
//                       className="mr-2"
//                     />
//                     Genetic Testing
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Histopathology"
//                       className="mr-2"
//                     />
//                     Histopathology
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Cytology"
//                       className="mr-2"
//                     />
//                     Cytology
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
//                       value="Allergy Testing"
//                       className="mr-2"
//                     />
//                     Allergy Testing
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="specialTests"
//                       value="Cancer Marker Testing"
//                       className="mr-2"
//                     />
//                     Cancer Marker Testing
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="specialTests"
//                       value="Infectious Disease Testing"
//                       className="mr-2"
//                     />
//                     Infectious Disease Testing
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="specialTests"
//                       value="Hormone Testing"
//                       className="mr-2"
//                     />
//                     Hormone Testing
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="specialTests"
//                       value="Toxicology Testing"
//                       className="mr-2"
//                     />
//                     Toxicology Testing
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
//                       value="Automated Testing Equipment"
//                       className="mr-2"
//                     />
//                     Automated Testing Equipment
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
//                       value="Biohazardous Waste Disposal System"
//                       className="mr-2"
//                     />
//                     Biohazardous Waste Disposal System
//                   </label>

//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="serviceTypes"
//                       value="Dedicated Waiting Area for Patients"
//                       className="mr-2"
//                     />
//                     Dedicated Waiting Area for Patients
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <h1 className="my-8 text-2xl font-semibold">6. Man Power</h1>
//           <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
//             <div className=" flex flex-col gap-4">
//               <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//                 <div>
//                   <label
//                     htmlFor="pathologistCount"
//                     className="block font-medium mb-2"
//                   >
//                     Pathologist Count
//                   </label>
//                   <input
//                     type="number"
//                     name="pathologistCount"
//                     id="pathologistCount"
//                     placeholder="Enter Pathologist Count"
//                     value={formData.pathologistCount}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="technicianCount"
//                     className="block font-medium mb-2"
//                   >
//                     Technician Count
//                   </label>
//                   <input
//                     type="number"
//                     name="technicianCount"
//                     id="technicianCount"
//                     placeholder="Enter Technician Count"
//                     value={formData.technicianCount}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                   />
//                 </div>
//               </div>
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

//             {/* ============================================ */}
//             {/* OTP SECTION - DUAL INPUT (NEW!) */}
//             {/* ============================================ */}
//             {!otpSent ? (
//               <button
//                 type="submit"
//                 disabled={formPending}
//                 className="w-[200px] p-4 bg-black text-white rounded-sm my-10 lg:w-[400px] disabled:bg-gray-400 disabled:cursor-not-allowed"
//               >
//                 {formPending ? "Sending OTPs..." : "Submit & Send OTPs"}
//               </button>
//             ) : (
//               <div className="flex flex-col gap-6 my-6">
//                 {/* Success Message */}
//                 <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
//                   <p className="text-green-700 font-medium">
//                     ✅ OTPs sent successfully!
//                   </p>
//                   <p className="text-sm text-green-600 mt-1">
//                     Check your <strong>Email</strong> and <strong>Mobile</strong> for OTPs
//                   </p>
//                 </div>

//                 {/* OTP Inputs */}
//                 <div className="flex flex-col gap-4">
//                   {/* Email OTP */}
//                   <div>
//                     <label htmlFor="emailOTP" className="block font-medium mb-2 text-purple-700">
//                       📧 Email OTP
//                     </label>
//                     <input
//                       type="text"
//                       name="emailOTP"
//                       id="emailOTP"
//                       placeholder="Enter 6-digit Email OTP"
//                       value={emailOTP}
//                       onChange={(e) => setEmailOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                       maxLength={6}
//                       className="w-[200px] p-4 border-2 border-purple-300 rounded-sm lg:w-[400px] focus:border-purple-500 focus:outline-none text-lg font-mono tracking-widest"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Check your email inbox</p>
//                   </div>

//                   {/* Mobile OTP */}
//                   <div>
//                     <label htmlFor="mobileOTP" className="block font-medium mb-2 text-green-700">
//                       📱 Mobile OTP
//                     </label>
//                     <input
//                       type="text"
//                       name="mobileOTP"
//                       id="mobileOTP"
//                       placeholder="Enter 6-digit Mobile OTP"
//                       value={mobileOTP}
//                       onChange={(e) => setMobileOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                       maxLength={6}
//                       className="w-[200px] p-4 border-2 border-green-300 rounded-sm lg:w-[400px] focus:border-green-500 focus:outline-none text-lg font-mono tracking-widest"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Check your SMS messages</p>
//                   </div>
//                 </div>

//                 {/* Verify Button */}
//                 <button
//                   type="submit"
//                   disabled={formPending || emailOTP.length !== 6 || mobileOTP.length !== 6}
//                   className="w-[200px] p-4 bg-black text-white rounded-sm lg:w-[400px] disabled:bg-gray-400 disabled:cursor-not-allowed"
//                 >
//                   {formPending ? "Verifying OTPs..." : "Verify OTPs & Submit"}
//                 </button>

//                 {/* Back Button */}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setOtpSent(false);
//                     setEmailOTP("");
//                     setMobileOTP("");
//                   }}
//                   className="w-[200px] p-4 bg-gray-200 text-black rounded-sm lg:w-[400px] hover:bg-gray-300"
//                 >
//                   ← Back to Edit Form
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

// export default labForm;





// "use client";
// import React, { useState } from "react";
// import { labDetails, sendOTP, verifyOTP } from "../../../actions/labDetails";
// import Navbar from "../../../components/Navbar";
// import { toast } from "react-toastify";
// import Footer from "../../../components/Footer";
// import useAuthStore from "../../../store/authStore";

// const LabForm = () => {
//   // ============================================
//   // STATE - DUAL OTP
//   // ============================================
//   const [emailOTP, setEmailOTP] = useState("");
//   const [mobileOTP, setMobileOTP] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [formPending, setFormPending] = useState(false);

//   const [formData, setFormData] = useState({
//     labName: "",
//     ownerName: "",
//     email: "",
//     mobile: "",
//     address: "",
//     pincode: "",
//     labType: "",
//     yearsOfOperation: "",
//     labLicenseNumber: "",
//     dateOfIssue: "",
//     issuingAuthority: "",
//     serviceTypes: "",
//     specialTests: "",
//     facilities: "",
//     pathologistCount: "",
//     technicianCount: "",
//     compliantOrnot: "",
//   });

//   const { isAuthenticated, user } = useAuthStore();

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;

//     // Mobile: only digits, max 10
//     if (name === "mobile") {
//       const digitsOnly = value.replace(/\D/g, "");
//       const limited = digitsOnly.slice(0, 10);
//       setFormData((prev) => ({ ...prev, [name]: limited }));
//       return;
//     }

//     // Pincode: only digits, max 6
//     if (name === "pincode") {
//       const digitsOnly = value.replace(/\D/g, "");
//       const limited = digitsOnly.slice(0, 6);
//       setFormData((prev) => ({ ...prev, [name]: limited }));
//       return;
//     }

//     // 🔥 FIX: License Number - alphanumeric + hyphen/space, uppercase
//     if (name === "labLicenseNumber") {
//       const filtered = value.replace(/[^a-zA-Z0-9\- ]/g, "");
//       const upper = filtered.toUpperCase();
//       setFormData((prev) => ({ ...prev, [name]: upper }));
//       return;
//     }

//     // Default
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ============================================
//   // FORM SUBMIT - DUAL OTP LOGIC
//   // ============================================
//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       data.append(key, value);
//     });

//     if (!otpSent) {
//       // STEP 1: Send OTPs
//       setFormPending(true);
//       const otpResponse = await sendOTP(formData.email, formData.mobile);
//       setFormPending(false);

//       if (otpResponse.success) {
//         setOtpSent(true);
//         toast.success("OTPs sent to your email and mobile!", {
//           position: "bottom-right",
//           autoClose: 4000,
//           theme: "dark",
//         });
//       } else {
//         toast.error(otpResponse.error || "Failed to send OTPs", {
//           position: "bottom-right",
//           theme: "dark",
//         });
//       }
//     } else {
//       // STEP 2: Verify OTPs
//       setFormPending(true);
//       const verifyResponse = await verifyOTP(formData.email, emailOTP);

//       if (verifyResponse.success) {
//         // STEP 3: Save lab
//         const saveResponse = await labDetails(data);
//         setFormPending(false);

//         if (saveResponse.success) {
//           toast.success("Lab registered successfully!", {
//             position: "bottom-right",
//             theme: "dark",
//           });

//           // Reset form
//           setFormData({
//             labName: "",
//             ownerName: "",
//             email: "",
//             mobile: "",
//             address: "",
//             pincode: "",
//             labType: "",
//             yearsOfOperation: "",
//             labLicenseNumber: "",
//             dateOfIssue: "",
//             issuingAuthority: "",
//             serviceTypes: "",
//             specialTests: "",
//             facilities: "",
//             pathologistCount: "",
//             technicianCount: "",
//             compliantOrnot: "",
//           });
//           setEmailOTP("");
//           setMobileOTP("");
//           setOtpSent(false);
//         } else {
//           toast.error("Something went wrong", {
//             position: "bottom-right",
//             theme: "dark",
//           });
//         }
//       } else {
//         setFormPending(false);
//         toast.error(verifyResponse.error || "Invalid OTP", {
//           position: "bottom-right",
//           theme: "dark",
//         });
//       }
//     }
//   };

//   return (
//     <main className="md:px-8 md:py-4 shadow-xl md:border-2 md:border-gray-200">
//       <Navbar />
//       <h1 className="font-semibold text-[24px] my-8 lg:text-[28px] xl:text-[34px] leading-tight text-black text-center">
//         Fill the form! Become a Member!
//       </h1>
//       <div className="p-4 md:flex md:flex-row md:justify-center md:items-center">
//         <form onSubmit={handleSubmit}>
//           {/* 1. Lab Details */}
//           <h1 className="my-8 text-2xl font-semibold">1. Lab Details</h1>
//           <div className="m-2 md:ml-8 flex flex-col gap-4">
//             <div>
//               <label htmlFor="labName" className="block font-medium mb-2">
//                 Lab Name
//               </label>
//               <input
//                 type="text"
//                 name="labName"
//                 id="labName"
//                 placeholder="Enter your Lab name"
//                 value={formData.labName}
//                 onChange={handleInputChange}
//                 required
//                 disabled={otpSent}
//                 className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//               />
//             </div>
//           </div>

//           {/* 2. Contact Details */}
//           <h1 className="my-8 text-2xl font-semibold">2. Contact Details</h1>
//           <div className="m-2 md:ml-8 flex flex-col gap-4">
//             <div>
//               <label htmlFor="ownerName" className="block font-medium mb-2">
//                 Owner Name
//               </label>
//               <input
//                 type="text"
//                 name="ownerName"
//                 id="ownerName"
//                 placeholder="Enter your first name"
//                 value={formData.ownerName}
//                 onChange={handleInputChange}
//                 required
//                 disabled={otpSent}
//                 className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//               />
//             </div>
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
//                   disabled={otpSent}
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
//                   placeholder="Enter 10-digit mobile number"
//                   value={formData.mobile}
//                   onChange={handleInputChange}
//                   required
//                   maxLength={10}
//                   disabled={otpSent}
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
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
//                 disabled={otpSent}
//                 className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//               />
//             </div>
//             <div>
//               <label htmlFor="pincode" className="block font-medium mb-2">
//                 Pincode
//               </label>
//               <input
//                 type="tel"
//                 name="pincode"
//                 id="pincode"
//                 placeholder="Enter 6-digit pincode"
//                 value={formData.pincode}
//                 onChange={handleInputChange}
//                 required
//                 maxLength={6}
//                 disabled={otpSent}
//                 className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//               />
//             </div>
//           </div>

//           {/* 3. Lab Details */}
//           <h1 className="my-8 text-2xl font-semibold">3. Lab Details</h1>
//           <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label htmlFor="labType" className="block font-medium mb-2">
//                   Lab Type
//                 </label>
//                 <select
//                   name="labType"
//                   id="labType"
//                   value={formData.labType}
//                   onChange={handleInputChange}
//                   required
//                   disabled={otpSent}
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 >
//                   <option value="" disabled>Select your choice</option>
//                   <option value="clinical_pathology">Clinical Pathology</option>
//                   <option value="microBiology">MicroBiology</option>
//                   <option value="biochemistry">Biochemistry</option>
//                   <option value="hematology">Hematology</option>
//                   <option value="immunology">Immunology</option>
//                   <option value="dermatology">Dermatology</option>
//                   <option value="genetics">Genetics</option>
//                   <option value="others">Others</option>
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="yearsOfOperation" className="block font-medium mb-2">
//                   Years of Operation
//                 </label>
//                 <input
//                   type="number"
//                   name="yearsOfOperation"
//                   id="yearsOfOperation"
//                   placeholder="Enter years of operation"
//                   value={formData.yearsOfOperation}
//                   onChange={handleInputChange}
//                   required
//                   disabled={otpSent}
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* 4. License & Accreditation */}
//           <h1 className="my-8 text-2xl font-semibold">4. Lab License & Accreditation</h1>
//           <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               {/* 🔥 FIXED: License Number - Now accepts letters + numbers */}
//               <div>
//                 <label htmlFor="labLicenseNumber" className="block font-medium mb-2">
//                   Lab License Number
//                 </label>
//                 <input
//                   type="text"
//                   name="labLicenseNumber"
//                   id="labLicenseNumber"
//                   placeholder="e.g., LAB123ABC"
//                   value={formData.labLicenseNumber}
//                   onChange={handleInputChange}
//                   required
//                   disabled={otpSent}
//                   pattern="[A-Za-z0-9\- ]+"
//                   title="Letters, numbers, hyphen and spaces allowed"
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Enter alphanumeric license (e.g., LAB123ABC)</p>
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
//                   disabled={otpSent}
//                   pattern="\d{2}/\d{2}/\d{4}"
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="issuingAuthority" className="block font-medium mb-2">
//                 Issuing Authority
//               </label>
//               <input
//                 type="text"
//                 name="issuingAuthority"
//                 id="issuingAuthority"
//                 placeholder="Enter issuing authority name"
//                 value={formData.issuingAuthority}
//                 onChange={handleInputChange}
//                 required
//                 disabled={otpSent}
//                 className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//               />
//             </div>
//           </div>

//           {/* 5. Services (keeping original checkboxes) */}
//           <h1 className="my-8 text-2xl font-semibold">5. Services Provided</h1>
//           <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40 mb-8">
//               <div>
//                 <label className="block font-medium mb-2">Service Type</label>
//                 <div className="space-y-2">
//                   {[
//                     "Routine Blood Tests",
//                     "Urine Analysis",
//                     "Pathogen Identification",
//                     "Genetic Testing",
//                     "Histopathology",
//                     "Cytology",
//                   ].map((service) => (
//                     <label key={service} className="flex items-center">
//                       <input
//                         type="checkbox"
//                         name="serviceTypes"
//                         value={service}
//                         disabled={otpSent}
//                         className="mr-2"
//                       />
//                       {service}
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block font-medium mb-2">Special Tests</label>
//                 <div className="space-y-2">
//                   {[
//                     "Allergy Testing",
//                     "Cancer Marker Testing",
//                     "Infectious Disease Testing",
//                     "Hormone Testing",
//                     "Toxicology Testing",
//                   ].map((test) => (
//                     <label key={test} className="flex items-center">
//                       <input
//                         type="checkbox"
//                         name="specialTests"
//                         value={test}
//                         disabled={otpSent}
//                         className="mr-2"
//                       />
//                       {test}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block font-medium mb-2">Facilities</label>
//               <div className="space-y-2">
//                 {[
//                   "Automated Testing Equipment",
//                   "Refrigerated Storage for Samples",
//                   "Biohazardous Waste Disposal System",
//                   "Dedicated Waiting Area for Patients",
//                 ].map((facility) => (
//                   <label key={facility} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="facilities"
//                       value={facility}
//                       disabled={otpSent}
//                       className="mr-2"
//                     />
//                     {facility}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* 6. Man Power */}
//           <h1 className="my-8 text-2xl font-semibold">6. Man Power</h1>
//           <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
//             <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
//               <div>
//                 <label htmlFor="pathologistCount" className="block font-medium mb-2">
//                   Pathologist Count
//                 </label>
//                 <input
//                   type="number"
//                   name="pathologistCount"
//                   id="pathologistCount"
//                   placeholder="Enter pathologist count"
//                   value={formData.pathologistCount}
//                   onChange={handleInputChange}
//                   required
//                   disabled={otpSent}
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="technicianCount" className="block font-medium mb-2">
//                   Technician Count
//                 </label>
//                 <input
//                   type="number"
//                   name="technicianCount"
//                   id="technicianCount"
//                   placeholder="Enter technician count"
//                   value={formData.technicianCount}
//                   onChange={handleInputChange}
//                   required
//                   disabled={otpSent}
//                   className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="compliantOrnot" className="block font-medium mb-2">
//                 Are you Compliant to Government Regulations?
//               </label>
//               <select
//                 name="compliantOrnot"
//                 id="compliantOrnot"
//                 value={formData.compliantOrnot}
//                 onChange={handleInputChange}
//                 required
//                 disabled={otpSent}
//                 className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
//               >
//                 <option value="" disabled>Select your choice</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//             </div>
//           </div>

//           {/* OTP SECTION */}
//           {!otpSent ? (
//             <button
//               type="submit"
//               disabled={formPending}
//               className="w-[200px] p-4 bg-black text-white rounded-sm my-10 lg:w-[400px] disabled:bg-gray-400 disabled:cursor-not-allowed"
//             >
//               {formPending ? "Sending OTP..." : "Submit & Send OTP"}
//             </button>
//           ) : (
//             <div className="flex flex-col gap-6 my-6">
//               <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
//                 <p className="text-green-700 font-medium">✅ OTP sent successfully!</p>
//                 <p className="text-sm text-green-600 mt-1">
//                   Check your <strong>Email</strong> for OTP. Use the SAME code for mobile field.
//                 </p>
//               </div>

//               <div>
//                 <label htmlFor="emailOTP" className="block font-medium mb-2 text-purple-700">
//                   📧 Enter OTP (check email)
//                 </label>
//                 <input
//                   type="text"
//                   name="emailOTP"
//                   id="emailOTP"
//                   placeholder="Enter 6-digit OTP"
//                   value={emailOTP}
//                   onChange={(e) => setEmailOTP(e.target.value.replace(/\D/g, "").slice(0, 6))}
//                   maxLength={6}
//                   className="w-[200px] p-4 border-2 border-purple-300 rounded-sm lg:w-[400px] focus:outline-none text-lg font-mono"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={formPending || emailOTP.length !== 6}
//                 className="w-[200px] p-4 bg-black text-white rounded-sm lg:w-[400px] disabled:bg-gray-400"
//               >
//                 {formPending ? "Verifying..." : "Verify OTP & Submit"}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setOtpSent(false);
//                   setEmailOTP("");
//                 }}
//                 className="w-[200px] p-4 bg-gray-200 text-black rounded-sm lg:w-[400px]"
//               >
//                 ← Back to Edit Form
//               </button>
//             </div>
//           )}
//         </form>
//       </div>
//       <Footer />
//     </main>
//   );
// };

// export default LabForm;





"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { labDetails, sendOTP, verifyOTP } from "../../../actions/labDetails";
import Navbar from "../../../components/Navbar";
import { toast } from "react-toastify";
import Footer from "../../../components/Footer";
import useAuthStore from "../../../store/authStore"

const labForm = () => {
  // ============================================
  // STATE - DUAL OTP
  // ============================================
  const [emailOTP, setEmailOTP] = useState("");
  const [mobileOTP, setMobileOTP] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [formPending, setFormPending] = useState(false);

  const [formData, setFormData] = useState({
    //labname
    labName: "",

    //contact details
    ownerName: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",

    //lab details
    labType: "",
    yearsOfOperation: "",

    //lab license & accreditation
    labLicenseNumber: "",
    dateOfIssue: "",
    issuingAuthority: "",

    //services provided
    serviceTypes: "",
    specialTests: "",
    facilities: "",

    //staffs
    pathologistCount: "",
    technicianCount: "",

    //compliance
    compliantOrnot: "",
  });

  const { isAuthenticated, user, logout } = useAuthStore();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    
    // License Number: alphanumeric + hyphen/space, uppercase
    if (name === "labLicenseNumber") {
      const filtered = value.replace(/[^a-zA-Z0-9\- ]/g, "");
      const upper = filtered.toUpperCase();
      setFormData((prevValues) => ({ ...prevValues, [name]: upper }));
      return;
    }
    
    setFormData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: 'serviceTypes' | 'specialTests' | 'facilities'
  ) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const currentArray = prev[fieldName] || '';
      const currentValues = currentArray ? currentArray.split(', ') : [];
      
      let newValues;
      if (checked) {
        newValues = [...currentValues, value];
      } else {
        newValues = currentValues.filter((v) => v !== value);
      }
      
      return {
        ...prev,
        [fieldName]: newValues.join(', ')
      };
    });
  };

  // ============================================
  // FORM SUBMIT - DUAL OTP LOGIC
  // ============================================
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      // Convert arrays to strings for FormData
      if (Array.isArray(value)) {
        data.append(key, value.join(', '));
      } else {
        data.append(key, value as string);
      }
    });

    if (!otpSent) {
      // STEP 1: Send OTPs to both email and mobile
      setFormPending(true);
      const otpResponse = await sendOTP(formData.email, formData.mobile);
      setFormPending(false);

      if (otpResponse.success) {
        setOtpSent(true);
        toast.success("OTPs sent to your email and mobile!", {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        toast.error(otpResponse.error || "Failed to send OTPs", {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } else {
      // STEP 2: Verify both OTPs
      setFormPending(true);
      const verifyResponse = await verifyOTP(formData.email, emailOTP, mobileOTP);
      setFormPending(false);

      if (verifyResponse.success) {
        // STEP 3: Save lab details
        setFormPending(true);
        const saveResponse = await labDetails(data);
        setFormPending(false);

        if (saveResponse.success) {
          toast.success("Lab registered successfully!", {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });

          // Reset form
          setFormData({
            labName: "",
            ownerName: "",
            email: "",
            mobile: "",
            address: "",
            pincode: "",
            labType: "",
            yearsOfOperation: "",
            labLicenseNumber: "",
            dateOfIssue: "",
            issuingAuthority: "",
            serviceTypes: "",
            specialTests: "",
            facilities: "",
            pathologistCount: "",
            technicianCount: "",
            compliantOrnot: "",
          });
          setEmailOTP("");
          setMobileOTP("");
          setOtpSent(false);
        } else {
          toast.error(saveResponse.error || "Something went wrong", {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      } else {
        toast.error(verifyResponse.error || "Invalid OTPs", {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    }
  };

  return (
    <main className="md:px-8 md:py-4 shadow-xl md:border-2 md:border-gray-200">
      <Navbar></Navbar>
      <h1 className="font-semibold text-[24px] my-8 lg:text-[28px] xl:text-[34px] leading-tight text-black text-center md:text-center">
        Fill the form! Become a Member!
      </h1>
      <div className="p-4 md:flex md:flex-row md:justify-center md:items-center">
        <form onSubmit={handleSubmit}>
          {/* labname */}
          <h1 className="my-8 text-2xl font-semibold">1. Lab Details</h1>
          <div className="m-2 md:ml-8 flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label htmlFor="labName" className="block font-medium mb-2">
                  Lab Name
                </label>
                <input
                  type="text"
                  name="labName"
                  id="labName"
                  placeholder="Enter your Lab name"
                  value={formData.labName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* contact details */}
          <h1 className="my-8 text-2xl font-semibold">2. Contact Details</h1>
          <div className="m-2 md:ml-8 flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label htmlFor="ownerName" className="block font-medium mb-2">
                  Owner Name
                </label>
                <input
                  type="text"
                  name="ownerName"
                  id="ownerName"
                  placeholder="Enter your first name"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
            </div>
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
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  maxLength={10}
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
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
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              />
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label htmlFor="pincode" className="block font-medium mb-2">
                  Pincode
                </label>
                <input
                  type="number"
                  name="pincode"
                  id="pincode"
                  placeholder="Enter your pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  maxLength={6}
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* lab details */}
          <h1 className="my-8 text-2xl font-semibold">3. Lab Details</h1>
          <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
            <div className=" flex flex-col gap-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
                <div>
                  <label htmlFor="labType" className="block font-medium mb-2">
                    Lab type
                  </label>
                  <select
                    name="labType"
                    id="labType"
                    value={formData.labType}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                  >
                    <option value="" disabled>
                      Select your choice
                    </option>
                    <option value="clinical_pathology">
                      Clinical Pathology
                    </option>
                    <option value="bicroBiology">MicroBiology</option>
                    <option value="biochemistry">Biochemistry</option>
                    <option value="hematology">Hematology</option>
                    <option value="immunology">Immunology</option>
                    <option value="dermatology">Dermatology</option>
                    <option value="genetics">Genetics</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="yearsOfOperation"
                    className="block font-medium mb-2"
                  >
                    Years of Operation
                  </label>
                  <input
                    type="number"
                    name="yearsOfOperation"
                    id="yearsOfOperation"
                    placeholder="Enter the years of operation"
                    value={formData.yearsOfOperation}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>

          <h1 className="my-8 text-2xl font-semibold">
            4. Lab License & Accreditation
          </h1>
          <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label
                  htmlFor="labLicenseNumber"
                  className="block font-medium mb-2"
                >
                  Lab License Number
                </label>
                <input
                  type="text"
                  name="labLicenseNumber"
                  id="labLicenseNumber"
                  placeholder="e.g., LAB123ABC"
                  value={formData.labLicenseNumber}
                  onChange={handleInputChange}
                  required
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
                  pattern="\d{2}/\d{2}/\d{4}"
                  title="Enter the License Issue date"
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label
                  htmlFor="issuingAuthority"
                  className="block font-medium mb-2"
                >
                  Issuing Authority
                </label>
                <input
                  type="text"
                  name="issuingAuthority"
                  id="issuingAuthority"
                  placeholder="Enter the Issuing Authority Name"
                  value={formData.issuingAuthority}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* 3 dropdowns - services provided */}
          <h1 className="my-8 text-2xl font-semibold">5. Services Provided</h1>
          <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40 mb-8">
              {/* serviceTypes */}
              <div>
                <label
                  htmlFor="serviceTypes"
                  className="block font-medium mb-2"
                >
                  Service Type
                </label>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value="Routine Blood Tests"
                      onChange={(e) => handleCheckboxChange(e, 'serviceTypes')}
                      className="mr-2"
                    />
                    Routine Blood Tests
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value="Urine Analysis"
                      onChange={(e) => handleCheckboxChange(e, 'serviceTypes')}
                      className="mr-2"
                    />
                    Urine Analysis
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value="Pathogen Identification"
                      onChange={(e) => handleCheckboxChange(e, 'serviceTypes')}
                      className="mr-2"
                    />
                    Pathogen Identification
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value="Genetic Testing"
                      onChange={(e) => handleCheckboxChange(e, 'serviceTypes')}
                      className="mr-2"
                    />
                    Genetic Testing
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value="Histopathology"
                      onChange={(e) => handleCheckboxChange(e, 'serviceTypes')}
                      className="mr-2"
                    />
                    Histopathology
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value="Cytology"
                      onChange={(e) => handleCheckboxChange(e, 'serviceTypes')}
                      className="mr-2"
                    />
                    Cytology
                  </label>
                </div>
              </div>

              {/* specialTests */}
              <div>
                <label
                  htmlFor="serviceTypes"
                  className="block font-medium mb-2"
                >
                  Special Tests
                </label>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="specialTests"
                      value="Allergy Testing"
                      className="mr-2"
                    />
                    Allergy Testing
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="specialTests"
                      value="Cancer Marker Testing"
                      className="mr-2"
                    />
                    Cancer Marker Testing
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="specialTests"
                      value="Infectious Disease Testing"
                      className="mr-2"
                    />
                    Infectious Disease Testing
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="specialTests"
                      value="Hormone Testing"
                      className="mr-2"
                    />
                    Hormone Testing
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="specialTests"
                      value="Toxicology Testing"
                      className="mr-2"
                    />
                    Toxicology Testing
                  </label>
                </div>
              </div>
            </div>
            {/* facilities */}
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label htmlFor="facilities" className="block font-medium mb-2">
                  Facilities
                </label>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value="Automated Testing Equipment"
                      className="mr-2"
                    />
                    Automated Testing Equipment
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value="Refrigerated Storage for Samples"
                      className="mr-2"
                    />
                    Refrigerated Storage for Samples
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value="Biohazardous Waste Disposal System"
                      className="mr-2"
                    />
                    Biohazardous Waste Disposal System
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value="Dedicated Waiting Area for Patients"
                      className="mr-2"
                    />
                    Dedicated Waiting Area for Patients
                  </label>
                </div>
              </div>
            </div>
          </div>

          <h1 className="my-8 text-2xl font-semibold">6. Man Power</h1>
          <div className="m-2 md:m-4 md:ml-8 flex flex-col gap-4">
            <div className=" flex flex-col gap-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
                <div>
                  <label
                    htmlFor="pathologistCount"
                    className="block font-medium mb-2"
                  >
                    Pathologist Count
                  </label>
                  <input
                    type="number"
                    name="pathologistCount"
                    id="pathologistCount"
                    placeholder="Enter Pathologist Count"
                    value={formData.pathologistCount}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="technicianCount"
                    className="block font-medium mb-2"
                  >
                    Technician Count
                  </label>
                  <input
                    type="number"
                    name="technicianCount"
                    id="technicianCount"
                    placeholder="Enter Technician Count"
                    value={formData.technicianCount}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
                <div>
                  <label
                    htmlFor="compliantOrnot"
                    className="block font-medium mb-2"
                  >
                    Are you Compliant to Government Regulations or not?
                  </label>
                  <select
                    name="compliantOrnot"
                    id="compliantOrnot"
                    value={formData.compliantOrnot}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                  >
                    <option value="" disabled>
                      Select your choice
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ============================================ */}
            {/* OTP SECTION - DUAL INPUT (NEW!) */}
            {/* ============================================ */}
            {!otpSent ? (
              <button
                type="submit"
                disabled={formPending}
                className="w-[200px] p-4 bg-black text-white rounded-sm my-10 lg:w-[400px] disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {formPending ? "Sending OTPs..." : "Submit & Send OTPs"}
              </button>
            ) : (
              <div className="flex flex-col gap-6 my-6">
                {/* Success Message */}
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-green-700 font-medium">
                    ✅ OTPs sent successfully!
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    Check your <strong>Email</strong> and <strong>Mobile</strong> for OTPs
                  </p>
                </div>

                {/* OTP Inputs */}
                <div className="flex flex-col gap-4">
                  {/* Email OTP */}
                  <div>
                    <label htmlFor="emailOTP" className="block font-medium mb-2 text-purple-700">
                      📧 Email OTP
                    </label>
                    <input
                      type="text"
                      name="emailOTP"
                      id="emailOTP"
                      placeholder="Enter 6-digit Email OTP"
                      value={emailOTP}
                      onChange={(e) => setEmailOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      maxLength={6}
                      className="w-[200px] p-4 border-2 border-purple-300 rounded-sm lg:w-[400px] focus:border-purple-500 focus:outline-none text-lg font-mono tracking-widest"
                    />
                    <p className="text-xs text-gray-500 mt-1">Check your email inbox</p>
                  </div>

                  {/* Mobile OTP */}
                  <div>
                    <label htmlFor="mobileOTP" className="block font-medium mb-2 text-green-700">
                      📱 Mobile OTP
                    </label>
                    <input
                      type="text"
                      name="mobileOTP"
                      id="mobileOTP"
                      placeholder="Enter 6-digit Mobile OTP"
                      value={mobileOTP}
                      onChange={(e) => setMobileOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      maxLength={6}
                      className="w-[200px] p-4 border-2 border-green-300 rounded-sm lg:w-[400px] focus:border-green-500 focus:outline-none text-lg font-mono tracking-widest"
                    />
                    <p className="text-xs text-gray-500 mt-1">Check your SMS messages</p>
                  </div>
                </div>

                {/* Verify Button */}
                <button
                  type="submit"
                  disabled={formPending || emailOTP.length !== 6 || mobileOTP.length !== 6}
                  className="w-[200px] p-4 bg-black text-white rounded-sm lg:w-[400px] disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                  className="w-[200px] p-4 bg-gray-200 text-black rounded-sm lg:w-[400px] hover:bg-gray-300"
                >
                  ← Back to Edit Form
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
      <Footer></Footer>
    </main>
  );
};

export default labForm;


































































































































