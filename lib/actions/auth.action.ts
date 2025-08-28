"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const SESSION_DURATION = 60 * 60 * 24 * 7; 

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    // check if user exists in db
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists)
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };

    // save user to db
    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: unknown ) {
    console.error("Error creating user:", error);

    // Handle Firebase specific errors
    if (error instanceof Error) {
    // You can access error.message safely
    return {
      success: false,
      message: error.message,
    };
  }

  // Firebase-specific error handling
  if (typeof error === "object" && error !== null && "code" in error) {
    const e = error as { code: string };
    if (e.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use",
      };
    }
  }

    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

export async function setSessionCookie(idToken: string){
  const cookieStore = await cookies();

  // Create session cookie
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000, // in milliseconds
  });
  // Set cookie in response
  cookieStore.set("session", sessionCookie, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    value: sessionCookie,
    httpOnly: true,
    maxAge: SESSION_DURATION,});

} 

export async function signIn(params: signInParams){
  const {email, idToken} = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if(!userRecord){
      return {
        success: false,
        message: "User does not exist. Please sign up.",
      };
    }

    await setSessionCookie(idToken);
  } catch (e: unknown) {
    console.error("Error signing in:", e);
    return {
      success: false,
      message: "Failed to sign in. Please try again.",
    };
    
  }
}