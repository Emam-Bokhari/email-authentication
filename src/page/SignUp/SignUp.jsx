import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth"
import app from '../../firebase/firebase.config';
import { useState } from "react";
import {BsEyeSlash,BsEye} from "react-icons/bs"

const SignUp = () => {
    const [showPassword,setShowPassword]=useState(false)
    const [signUpUserError, setSignUpUserError] = useState('')
    const [signUpUserSuccess, setSignUpUserSuccess] = useState('')


    const auth = getAuth(app)

    const handleSignUp = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value
        const text=event.target.text.value
        const terms=event.target.terms.checked

        if(password.length<6){
            setSignUpUserError('Password should not be less than 6 characters')
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setSignUpUserError('Your password should have at least one upper case chracters.')
            return;
        }
        else if(!terms){
            setSignUpUserError('Please check terms and condition')
            return;
        }

        setSignUpUserError('')
        setSignUpUserSuccess('')


        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSignUpUserSuccess('Successfull!')

                updateProfile(result.user,{
                    displayName:text
                })
                .then(()=>{
                    alert('Profile Updated Succesfully!')
                })
                .catch()

                sendEmailVerification(result.user)
                .then(()=>{
                    alert('Please check your eamil for verification')
                })
            })
            .catch(error => {
                setSignUpUserError(error.message)
            })

    }

    return (
        <div >
            <div className="w-[300px] h-[400px] border-2 border-blue-300 mx-auto px-4" >
                <h2 className="text-center text-indigo-500 font-medium text-2xl mt-5 " >SignUp</h2>
                <form onSubmit={handleSignUp} className="text-center space-y-5 mt-5" >
                    <input type="email" name="email" placeholder="Email Address" className="text-lg border-2 border-black rounded-md outline-none w-full px-2  " required />

                    <input type="text" name="text" placeholder="Enter Your Name" className="text-lg border-2 border-black rounded-md outline-none w-full px-2  " required />

                    <div className="flex justify-end  items-center" >
                    <input  type={showPassword?"text":"password"} name="password" placeholder="Password" className="text-lg border-2 border-black rounded-md outline-none w-full px-2 relative " />
                    <span className="absolute px-2" onClick={()=>setShowPassword(!showPassword)} >{showPassword?<BsEye/>:<BsEyeSlash/>}</span>
                    </div>

                    <div className="flex justify-start" >
                    <input type="checkbox" name="terms" id="terms" />
                    <label className="ml-2" htmlFor="terms">Aceapt <a className="underline decoration-color"  href="#">Terms and Condition</a></label>
                    </div>

                    <div>
                        <input type="submit" value="Register" className="w-full bg-indigo-400 rounded-md py-1 text-white font-medium text-xl" required/>
                    </div>

                    <div>
                        {signUpUserError && <p>{signUpUserError}</p>}
                    </div>

                    <div>
                        {signUpUserSuccess && <p>{signUpUserSuccess}</p>}
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SignUp;