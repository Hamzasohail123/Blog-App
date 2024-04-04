import viteLogo from '/vite.svg'
import './App.css'
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import {login, logout} from './store/authSlice';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {  
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))        
      } else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  }, [])
  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          {/* <Outlet /> */}
        </main>
        <Footer />
     <h1 className='bg-slate-600 text-xl'>aaaaaaaaaaaaaa</h1>
      </div>
    </div>
  ) : null
}

export default App
