"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"influencer" | "brand" | null>(null);
  const [step, setStep] = useState(1);

  const resetAndClose = () => {
    setMode("login");
    setRole(null);
    setStep(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={resetAndClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-blue-500 to-teal-500 rounded-full opacity-20 blur-2xl" />

            {/* Close button */}
            <button
              onClick={resetAndClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="relative z-10">
              {step === 1 ? (
                <>
                  <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {mode === "login"
                      ? "Welcome Back!"
                      : "Join The Halo Circle"}
                  </h2>

                  {mode === "signup" && (
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4 text-center">
                        I am a...
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => {
                            setRole("influencer");
                            setStep(2);
                          }}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            role === "influencer"
                              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500"
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 mb-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">
                              Influencer
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Create & Share Content
                            </span>
                          </div>
                        </button>

                        <button
                          onClick={() => {
                            setRole("brand");
                            setStep(2);
                          }}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            role === "brand"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500"
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 mb-2 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white">
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                              </svg>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">
                              Brand
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Grow Your Business
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  <form className="space-y-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-purple-500 focus:outline-none transition-colors dark:text-white"
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-purple-500 focus:outline-none transition-colors dark:text-white"
                      />
                    </div>
                    {mode === "login" && (
                      <div className="text-right">
                        <a
                          href="#"
                          className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400"
                        >
                          Forgot password?
                        </a>
                      </div>
                    )}
                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-all hover:scale-[1.01]"
                    >
                      {mode === "login" ? "Sign In" : "Continue"}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      {mode === "login"
                        ? "Don't have an account?"
                        : "Already have an account?"}
                      <button
                        onClick={() =>
                          setMode(mode === "login" ? "signup" : "login")
                        }
                        className="ml-2 text-purple-600 hover:text-purple-700 dark:text-purple-400 font-medium"
                      >
                        {mode === "login" ? "Sign Up" : "Sign In"}
                      </button>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setStep(1)}
                    className="mb-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back
                  </button>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Complete Your {role === "influencer" ? "Creator" : "Brand"}{" "}
                    Profile
                  </h2>

                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="First Name"
                          className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-purple-500 focus:outline-none transition-colors dark:text-white"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-purple-500 focus:outline-none transition-colors dark:text-white"
                        />
                      </div>
                    </div>
                    {role === "influencer" ? (
                      <>
                        <div>
                          <input
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-purple-500 focus:outline-none transition-colors dark:text-white"
                          />
                        </div>
                        <div>
                          <select className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-purple-500 focus:outline-none transition-colors dark:text-white">
                            <option value="">Select Content Category</option>
                            <option value="lifestyle">Lifestyle</option>
                            <option value="tech">Technology</option>
                            <option value="fashion">Fashion</option>
                            <option value="beauty">Beauty</option>
                            <option value="fitness">Fitness</option>
                            <option value="food">Food</option>
                            <option value="travel">Travel</option>
                            <option value="gaming">Gaming</option>
                          </select>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <input
                            type="text"
                            placeholder="Company Name"
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-purple-500 focus:outline-none transition-colors dark:text-white"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Website"
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-purple-500 focus:outline-none transition-colors dark:text-white"
                          />
                        </div>
                      </>
                    )}
                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-all hover:scale-[1.01]"
                    >
                      Create Account
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
