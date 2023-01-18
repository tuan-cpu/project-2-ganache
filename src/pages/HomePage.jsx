import { Navbar,Footer,Services,Transactions,Welcome,Ideas,Sponsor,SubFooter } from '../components';
const HomePage = () =>{

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

export default HomePage;
