
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase.js";
import api from "../../utils/axios.js";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { useState } from "react";

function Home() {  
  const userData = useSelector((state) => state.user.userData)
  const dispatch = useDispatch()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState("")

  const handleLogin = async (token) => {
    try{
        const { data } = await api.post("/api/auth/login",{token})
        dispatch(setUserData(data))
        return data
    }
    catch(error){
        console.error("Login request failed:", error)
        setLoginError(
          error.response?.data?.message ||
          "The server is unavailable. Start the backend and try again."
        )
        return null
    }
  }

  const googleLogin = async () => {
    setLoginError("")
    setIsLoggingIn(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const token = await result.user.getIdToken()
      const user = await handleLogin(token)

      if (!user) {
        await auth.signOut()
      }
    } catch (error) {
      console.error("Google login failed:", error)
      setLoginError(error.message || "Google login was cancelled or failed.")
    } finally {
      setIsLoggingIn(false)
    }
  };

  return (
    <div className="h-screen flex bg-black text-white overflow-hidden">
      {!userData && <div className="fixed inset-0 x-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className='w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5'>
                <div className='flex flex-col gap-1'>
                  <h2 className='text-[17px] font-semibold text-slate-100 tracking-tight'>Welcome to VectorGrid</h2>
                  <p className='text-[13px] text-slate-500'>Please continue to using the App</p>
                </div>
                {loginError && <p className="text-xs text-red-400">{loginError}</p>}
                <button disabled={isLoggingIn} className='w-full items-center flex justify-center gap-3 py-[11px] rounded-xl
                text-sm font-medium text-black/90 bg-white hover:bg-gray-200 transition-all duration-150 cursor-pointer' onClick={googleLogin}>
                  <FcGoogle size={15} className="" /> {isLoggingIn ? "Signing in..." : "Continue with Google"}
                </button>
            </div>         
         </div>}
         
    </div>
  );
}

export default Home