import React, { useState } from 'react'
import {Input} from "@nextui-org/input";
import {EyeFilledIcon} from "../assets/Logologin/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../assets/Logologin/EyeSlashFilledIcon";
import {Button} from "@nextui-org/react";



const Login = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    function handleSubmit(event) {
        event.preventDefault();
    }


  return (
    <div className='flex justify-center items-center bg-stone-800'>
            <div className="flex p-10 border-none rounded-md mt-8 my-8
            w-fit h-fit text-white bg-stone-900
            items-center justify-center flex-col md:flex-nowrap gap-4">

                
            <div className='max-h-full max-w-full'>
                <img className='logo h-26 w-26 ' 
                src="src/assets/Logo-7.svg" alt="logo"/>
            </div>

            <h1 className="text-2xl md:text-4xl">Sign In</h1>
            
            <form className='flex flex-col gap-4 justify-center items-center' 
            
            onSubmit={handleSubmit}>

            <Input
                type="email"
                label=""
                variant="bordered"
                color='default-500'
                placeholder="Email Address"
                defaultValue=""
                className="max-w-xs"
                onChange={e => setEmail(e.target.value)}
                />

                
            <Input
                label=""
                variant="bordered"
                placeholder="Password"
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs "
                onChange={e => setPassword(e.target.value)}
                />

                

                                        
                <a href="#" className='underline underline-offset-1'>Forgot password?</a>



                
                <Button color="primary" className="w-80">
                    Sign in
                </Button>

                <p>—————— or sign in with ——————</p>

                <a href="#" className='underline underline-offset-1'>Create account</a>


            </form>
          

            </div>
    </div>
 )
}

export default Login