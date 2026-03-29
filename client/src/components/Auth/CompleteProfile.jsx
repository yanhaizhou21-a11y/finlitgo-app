import { useState } from 'react';
import { motion } from 'framer-motion';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import InputField from './InputField';

const CompleteProfile = ({ onComplete }) => {
  const [formData, setFormData] = useState({ username: '', placeOfBirth: '', dateOfBirth: '', photoUrl: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    setLoading(true);
    setError(null);
    try {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        username: formData.username,
        placeOfBirth: formData.placeOfBirth,
        dateOfBirth: formData.dateOfBirth,
        photoUrl: formData.photoUrl || '',
        email: auth.currentUser.email,
        updatedAt: new Date()
      }, { merge: true });
      onComplete(); // proceed to dashboard
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      key="completeProfile"
      initial={{ opacity: 0, scale: 0.95, position: 'absolute', width: '100%' }}
      animate={{ opacity: 1, scale: 1, position: 'relative', width: '100%' }}
      exit={{ opacity: 0, scale: 0.95, position: 'absolute', width: '100%' }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="flex flex-col w-full px-2"
    >
      <h2 className="text-4xl font-serif text-black mb-2 text-center md:text-left">Complete Profile</h2>
      <p className="text-sm text-gray-500 font-light mb-8 text-center md:text-left font-space">
        Just a few more details to get your account ready.
      </p>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <InputField
          label="Username"
          type="text"
          name="username"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleChange}
        />
        <div className="flex gap-4">
          <InputField
            label="Place of Birth"
            type="text"
            name="placeOfBirth"
            placeholder="City, Country"
            value={formData.placeOfBirth}
            onChange={handleChange}
          />
          <InputField
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            placeholder="YYYY-MM-DD"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <InputField
          label="Profile Photo URL (Optional)"
          type="url"
          name="photoUrl"
          placeholder="https://example.com/photo.jpg"
          value={formData.photoUrl}
          onChange={handleChange}
          required={false}
        />
        
        <button 
          type="submit" 
          disabled={loading}
          className="mt-4 w-full py-3.5 px-4 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:-translate-y-0.5 border border-transparent disabled:opacity-50 disabled:hover:-translate-y-0"
        >
          {loading ? 'Saving...' : 'Complete Setup'}
        </button>
      </form>
    </motion.div>
  );
};

export default CompleteProfile;
