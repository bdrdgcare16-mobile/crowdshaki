// "use client";
// import React, { FormEvent } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { z } from "zod";
// import { CreateUser } from "../actions/createUser";
// import { useFormStore } from "../store/formStore";
// import { useFormState } from "react-dom";
// import { useForm } from "@conform-to/react"
// import { parseWithZod } from "@conform-to/zod";
// import { signUpSchema } from "../schemas/zodSchemas";

// // Initial State
// const Page: React.FC = () => {
//     const router = useRouter();
//     const [lastResult, action] = useFormState(CreateUser, undefined)
//     const [form, fields] = useForm({
//         lastResult,
//         onValidate({ formData }) {
//             return parseWithZod(formData, { schema: signUpSchema })
//         },
//         shouldValidate: 'onBlur',
//         shouldRevalidate: 'onInput',
//     })

//     const { name, orgName, email, password, confirmPassword, phone, setFormData } = useFormStore();
//     const [showPassword, setShowPassword] = React.useState<boolean>(false);
//     const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);

//     const handlePasswordToggle = () => setShowPassword(!showPassword);
//     const handleConfirmPasswordToggle = () => setShowConfirmPassword(!showConfirmPassword);

//     return (
//         <div className=" flex flex-col justify-center items-center lg:flex-row min-h-screen p-4">
//             {/* Left side - Background and Quote */}
//             <div className="lg:w-1/2 bg-purple-900 text-white flex flex-col justify-between relative overflow-hidden rounded-xl">
//                 <Image
//                     src="/assets/login.jpg"
//                     width={5000}
//                     height={3000}
//                     alt=""
//                     className="relative h-[300px] object-cover lg:h-[calc(100vh-32px)]"
//                 />
//                 <div className="z-10 absolute w-full flex justify-center items-center h-full">
//                     <p className="text-[36px] lg:text-[80px] xl:text-[90px] font-medium leading-tight">Crowdshaki.</p>
//                 </div>
//             </div>

//             {/* Right side */}
//             <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
//                 <div className="max-w-md w-full mx-auto">
//                     <div className="flex justify-start mb-8">
//                         <h1 className="text-3xl font-semibold">Create an account.</h1>
//                     </div>
//                     <h2 className="text-3xl lg:text-4xl font-bold mb-2">Welcome</h2>

//                     <form id={form.id} onSubmit={form.onSubmit} action={action} className="space-y-6">
//                         {/* Name Input */}
//                         <div>
//                             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Name
//                             </label>
//                             <input
//                                 id="name"
//                                 name={fields.name.name}
//                                 key={fields.name.key}
//                                 defaultValue={fields.name.initialValue}
//                                 type="text"
//                                 className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                 placeholder="Enter your name"
//                                 value={name}
//                                 onChange={(e) => setFormData("name", e.target.value)}
//                             />
//                             <p className="text-red-600 text-sm ">{fields.name.errors}</p>
//                         </div>

//                         {/* Organization Name Input */}
//                         <div>
//                             <label htmlFor="orgName" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Organization Name
//                             </label>
//                             <input
//                                 id="orgName"
//                                 type="text"
//                                 name={fields.orgName.name}
//                                 key={fields.orgName.key}
//                                 defaultValue={fields.orgName.initialValue}
//                                 className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                 placeholder="Enter your organization name"
//                                 value={orgName}
//                                 onChange={(e) => setFormData("orgName", e.target.value)}
//                             />
//                             <p className="text-red-600 text-sm ">{fields.orgName.errors}</p>
//                         </div>

//                         {/* Email Input */}
//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Email
//                             </label>
//                             <input
//                                 id="email"
//                                 type="email"
//                                 name={fields.email.name}
//                                 key={fields.email.key}
//                                 defaultValue={fields.email.initialValue}
//                                 className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                 placeholder="Enter your email"
//                                 value={email}
//                                 onChange={(e) => setFormData("email", e.target.value)}
//                             />
//                             <p className="text-red-600 text-sm ">{fields.email.errors}</p>
//                         </div>

//                         {/* Password Input */}
//                         <div>
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Password
//                             </label>
//                             <div className="relative">
//                                 <input
//                                     id="password"
//                                     name={fields.password.name}
//                                     key={fields.password.key}
//                                     defaultValue={fields.password.initialValue}
//                                     type={showPassword ? "text" : "password"}
//                                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                     placeholder="Enter your password"
//                                     value={password}
//                                     onChange={(e) => setFormData("password", e.target.value)}
//                                 />
//                                 <p className="text-red-600 text-sm ">{fields.password.errors}</p>
//                                 {/* ... */}
//                             </div>
//                         </div>

//                         {/* Confirm Password Input */}
//                         <div>
//                             <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Confirm Password
//                             </label>
//                             <div className="relative">
//                                 <input
//                                     id="confirm-password"
//                                     name={fields.confirmPassword.name}
//                                     key={fields.confirmPassword.key}
//                                     defaultValue={fields.confirmPassword.initialValue}
//                                     type={showConfirmPassword ? "text" : "password"}
//                                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                     placeholder="Re-enter your password"
//                                     value={confirmPassword}
//                                     onChange={(e) => setFormData("confirmPassword", e.target.value)}
//                                 />
//                                 <p className="text-red-600 text-sm ">{fields.confirmPassword.errors}</p>
//                                 {/* ... */}
//                             </div>
//                         </div>

