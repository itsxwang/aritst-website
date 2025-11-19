import { useState, useRef, useEffect } from "react";
// Assuming you are using react-router-dom for routing.
// If not, you might need to adjust how the `id` is retrieved.
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

function MainVerify() {
  const [code, setCode] = useState(Array(6).fill(""));
  const [validMessage, setValidMessage] = useState("");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const { id } = useParams();

  useEffect(() => {
    // Restore original fetch logic
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    fetch(`${BACKEND_URL}/verify/${id}`).then((res) => {
      if (!res.ok) {
        return res.json().then((data) => {
          console.log(data);
          setValidMessage(data.message);
        });
      }
    });
  }, [id]);

  /**
   * Handles changes in the input fields for the verification code.
   * Allows only single digits and auto-focuses the next input.
   * @param {string} value - The input value.
   * @param {number} index - The index of the input field.
   */
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // allow only single digit

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // auto-focus next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  /**
   * Handles the keydown event, specifically for the Backspace key
   * to move focus to the previous input field.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
   * @param {number} index - The index of the input field.
   */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  /**
   * Handles the paste event to allow users to paste a 6-digit code.
   * It distributes the pasted digits across the input fields.
   * @param {React.ClipboardEvent<HTMLInputElement>} e - The clipboard event.
   */
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .slice(0, 6)
      .replace(/\D/g, ""); // Get pasted data, limit to 6 chars, and remove non-digits

    if (pastedData) {
      const newCode = Array(6).fill("");
      pastedData.split("").forEach((char, index) => {
        if (index < 6) {
          newCode[index] = char;
        }
      });
      setCode(newCode);

      // Focus the last input that was filled by the paste
      const lastFilledIndex = Math.min(pastedData.length - 1, 5);
      if (inputsRef.current[lastFilledIndex]) {
        inputsRef.current[lastFilledIndex]?.focus();
      }
    }
  };

  /**
   * Handles the verification process by sending the code to the server.
   */
  const handleVerify = () => {
    const finalCode = code.join("");
    console.log("Verification code:", finalCode);

    setLoading(true);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    fetch(`${BACKEND_URL}/verify/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, code: finalCode }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message, data.error);
        if (!data.message && data.error) {
          return setError(data.error);
        }

        return localStorage.getItem("pendingOrder")
          ? (window.location.href = `/checkout/${JSON.parse(
              localStorage.getItem("pendingOrder") as string
            )
              .arts.map(
                (art: { _id: string; quantity: number }) =>
                  `${art._id}=${art.quantity}`
              )
              .join("+")}`)
          : setVerified(true);
      })
      .catch((error) => {
        return setError(
          `Some error occured: "${error.message}". Please try again later!`
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Rendered when the verification link is invalid or expired
  if (validMessage) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-[inter]">
          Error :(
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-1 text-center max-w-md text-[20px]">
          {validMessage}
        </p>

        <p className="text-gray-600 dark:text-gray-300 text-center max-w-md text-[20px]">
          Try, by RELOAD the page!
        </p>

        <p className="text-gray-600 dark:text-gray-300 text-center max-w-md text-[20px]">
          If it still not works then the link has expired or may never
          exist.
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-md text-[20px]">
          You can try again from start, few minutes later.
        </p>

        <p>
          If you already Verified your email address, then you good to go.
        </p>
      </div>
    );
  }

  // Rendered on successful verification
  if (verified) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-[inter]">
          Email Address Verified!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-1 text-center max-w-md">
          Thanks! for subscribing to our newsletter.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-1 text-center max-w-md">
          Now you can also place orders with this email.
        </p>
      </div>
    );
  }

  // Main verification form
  return (
    <>
      <style>
        {`
          @media (max-width: 365px) {
            .otp-input {
              width: 2.5rem; /* Reduced width for input fields */
              height: 2.5rem; /* Maintain aspect ratio */
              font-size: 0.875rem; /* Smaller font size */
            }
            .verify-button {
              max-width: 12rem; /* Reduced max-width for button */
              padding: 0.5rem 1rem; /* Adjusted padding */
              font-size: 0.875rem; /* Smaller font size */
            }
          }
        `}
      </style>
      <div className="flex flex-col items-center justify-center px-6 py-12">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Verify Your Email
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-md">
          Enter the 6-digit verification code we sent to your email to continue.
        </p>

        {/* OTP Input Fields */}
        <div className="flex gap-3 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste} // Added paste handler
              className="otp-input w-12 h-12 text-center text-lg font-semibold border rounded-lg 
                         text-gray-900 dark:text-white dark:bg-gray-800 
                         border-gray-300 dark:border-gray-700 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          ))}
        </div>

        {/* Verify Button */}

        {loading ? (
          <button className="verify-button w-full flex items-center font-medium max-w-sm gap-2 justify-center py-3 px-6 bg-[#50483f] dark:bg-[#6b5f4e] text-white rounded-md cursor-not-allowed">
            Verifying...{" "}
            <svg
              className="animate-spin h-5 w-5 text-white mb-0.5"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleVerify}
            className="verify-button py-3 px-6 rounded-md w-full max-w-sm bg-[#625a50] dark:bg-[#817565] 
                     hover:bg-[#50483f] dark:hover:bg-[#6b5f4e] text-white font-medium 
                     shadow-md transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            Verify
          </button>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-3 mt-2 bg-red-100 text-red-700 rounded-md flex items-center justify-center gap-2  animate-fade-in"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </motion.div>
        )}
      </div>
    </>
  );
}

export default MainVerify;
