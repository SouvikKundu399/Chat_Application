import React from 'react'
import { PrimeReactProvider } from 'primereact/api';
import './App.css'
import UserRouter from './Router/UserRouter.jsx';


function App() {
  return (
    <PrimeReactProvider>
      <div>
        <UserRouter />
      </div>
    </PrimeReactProvider>
    
  )
}

export default App