//                         {/* Phone Input */}
//                         <div>
//                             <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Phone Number
//                             </label>
//                             <input
//                                 id="phone"
//                                 name={fields.phone.name}
//                                 key={fields.phone.key}
//                                 defaultValue={fields.phone.initialValue}
//                                 type="tel"
//                                 className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                 placeholder="Enter your phone number"
//                                 value={phone}
//                                 onChange={(e) => setFormData("phone", e.target.value)}
//                             />
//                             <p className="text-red-600 text-sm ">{fields.phone.errors}</p>
//                         </div>

//                         {/* Submit Button */}
//                         <div>
//                             <button
//                                 type="submit"
//                                 className="w-full py-2 px-4 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                             >
//                                 Sign Up
//                             </button>
//                         </div>
//                     </form>

//                     <p className="mt-8 text-center text-sm text-gray-600">
//                         Already have an account?{" "}
//                         <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//                             Sign In
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Page;




"use client";
import React, { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { CreateUser } from "../actions/createUser";
import { useFormStore } from "../store/formStore";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { signUpSchema } from "../schemas/zodSchemas";

// Initial State
const Page: React.FC = () => {
    const router = useRouter();
    const [lastResult, action] = useFormState(CreateUser, undefined)
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: signUpSchema })
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    })

    const { name, orgName, email, password, confirmPassword, phone, setFormData } = useFormStore();
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);

    const handlePasswordToggle = () => setShowPassword(!showPassword);
    const handleConfirmPasswordToggle = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div className=" flex flex-col justify-center items-center lg:flex-row min-h-screen p-4">
            {/* Left side - Background and Quote */}
            <div className="lg:w-1/2 bg-purple-900 text-white flex flex-col justify-between relative overflow-hidden rounded-xl">
                <Image
                    src="/assets/login.jpg"
                    width={5000}
                    height={3000}
                    alt=""
                    className="relative h-[300px] object-cover lg:h-[calc(100vh-32px)]"
                />
                <div className="z-10 absolute w-full flex justify-center items-center h-full">
                    <p className="text-[36px] lg:text-[80px] xl:text-[90px] font-medium leading-tight">Crowdshaki.</p>
                </div>
            </div>

            {/* Right side */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <div className="max-w-md w-full mx-auto">
                    <div className="flex justify-start mb-8">
                        <h1 className="text-3xl font-semibold">Create an account.</h1>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-2">Welcome</h2>

                    {/* ERROR MESSAGE DISPLAY */}
                    {form.errors && form.errors[""] && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700 font-medium">
                                        {form.errors[""][0]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form id={form.id} onSubmit={form.onSubmit} action={action} className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                id="name"
                                name={fields.name.name}
                                key={fields.name.key}
                                defaultValue={fields.name.initialValue}
                                type="text"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setFormData("name", e.target.value)}
                            />
                            <p className="text-red-600 text-sm ">{fields.name.errors}</p>
                        </div>

                        {/* Organization Name Input */}
                        <div>
                            <label htmlFor="orgName" className="block text-sm font-medium text-gray-700 mb-1">
                                Organization Name
                            </label>
                            <input
                                id="orgName"
                                type="text"
                                name={fields.orgName.name}
                                key={fields.orgName.key}
                                defaultValue={fields.orgName.initialValue}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your organization name"
                                value={orgName}
                                onChange={(e) => setFormData("orgName", e.target.value)}
                            />
                            <p className="text-red-600 text-sm ">{fields.orgName.errors}</p>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name={fields.email.name}
                                key={fields.email.key}
                                defaultValue={fields.email.initialValue}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setFormData("email", e.target.value)}
                            />
                            <p className="text-red-600 text-sm ">{fields.email.errors}</p>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name={fields.password.name}
                                    key={fields.password.key}
                                    defaultValue={fields.password.initialValue}
                                    type={showPassword ? "text" : "password"}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setFormData("password", e.target.value)}
                                />
                                <p className="text-red-600 text-sm ">{fields.password.errors}</p>
                                <button
                                    type="button"
                                    onClick={handlePasswordToggle}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirm-password"
                                    name={fields.confirmPassword.name}
                                    key={fields.confirmPassword.key}
                                    defaultValue={fields.confirmPassword.initialValue}
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onChange={(e) => setFormData("confirmPassword", e.target.value)}
                                />
                                <p className="text-red-600 text-sm ">{fields.confirmPassword.errors}</p>
                                <button
                                    type="button"
                                    onClick={handleConfirmPasswordToggle}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                        </div>

                        {/* Phone Input */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                name={fields.phone.name}
                                key={fields.phone.key}
                                defaultValue={fields.phone.initialValue}
                                type="tel"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={(e) => setFormData("phone", e.target.value)}
                            />
                            <p className="text-red-600 text-sm ">{fields.phone.errors}</p>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-800 transition"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;