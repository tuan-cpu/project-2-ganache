import { Navbar,Footer,Loader,Services,Transactions,Welcome } from './components';
import Ideas from './components/Ideas';
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
      <Footer/>
    </div>
  )
}

export default App
