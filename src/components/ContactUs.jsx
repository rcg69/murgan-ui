import React from "react";

const ContactUs = () => (
  <section className="contact-us-section p-8 bg-white rounded shadow-md max-w-2xl mx-auto mt-10">
    <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
    <p className="text-lg text-gray-700 mb-6 text-center">
      We'd love to hear from you! Reach out to us for any questions, feedback, or support.
    </p>
    <form className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Your Name"
        className="border p-2 rounded"
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        className="border p-2 rounded"
        required
      />
      <textarea
        placeholder="Your Message"
        className="border p-2 rounded"
        rows={4}
        required
      />
      <button
        type="submit"
        className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800"
      >
        Send Message
      </button>
    </form>
  </section>
);

export default ContactUs;
