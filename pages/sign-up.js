import { useClerk } from '@clerk/clerk-react'
import { useState } from 'react'

const SignUp = () => {
  const { client } = useClerk();
  const { signInAttempt, signUpAttempt } = client;

  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email_address: '',
    password: '',
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    signUpAttempt.create({ first_name, last_name, email_address, password });
  };

  return (
    <form
      className="flex flex-col w-64 mx-auto space-y-3"
      onSubmit={handleSubmit}
    >
      <input
        className="border-2 border-gray-600 rounded-lg py-2 px-3"
        type="text"
        id="first_name"
        name="first_name"
        placeholder="First name"
        onChange={handleChange}
      />
      <input
        className="border-2 border-gray-600 rounded-lg py-2 px-3"
        type="text"
        id="last_name"
        name="last_name"
        placeholder="Last Name"
        onChange={handleChange}
      />
      <input
        className="border-2 border-gray-600 rounded-lg py-2 px-3"
        type="email"
        id="email_address"
        name="email_address"
        placeholder="Email address"
        onChange={handleChange}
      />
      <input
        className="border-2 border-gray-600 rounded-lg py-2 px-3"
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button className="rounded-lg p-2 bg-blue-600 text-white" type="submit">
        Sign up
      </button>
    </form>
  );
};

export default SignUp;
