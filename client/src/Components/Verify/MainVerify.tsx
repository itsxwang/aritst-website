import { useState, useRef } from "react";

function MainVerify() {
  const [code, setCode] = useState(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const finalCode = code.join("");
    console.log("Verification code:", finalCode);
      // TODO: send finalCode to backend
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-12">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Verify Your Email
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-md">
        Enter the 6-digit verification code we sent to your email to continue.
      </p>

      {/* OTP Input */}
      <div className="flex gap-3 mb-6">
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            ref={(el) => {
              inputsRef.current[index] = el; // No return statement
            }}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center text-lg font-semibold border rounded-lg 
                       text-gray-900 dark:text-white dark:bg-gray-800 
                       border-gray-300 dark:border-gray-700 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        ))}
      </div>

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        className="py-3 px-6 rounded-md w-full max-w-sm bg-[#625a50] dark:bg-[#817565] 
                   hover:bg-[#50483f] dark:hover:bg-[#6b5f4e] text-white font-medium 
                   shadow-md transition-all duration-300 transform hover:scale-105 cursor-pointer"
      >
        Verify
      </button>
    </div>
  );
}

export default MainVerify;