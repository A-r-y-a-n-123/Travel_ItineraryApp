import React, { useState } from 'react';

const Contact = () => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback && email) {
      alert(`Thank you for your feedback! We will get back to you at ${email}`);
      setFeedback('');
      setEmail('');
    } else {
      alert('Please provide both feedback and your email!');
    }
  };

  return (
    <div className="p-8 flex flex-col gap-5">
      <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
      
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">We'd love to hear your feedback</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg font-medium">Your Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="feedback" className="block text-lg font-medium">Your Feedback:</label>
            <textarea
              id="feedback"
              placeholder="Share your thoughts"
              value={feedback}
              onChange={handleFeedbackChange}
              required
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit Feedback
          </button>
        </form>
      </div>
      
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-center">Our Company Address</h3>
        <p className="text-lg p-3 bg-gray-200 rounded-md">
          1234 Travel St.<br />
          City, State, 12345<br />
          Email: support@travel.com<br />
          Phone: +1-800-123-4567
        </p>
      </div>
    </div>
  );
};

export default Contact;
