import React, { useState } from 'react'




const Login = () => {


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
            

            <input
                type="email"
                label=""
                placeholder="Email Address"
                className="max-w-xs"
                onChange={e => setEmail(e.target.value)}
                />

                
            <input
                label=""
                placeholder="Password"
                type="password"
                className=""
                onChange={e => setPassword(e.target.value)}
            />


                

                                        
                <a href="#" className='underline underline-offset-1'>Forgot password?</a>



                
                <Button color="primary" className="w-80" type>
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