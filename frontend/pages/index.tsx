import { Star, Phone, MessageSquare, BarChart3, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b border-gray-100 bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center">
            <div className="mr-2 rounded-md bg-blue-600 p-2">
              <Star className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">RateMe</span>
          </div>
          <nav className="hidden md:flex">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="text-gray-800 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-gray-800 hover:text-blue-600">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-800 hover:text-blue-600">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-gray-800 hover:text-blue-600">
                  Pricing
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <SignUpButton>
              <a className="rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Try for free
              </a>
            </SignUpButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-4 inline-block rounded-full bg-gray-100 px-4 py-1 text-sm">
            <span>Introducing instant customer feedback</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Elevate Your Customer <br />
            Service Ratings
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Collect real-time feedback after every call. Transform your customer service with instant ratings that
            help you improve and grow.
          </p>
          <div className="flex justify-center space-x-4">
            <SignUpButton>
              <a className="rounded-full bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700">
                Try for Free
              </a>
            </SignUpButton>
            <Link href="#how-it-works" className="rounded-full border border-gray-300 px-8 py-3 font-medium text-gray-800 hover:bg-gray-50">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="border-t border-b border-gray-100 py-10">
        <div className="container mx-auto px-4">
          <p className="mb-8 text-center text-gray-600">Trusted by fast-growing companies</p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            {[
              "Acme Inc",
              "TechCorp",
              "GlobalServe",
              "CallPro",
              "ServiceFirst",
              "TeleSolutions"
            ].map((company) => (
              <div key={company} className="flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-400">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Value Proposition */}
      <section className="py-20" id="features">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Empower Your Call Center with Instant Feedback
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-gray-600">
            Get real-time customer ratings after every call, enabling your team to improve service quality and boost
            customer satisfaction.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg p-6">
              <div className="mb-4">
                <Phone className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Post-Call Ratings</h3>
              <p className="text-gray-600">Automatically send rating requests via SMS immediately after calls end</p>
            </div>

            <div className="rounded-lg p-6">
              <div className="mb-4">
                <MessageSquare className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Simple Customer Experience</h3>
              <p className="text-gray-600">One-tap rating system makes it easy for customers to provide feedback</p>
            </div>

            <div className="rounded-lg p-6">
              <div className="mb-4">
                <BarChart3 className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Real-time Analytics</h3>
              <p className="text-gray-600">
                Track performance metrics and identify improvement opportunities instantly
              </p>
            </div>

            <div className="rounded-lg p-6">
              <div className="mb-4">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Secure & Compliant</h3>
              <p className="text-gray-600">Enterprise-grade security with full TCPA and GDPR compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20" id="how-it-works">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Simple. Seamless. Smart.</h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-gray-600">
            Discover how RateMe transforms your customer service with a simple four-step process
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="mb-2 text-xl font-bold">Connect Your Phone System</h3>
                <p className="text-gray-600">Integrate RateMe with your existing call center software in minutes</p>
              </div>

              <div className="mb-8">
                <h3 className="mb-2 text-xl font-bold">Customize Your Rating Flow</h3>
                <p className="text-gray-600">Design the perfect feedback experience for your customers</p>
              </div>

              <div className="mb-8">
                <h3 className="mb-2 text-xl font-bold">Collect Instant Feedback</h3>
                <p className="text-gray-600">Automatically send SMS rating requests after each call</p>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-bold">Analyze and Improve</h3>
                <p className="text-gray-600">Use real-time insights to enhance your customer service</p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative h-[400px] w-full max-w-md overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="/placeholder.svg"
                  alt="RateMe dashboard preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
            RateMe has transformed our customer service
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  "RateMe has revolutionized how we gather customer feedback. Our satisfaction scores have increased by 27% since implementation.",
                name: "Sarah Johnson",
                role: "Customer Service Director, TechCorp"
              },
              {
                quote:
                  "The instant feedback has allowed us to identify and address issues in real-time. Our team's performance has never been better.",
                name: "Michael Chen",
                role: "Call Center Manager, GlobalServe"
              },
              {
                quote:
                  "RateMe's analytics have given us insights we never had before. We've been able to improve training and boost our customer satisfaction scores.",
                name: "Jessica Rodriguez",
                role: "Operations Director, ServiceFirst"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="rounded-lg border border-gray-100 p-6 shadow-sm">
                <p className="mb-4 text-gray-600">`"${testimonial.quote}"`</p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                    <Image src="/placeholder.svg" alt="Customer" width={48} height={48} />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-20" id="pricing">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Pricing that scales with you</h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-gray-600">
            Whichever plan you pick, it's free until you love your results. That's our promise.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Plan cards with SignUpButton where applicable */}
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h3 className="mb-2 text-xl">Starter</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="mb-6 text-gray-600">Perfect for small teams</p>

              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Up to 100 calls/month</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Email support</span>
                </li>
              </ul>

              <SignUpButton>
                <a className="block w-full rounded-lg border border-blue-600 py-2 text-center font-medium text-blue-600 hover:bg-blue-50">
                  Start Free
                </a>
              </SignUpButton>
            </div>

            {/* Professional and Enterprise plans omitted for brevity */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-2xl bg-blue-600 p-8 text-center text-white md:p-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to transform your customer feedback?</h2>
            <p className="mx-auto mb-8 max-w-2xl">
              Join thousands of businesses that use RateMe to improve their customer service and boost satisfaction
              scores.
            </p>

            <SignUpButton>
              <a className="inline-block rounded-full bg-white px-8 py-3 font-medium text-blue-600 hover:bg-gray-100">
                Get Started Today
              </a>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center">
                <div className="mr-2 rounded-md bg-blue-600 p-1">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold">RateMe</span>
              </div>
              <p className="mt-4 text-gray-600">Transforming customer feedback one call at a time.</p>
            </div>
            {/* Additional footer columns omitted for brevity */}
          </div>
        </div>
      </footer>
    </div>
  );
}