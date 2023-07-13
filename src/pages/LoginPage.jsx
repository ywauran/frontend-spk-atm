import React, { useState } from "react";
import { app } from "../config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ToastError from "../components/toast/ToastError";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const auth = getAuth(app);
  let navigate = useNavigate();
  const handlerLoginSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate("/pages/data-criteria");
        sessionStorage.setItem(
          "Auth Token",
          userCredential._tokenResponse.refreshToken
        );
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setMessage("Kata Sandi Salah");
          setOpenMessage(true);
          setTimeout(() => {
            setOpenMessage(false);
          }, 2000);
        }

        if (error.code === "auth/user-not-found") {
          setMessage("Pengguna  Tidak Ditemukan");
          setOpenMessage(true);
          setTimeout(() => {
            setOpenMessage(false);
          }, 2000);
        }

        if (error.code === "auth/invalid-email") {
          setMessage("Email Tidak Valid");
          setOpenMessage(true);
          setTimeout(() => {
            openMessage(false);
          }, 2000);
        }
      });
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white rounded-lg shadow-lg w-96">
          <h3 className="text-2xl font-bold text-center text-first">Masuk</h3>
          <form action="">
            <div className="">
              <div>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="admin@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full max-w-xs input input-bordered"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="label">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="******"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full max-w-xs input input-bordered"
                />
              </div>
              <div className="mt-6">
                <button
                  onClick={handlerLoginSubmit}
                  className="w-full btn btn-primary"
                >
                  Masuk
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {openMessage && <ToastError message={message} />}
    </>
  );
};

export default LoginPage;
