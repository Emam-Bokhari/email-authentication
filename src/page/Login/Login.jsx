import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"
import app from "../../firebase/firebase.config";
import { useRef, useState } from "react";

const Login = () => {
    const auth = getAuth(app)
    const [signinUserSuccess, setSigninUserSuccess] = useState('')
    const [signinUserError, setSigninUsreError] = useState('')
    const emailRef=useRef(null)

    const handleLogin = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value

        setSigninUserSuccess('')
        setSigninUsreError('')
        
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
               if(result.user.emailVerified){
                setSigninUserSuccess('Signin Successful!')
               }
               else{
                alert('Please verifiy your email')
               }
            })
            .catch(error => {
                setSigninUsreError(error.message)
            })
    }

    const handleForgetPassword=()=>{
       const email= emailRef.current.value
       if(!email){
        console.log('please provide an email',emailRef.current.value);
       return 
       }

       else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
        return alert('Please provide valid email.')
       }


       sendPasswordResetEmail(auth,email)
       .then(()=>{
        alert('please check your email')
       })
       .catch(error=>{
        console.log(error.message);
       })
    }

    return (
        <div>

            <div className="w-[300px] h-[400px] border-2 border-blue-300 mx-auto px-4" >
                <h2 className="text-center text-indigo-500 font-medium text-2xl mt-5 " >Login</h2>
                <form onSubmit={handleLogin} className="text-center space-y-5 mt-5" >


                    <input ref={emailRef} type="email" name="email" placeholder="Email Address" className="text-lg border-2 border-black rounded-md outline-none w-full px-2  " required />

                    <div className="flex justify-end  items-center" >
                        <input type="password" name="password" placeholder="Password" className="text-lg border-2 border-black rounded-md outline-none w-full px-2 relative " />
                    </div>

                    <p className="text-left underline" ><a onClick={handleForgetPassword} href="#">Forget Password?</a></p>



                    <div>
                        <input type="submit" value="Signin" className="w-full bg-indigo-400 rounded-md py-1 text-white font-medium text-xl" required />
                    </div>

                    <div>
                        {signinUserError && <p> {signinUserError}</p>}
                    </div>

                    <div>
                        {signinUserSuccess && <p>{signinUserSuccess}</p>}
                    </div>


                </form>
            </div>
        </div>
    );
};

export default Login;