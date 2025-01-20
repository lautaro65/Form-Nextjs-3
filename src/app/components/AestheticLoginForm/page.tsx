"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Mail } from "lucide-react";

const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${(i * 137) % 70}%`,
    left: `${(i * 149) % 100}%`,
    delay: `${(i * 113) % 3}s`,
  }));
};

const stars = generateStars(50);
const AestheticLoginForm: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const containerVariants = {
    hidden: { rotateY: 180 },
    visible: { rotateY: 0 },
    exit: { rotateY: 180 },
  };

  const InputField = ({
    icon: Icon,
    placeholder,
    type = "text",
  }: {
    icon: any;
    placeholder: string;
    type?: string;
  }) => (
    <div className="relative w-full mb-4">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
        <Icon size={20} />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full py-3 px-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:border-white/40 transition-colors"
      />
    </div>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 relative p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
       {/* Stars */}
       {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Form Container */}
      <div className="perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={isFlipped ? "register" : "login"}
            variants={{
              hidden: { rotateY: isFlipped ? -180 : 180 },
              visible: { rotateY: 0 },
              exit: { rotateY: isFlipped ? -180 : 180 },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
            style={{
              backfaceVisibility: "hidden", // Evita mostrar el reverso no deseado
            }}
          >
            <h1 className="text-3xl font-bold text-white text-center mb-8">
              {isFlipped ? "Register" : "Login"}
            </h1>
            <form className="space-y-4">
              <InputField icon={User} placeholder="Username" />
              {isFlipped && <InputField icon={Mail} placeholder="Email" />}
              <InputField icon={Lock} placeholder="Password" type="password" />

              {!isFlipped && (
                <div className="flex items-center justify-between text-sm text-white/70 mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 rounded bg-white/10 border-white/20"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="hover:text-white transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-white text-purple-900 font-semibold hover:bg-white/90 transition-colors"
              >
                {isFlipped ? "Register" : "Login"}
              </button>

              <div className="text-center text-white/70 mt-4">
                <span>
                  {isFlipped
                    ? "Already have an account?"
                    : "Don't have an account?"}
                </span>
                <button
                  type="button"
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="ml-2 text-white hover:underline"
                >
                  {isFlipped ? "Login" : "Register"}
                </button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AestheticLoginForm;
