import { Navbar,Footer,SignIn } from '../components';
const SignInPage = () =>{
    return(
        <div>
            <div className='gradient-bg-welcome'><Navbar/></div>
            <SignIn/>
            <Footer/>
        </div>
    )
}

export default SignInPage;