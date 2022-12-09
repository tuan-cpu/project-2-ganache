import { Navbar,Footer,SubFooter,SignIn } from '../components';
const SignInPage = () =>{
    return(
        <div>
            <div className='gradient-bg-welcome'><Navbar/></div>
            <SignIn/>
            <SubFooter/>
            <Footer/>
        </div>
    )
}

export default SignInPage;