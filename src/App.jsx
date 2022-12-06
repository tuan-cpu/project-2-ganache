import { Navbar,Footer,Loader,Services,Transactions,Welcome } from './components';
import Ideas from './components/Ideas';
import Sponsor from './components/Sponsors';
import SubFooter from './components/SubFooter';
const App = () =>{

  return (
    <div className="min-h-screen">
      <div className='gradient-bg-welcome'>
        <Navbar/>
        <Welcome/>
      </div>
      <Services/>
      <Ideas/>
      <Transactions/>
      <Sponsor/>
      <SubFooter/>
      <Footer/>
    </div>
  )
}

export default App
