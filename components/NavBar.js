import React from 'react'
import Link from "next/link"
import { useState,useEffect } from 'react'
import Web3 from "web3"
import detectEthereumProvider from '@metamask/detect-provider'

 const NavBar = () => {

  const[web3Api,setWe3Api] = useState({
    provider:null,
    web3:null
})

const providerChanged = (provider)=>{
    provider.on("accountsChanged",_=>window.location.reload());
    provider.on("chainChanged",_=>window.location.reload());

}
const[account,setAccount]= useState(null);
useEffect(()=>{
    const loadProvider = async()=>{
        const provider =  await detectEthereumProvider();

        if(provider){
            providerChanged(provider);
            setWe3Api({
                provider,
                web3:new Web3(provider),
            })
        } else {

          window.alert("Unlock Your Wallet or Install a Wallet Like Metamask")
            
          router.push("https://metamask.io/download.html")
        }


    }

    loadProvider()
},[])


useEffect(()=>{
    const loadAccount = async()=>{
        const accounts = await web3Api.web3.eth.getAccounts();
        setAccount(accounts[0])

        
    }

  web3Api.web3&& loadAccount();
},[ web3Api.web3])


useEffect(()=>{
    const connect = async()=>{
       await connectMetamask()
    }
    web3Api.web3&& account&&connect()
   
},[web3Api.web3&&account])


const connectMetamask = async () => {
    const currentProvider = await detectEthereumProvider();
    console.log( "WE ARE IN META MASK CONNECT" );
      if (currentProvider) {
          // let web3InstanceCopy = new Web3(currentProvider);
          // setWeb3Instance(web3InstanceCopy);
          if (!window.ethereum.selectedAddress) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
          }
          await window.ethereum.enable();
          let currentAddress = window.ethereum.selectedAddress;
          console.log(currentAddress);
          setAccount(currentAddress);
           const web3 = new Web3(currentProvider);
          let amount = await web3.eth.getBalance(currentAddress);
          amount = web3.utils.fromWei(web3.utils.toBN(amount), "ether");
      } else {
          console.log('Please install MetaMask!');
      }

  }

    return (
        <div>
<nav className="bg-gray-800">
  <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div className="relative flex items-center justify-between h-16">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          
          <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          
          <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div className="logo flex-shrink-0 flex items-center">
        <div className="flex-shrink-0 flex items-center">
          <img className="block lg:hidden h-8 w-auto" src="./logo.png" alt="Workflow"/>
          <img className="hidden lg:block h-8 w-auto" src="./logo.png" alt="Workflow"/>
        </div>
        <div className="logoName">
            <Link  href="/">
            <a className="text-red-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-bold">AKITAVAX</a>
            </Link>
            </div>


        </div>

        <div className="hidden sm:block sm:ml-6">
          <div className="flex space-x-4">
              <Link href="/">
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Explore</a>
                </Link>
                <Link  href="/purchased">
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Purchased</a>
            </Link>
                <Link href="/dashboard">
            <a  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashbaord</a>
            </Link>
                <Link href="/create-nfts">
            <a  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create NFt</a>
            </Link>
                
          </div>
          
        </div>
      </div>
      {
                               !account?      
                        <button className=" flex items-start justify-center p-8  border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-gray-700 md:py-4 md:text-lg md:px-10"onClick={connectMetamask} >Connect Wallet</button>:
                        <button className=" flex items-start justify-center p-8  border border-transparent text-base font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 md:py-4 md:text-lg md:px-10" >{account.toString()}</button>
                           }
    </div>
  </div>

 
  <div className="sm:hidden" id="mobile-menu">
    <div className="px-2 pt-2 pb-3 space-y-1">
       <Link  href="/">
      <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Explore</a>
      </Link>
                <Link href="/purchased">
      <a  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Purchased</a>
      </Link>
                <Link href="/dashboard">
      <a  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Dashbaord</a>
      </Link>
         <Link href="/create-nfts">
      <a  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Create NFt</a>
      </Link>
    </div>
  </div>
</nav>
        </div>
    )
}

export default NavBar;


