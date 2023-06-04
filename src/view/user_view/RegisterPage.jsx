import { Navbar,Footer,SubFooter,SignUp } from '../../components';
const RegisterPage = () =>{
    return(
        <div>
            <div className='gradient-bg-welcome'><Navbar/></div>
            <SignUp/>
            <SubFooter/>
            <Footer/>
        </div>
    )
}

export default RegisterPage;