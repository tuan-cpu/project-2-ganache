import { Navbar,Footer,SubFooter,ResetPassword } from '../../components';
const ResetPasswordPage = () =>{
    return(
        <div>
            <div className='gradient-bg-welcome'><Navbar/></div>
            <ResetPassword/>
            <SubFooter/>
            <Footer/>
        </div>
    )
}

export default ResetPasswordPage;