import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { GoogleLogin } from '@react-oauth/google';

export const LoginSIgnup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });

  const googleAuth = async (credentialResponse) => {
    let responseData;
    await fetch('http://localhost:4000/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        toast.success("Logged in successfully");
        setTimeout(() => window.location.replace("/"), 1000);
    } else {
        toast.error(responseData.errors);
    }
};

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { Accept: 'application/form-data', 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      toast.success("Logged in successfully");
      setTimeout(() => window.location.replace("/"), 1000);
    } else {
      toast.error(responseData.errors);
    }
  };

  const signup = async () => {
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: { Accept: 'application/form-data', 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      toast.success("Account created successfully");
      setTimeout(() => window.location.replace("/"), 1000);
    } else {
      toast.error(responseData.errors);
    }
  };

  return (
    <div className="min-h-screen w-full flex">

      {/* ── Left panel — editorial image ── */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80"
          alt="SYKSHADES"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Brand mark on image */}
        <div className="absolute bottom-12 left-12 flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70 font-medium">
            SYKSHADES / Collection 01
          </p>
          <h2 className="font-serif text-4xl font-light text-white leading-tight tracking-tight">
            Wear What <br />
            <span className="font-medium">Moves You</span>
          </h2>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between px-8 sm:px-16 py-12 bg-white">

        {/* Top nav */}
        <div className="flex items-center justify-between mb-16">
          <Link
            to="/"
            className="text-sm tracking-[0.2em] font-medium text-black hover:opacity-70 transition-opacity"
          >
            SYKSHADES
          </Link>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-[0.15em] text-gray-400 hover:text-black transition-colors font-light"
          >
            Back to Shop
          </Link>
        </div>

        {/* Form area */}
        <div className="flex-1 flex flex-col justify-center max-w-sm w-full mx-auto">

          {/* Heading */}
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-3">
              {state === "Login" ? "Welcome Back" : "Create Account"}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-black tracking-tight">
              {state === "Login" ? (
                <>Sign <span className="font-medium">In</span></>
              ) : (
                <>Get <span className="font-medium">Started</span></>
              )}
            </h1>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-0 border-t border-gray-200">

            {state === "Sign up" && (
              <div className="flex flex-col gap-1 border-b border-gray-200 py-4">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">
                  Full Name
                </label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Your name"
                  className="text-sm font-light text-black placeholder-gray-300 focus:outline-none bg-transparent py-1"
                />
              </div>
            )}

            <div className="flex flex-col gap-1 border-b border-gray-200 py-4">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">
                Email Address
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={changeHandler}
                type="email"
                placeholder="your@email.com"
                className="text-sm font-light text-black placeholder-gray-300 focus:outline-none bg-transparent py-1"
              />
            </div>

            <div className="flex flex-col gap-1 border-b border-gray-200 py-4">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">
                Password
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={changeHandler}
                type="password"
                placeholder="••••••••"
                className="text-sm font-light text-black placeholder-gray-300 focus:outline-none bg-transparent py-1"
              />
            </div>

          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 mt-6">
            <input type="checkbox" className="mt-0.5 accent-black" />
            <p className="text-xs font-light text-gray-400 leading-relaxed">
              By continuing, I agree to the{' '}
              <span className="text-black underline underline-offset-2 cursor-pointer hover:text-gray-600 transition-colors">
                terms of use
              </span>
              {' '}&amp;{' '}
              <span className="text-black underline underline-offset-2 cursor-pointer hover:text-gray-600 transition-colors">
                privacy policy
              </span>.
            </p>
          </div>

          {/* Submit */}
          <button
            onClick={() => { state === "Login" ? login() : signup() }}
            className="w-full mt-8 bg-black text-white h-14 text-xs uppercase tracking-[0.2em] font-medium border border-black hover:bg-white hover:text-black transition-colors duration-300"
          >
            {state === "Login" ? "Sign In" : "Create Account"}
          </button>

          {/* Toggle */}
          <p className="text-xs font-light text-gray-400 mt-6 text-center">
            {state === "Sign up" ? (
              <>
                Already have an account?{' '}
                <span
                  onClick={() => setState("Login")}
                  className="text-black underline underline-offset-2 cursor-pointer hover:text-gray-600 transition-colors"
                >
                  Sign in here
                </span>
              </>
            ) : (
              <>
                New to SYKSHADES?{' '}
                <span
                  onClick={() => setState("Sign up")}
                  className="text-black underline underline-offset-2 cursor-pointer hover:text-gray-600 transition-colors"
                >
                  Create an account
                </span>
              </>
            )}
          </p>

        </div>

        <div className="mt-6 flex items-center gap-3">
    <div className="flex-1 border-t border-gray-200"></div>
    <p className="text-xs text-gray-400 font-light uppercase tracking-widest">or</p>
    <div className="flex-1 border-t border-gray-200"></div>
</div>

<div className="mt-6 flex justify-center">
    <GoogleLogin
        onSuccess={googleAuth}
        onError={() => toast.error("Google login failed")}
    />
</div>

        {/* Bottom */}
        <div className="mt-16">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-300 font-light">
            © {new Date().getFullYear()} SYKSHADES. All Rights Reserved.
          </p>
        </div>

      </div>
    </div>
  )
}