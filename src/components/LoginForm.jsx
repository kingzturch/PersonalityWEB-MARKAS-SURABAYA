// src/components/LoginForm.jsx
import { useState } from "react";
import { db } from "../API/MarkmateAPI";
import { collection, addDoc } from "firebase/firestore";
import PropTypes from "prop-types";

const LoginForm = ({ onLogin }) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama.trim() || !email.trim()) {
      alert("Nama dan Email harus diisi!");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "users"), {
        nama: nama.trim(),
        email: email.trim(),
        createdAt: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);
      setNama("");
      setEmail("");
      onLogin(email);
    } catch (e) {
      console.error("Gagal dalam menambahkan data ke Firestore: ", e);
    }
  };

  return (
    <div className="login-form bg-[#DA1E3D] flex flex-col items-center justify-center min-h-screen">
      <div className="flex w-full max-w-screen-lg overflow-hidden rounded-lg gap-x-8">
        <div
          className="image-section hidden md:block fixed top-0 left-0 w-1/2 h-full bg-cover bg-center flex-1 rounded-r-[50px] z-0"
          style={{ backgroundImage: "url(./foto.jpeg)" }}
        ></div>
        <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-[#DA1E3D] fixed top-0 right-0">
          <div className="max-w-lg w-full p-8">
            <h2 className="text-2xl font-semibold text-center text-white mb-6">
              Sebelum Melakukan Tes, Isi Dulu Yuk!
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Nama Lengkap</label>
                <div className="relative">
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan Nama"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <span className="absolute left-3 top-3 text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-white mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan Email"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <span className="absolute left-3 top-3 text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 mt-4 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                TES SEKARANG!
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
