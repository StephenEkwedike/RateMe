// --------------------------------------------------------
// frontend/pages/sign-up/[[...index]].tsx
// --------------------------------------------------------
import { SignUp } from "@clerk/nextjs";

// Renders Clerk's Sign-Up form for all /sign-up/* routes
export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gray-50">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
      />
    </div>
  );
}