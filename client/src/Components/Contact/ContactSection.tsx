import { Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="w-full flex-grow px-4 sm:px-6 md:px-12 lg:px-20 py-16 dark:bg-transparent bg-white transition-colors duration-300">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-5xl md:text-6xl font-bold font-playfair dark:text-white text-black ">
          Get In Touch
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300 md:text-[1.2rem] sm:text-base font-semibold">
          Interested in commissioning a piece or have questions about available artworks?
        </p>
      </div>

      {/* Content Grid */}
      <div className="flex flex-col md:mt-11 lg:flex-row gap-10 max-w-5xl mx-auto">
        
        {/* Left: Contact Info */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Email */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-[#e0dcd1] dark:bg-[#2a3042] flex items-center justify-center">
              <Mail className="text-[#625a50] dark:text-[#c7c2b8]" />
            </div>
            <div>
              <h4 className="font-semibold text-black dark:text-white">Email</h4>
              <p className="text-gray-700 dark:text-gray-300">sfgsamridhi36325@gmail.com</p>
            </div>
          </div>

          {/* Phone (not currently used) */}
          {/* <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-[#e0dcd1] dark:bg-[#2a3042] flex items-center justify-center">
              <Phone className="text-[#625a50] dark:text-[#c7c2b8]" />
            </div>
            <div>
              <h4 className="font-semibold text-black dark:text-white">Phone</h4>
              <p className="text-gray-700 dark:text-gray-300">(555) 123-4567</p>
            </div>
          </div> */}

          {/* Studio */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-[#e0dcd1] dark:bg-[#2a3042] flex items-center justify-center">
              <MapPin className="text-[#625a50] dark:text-[#c7c2b8]" />
            </div>
            <div>
              <h4 className="font-semibold text-black dark:text-white">Studio</h4>
              <p className="text-gray-700 dark:text-gray-300">Portland, Oregon</p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="block mb-1 text-black dark:text-white text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-[#1c1e2e] border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#817565] dark:focus:ring-[#c7c2b8] text-black dark:text-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-black dark:text-white text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-[#1c1e2e] border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#817565] dark:focus:ring-[#c7c2b8] text-black dark:text-white"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1 text-black dark:text-white text-sm font-medium">Message</label>
              <textarea
                rows={4}
                placeholder="Your message"
                className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-[#1c1e2e] border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#817565] dark:focus:ring-[#c7c2b8] text-black dark:text-white"
              />
            </div>

            {/* Send Button */}
            <button
              type="submit"
              className="mt-2 py-3 rounded-md font-medium transition duration-300 cursor-pointer 
                bg-[#625a50] text-black hover:opacity-90
                dark:bg-[#817565] dark:text-white hover:bg-[#625a50]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
