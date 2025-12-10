// "use server";

// import { redirect } from "next/navigation";
// import { parseWithZod } from "@conform-to/zod";
// import { signUpSchema } from "../schemas/zodSchemas";
// import crypto from "crypto";

// export async function CreateUser(prevState: unknown, formData: FormData) {
//   console.log(formData);
//   const submission = parseWithZod(formData, {
//     schema: signUpSchema,
//   });

//   if (submission.status !== "success") {
//     return submission.reply();
//   }

//   const token = crypto.randomBytes(32).toString("hex");

//   const data = {
//     name: formData.get("name"),
//     orgName: formData.get("orgName"),
//     email: formData.get("email"),
//     password: formData.get("password"),
//     confirmPassword: formData.get("confirmPassword"),
//     phone: formData.get("phone"),
//   }

//   // Send the form data to the API route
//   const response = await fetch("https://crowdshaki.vercel.app/api/createUser", {
//     method: "POST",
//     body: JSON.stringify({
//       data,
//       token,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to create user");
//   }

//   // Redirect to success page
//   return redirect("/success");
// }




// "use server";

// import { redirect } from "next/navigation";
// import { parseWithZod } from "@conform-to/zod";
// import { signUpSchema } from "../schemas/zodSchemas";
// import crypto from "crypto";

// export async function CreateUser(prevState: unknown, formData: FormData) {
//   console.log(formData);
//   const submission = parseWithZod(formData, {
//     schema: signUpSchema,
//   });

//   if (submission.status !== "success") {
//     return submission.reply();
//   }

//   const token = crypto.randomBytes(32).toString("hex");

//   const data = {
//     name: formData.get("name"),
//     orgName: formData.get("orgName"),
//     email: formData.get("email"),
//     password: formData.get("password"),
//     confirmPassword: formData.get("confirmPassword"),
//     phone: formData.get("phone"),
//   }

//   // USE ENVIRONMENT VARIABLE - Works for both localhost and production
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  
//   // Send the form data to the API route
//   const response = await fetch(`${apiUrl}/api/createUser`, {
//     method: "POST",
//     body: JSON.stringify({
//       data,
//       token,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     // Better error handling
//     const errorData = await response.json().catch(() => null);
//     console.error("API Error:", errorData);
    
//     // Return error in conform format
//     return {
//       status: "error" as const,
//       error: {
//         "": [errorData?.error || "Failed to create user. Please try again."],
//       },
//     };
//   }

//   // Redirect to success page
//   redirect("/success");
// }


"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { signUpSchema } from "../schemas/zodSchemas";
import crypto from "crypto";

export async function CreateUser(prevState: unknown, formData: FormData) {
  console.log("FormData:", Object.fromEntries(formData));
  
  const submission = parseWithZod(formData, {
    schema: signUpSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const token = crypto.randomBytes(32).toString("hex");

  const data = {
    name: formData.get("name"),
    orgName: formData.get("orgName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    phone: formData.get("phone"),
  };

  // USE ENVIRONMENT VARIABLE - Works for both localhost and production
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  
  try {
    // Send the form data to the API route
    const response = await fetch(`${apiUrl}/api/createUser`, {
      method: "POST",
      body: JSON.stringify({
        data,
        token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("API Error:", responseData);
      
      // Return error in conform format
      return submission.reply({
        formErrors: [responseData?.error || "Failed to create user. Please try again."],
      });
    }

    console.log("User created successfully:", responseData);
    
  } catch (error) {
    console.error("Network Error:", error);
    return submission.reply({
      formErrors: ["Network error. Please check your connection and try again."],
    });
  }

  // Redirect to success page with user info
  redirect(`/success?email=${encodeURIComponent(data.email as string)}&name=${encodeURIComponent(data.name as string)}`);
}