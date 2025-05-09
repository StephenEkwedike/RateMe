// --------------------------------------------------------
// frontend/pages/sign-in/[[...index]].tsx
// --------------------------------------------------------
import { SignIn } from "@clerk/nextjs";

// Renders Clerk's Sign-In form for all /sign-in/* routes
export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gray-50">
      <SignIn
        path="/sign-in"
        routing="path"
        redirectUrl="/dashboard"
        signUpUrl="/sign-up"
      />
    </div>
  );
}