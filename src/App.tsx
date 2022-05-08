import React, { useEffect, useState } from 'react';
import './App.css';
import './tailwind.css';
import Payload from './abis/Payload.json';
import {ethers} from "ethers";
import Web3 from 'web3';

import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import { injectedConnector } from "./connectors";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const { active, activate, account } = useWeb3React()

  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');
  const [param3, setParam3] = useState('');
  const [param4, setParam4] = useState('');
  const [param5, setParam5] = useState('');
  const [param6, setParam6] = useState('');

  const [updatedParam1, setUpdatedParam1] = useState('');
  const [updatedParam2, setUpdatedParam2] = useState('');
  const [updatedParam3, setUpdatedParam3] = useState('');
  const [updatedParam4, setUpdatedParam4] = useState('');
  const [updatedParam5, setUpdatedParam5] = useState('');
  const [updatedParam6, setUpdatedParam6] = useState('');

  useEffect(() => {
    if (!active) {
      activate(injectedConnector);
    }
  }, [active, activate])
  
  const connect = async() => {
    activate(injectedConnector, async (error: Error) => {
      if (error instanceof UnsupportedChainIdError) {
        showError('Unsupported Chain Id Error. Check your chain Id.')
      } else if (error instanceof NoEthereumProviderError) {
        showError('You need to install MetaMask extension.')
      } else if (
          error instanceof UserRejectedRequestErrorInjected
      ) {
        showError('Please authorize to access your account')
      } else {
        showError(error.message)
      }
    })
  }
  
  const showError = (msg: string) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  const callFunc = async() => {
    const { ethereum } = window as any;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = await provider.getSigner()
    const payloadContract = new ethers.Contract(Payload.address, Payload.abi, signer);
    
    try {
      if ( param6 === '' ) {
        if ( param5 === '' ) {
          if ( param4 === '' ) {
            if ( param3 === '' ) {
              if ( param2 === '' ) {
                if ( param1 === '' ) {
                  return await payloadContract.functions['M()']();
                }
                return await payloadContract.functions['M(uint256)'](
                  ethers.utils.parseUnits(param1, 18)
                );
              }
              return await payloadContract.functions['M(uint256,uint256)'](
                ethers.utils.parseUnits(param1, 18),
                ethers.utils.parseUnits(param2, 18)
              );
            }
            return await payloadContract.functions['M(uint256,uint256,uint256)'](
              ethers.utils.parseUnits(param1, 18), 
              ethers.utils.parseUnits(param2, 18), 
              ethers.utils.parseUnits(param3, 18)
            );
          }
          return await payloadContract.functions['M(uint256,uint256,uint256,address)'](
            ethers.utils.parseUnits(param1, 18), 
            ethers.utils.parseUnits(param2, 18), 
            ethers.utils.parseUnits(param3, 18), 
            param4
          );
        }
        return await payloadContract.functions['M(uint256,uint256,uint256,address,uint256)'](
          ethers.utils.parseUnits(param1, 18), 
          ethers.utils.parseUnits(param2, 18), 
          ethers.utils.parseUnits(param3, 18), 
          param4, 
          ethers.utils.parseUnits(param5, 18)
        );
      }
      return await payloadContract.functions['M(uint256,uint256,uint256,address,uint256,uint256)'](
        ethers.utils.parseUnits(param1, 18), 
        ethers.utils.parseUnits(param2, 18), 
        ethers.utils.parseUnits(param3, 18), 
        param4, 
        ethers.utils.parseUnits(param5, 18), 
        ethers.utils.parseUnits(param6, 18)
      )
    } catch (err: any) {
      showError(err["error"]["message"]);
    }
  }

  const getFunc = async() => {
    const { ethereum } = window as any;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = await provider.getSigner()
    const payloadContract = new ethers.Contract(Payload.address, Payload.abi, signer);

    setUpdatedParam1(ethers.utils.formatEther((await payloadContract.param1()).toString()));
    setUpdatedParam2(ethers.utils.formatEther((await payloadContract.param2()).toString()));
    setUpdatedParam3(ethers.utils.formatEther((await payloadContract.param3()).toString()));
    setUpdatedParam4((await payloadContract.param4()).toString());
    setUpdatedParam5(ethers.utils.formatEther((await payloadContract.param5()).toString()));
    setUpdatedParam6(ethers.utils.formatEther((await payloadContract.param6()).toString()));
  }

  return (
    <div className="bg-background text-white min-h-screen py-4 bg-cover bg-center mint">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="header justify-between items-center px-4 py-2 md:py-0  max-w-7xl mx-auto">
          <div className="flex justify-center py-5">
            <div className='font-bold text-2xl ml-auto mt-auto mb-auto'>Reduce Transaction Payload</div>
            {!account && 
              <button className="btn-custom h-auto small ml-auto" onClick={connect}>Connect Wallet</button>
            }
            {account && 
              <button className="btn-custom h-auto small ml-auto">{account}</button>
            }
          </div>
            {account && 
                <div className="mt-10 flex-col items-start flex justify-center px-4  max-w-7xl mx-auto bg-opacity-20 py-4 w-6/12 rounded-md">
                  <div className="flex flex-row items-start w-full mb-3">
                    <p className="font-semibold font-robot-mono p-3">Param1: </p>
                    <input type="text" className="font-bold ml-10 p-3 w-10/12" value={param1} onChange={(e) => setParam1(e.target.value)}/>
                  </div>
                  <div className="flex flex-row items-start w-full mb-3">
                    <p className="font-semibold font-robot-mono p-3">Param2: </p>
                    <input type="text" className="font-bold ml-10 p-3 w-10/12" value={param2} onChange={(e) => setParam2(e.target.value)}/>
                  </div>
                  <div className="flex flex-row items-start w-full mb-3">
                    <p className="font-semibold font-robot-mono p-3">Param3: </p>
                    <input type="text" className="font-bold ml-10 p-3 w-10/12" value={param3} onChange={(e) => setParam3(e.target.value)}/>
                  </div>
                  <div className="flex flex-row items-start w-full mb-3">
                    <p className="font-semibold font-robot-mono p-3">Param4: </p>
                    <input type="text" className="font-bold ml-10 p-3 w-10/12" value={param4} onChange={(e) => setParam4(e.target.value)}/>
                  </div>
                  <div className="flex flex-row items-start w-full mb-3">
                    <p className="font-semibold font-robot-mono p-3">Param5: </p>
                    <input type="text" className="font-bold ml-10 p-3 w-10/12" value={param5} onChange={(e) => setParam5(e.target.value)}/>
                  </div>
                  <div className="flex flex-row items-start w-full mb-3">
                    <p className="font-semibold font-robot-mono p-3">Param6: </p>
                    <input type="text" className="font-bold ml-10 p-3 w-10/12" value={param6} onChange={(e) => setParam6(e.target.value)}/>
                  </div>
                  <div className="flex flex-row items-start w-full mt-3 mb-3">
                    <button className="btn-custom p-3 border-black h-auto small ml-auto mr-auto" onClick={callFunc}>Call M method</button>
                    <button className="btn-custom p-3 border-black h-auto small ml-auto mr-auto" onClick={getFunc}>Get Params</button>
                  </div>
                </div>
            }
            <div className="w-full p-3">
              <table className="ml-auto mr-auto">
                <thead className="border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium p-3">Param 1</th>
                    <th scope="col" className="text-sm font-medium p-3">Param 2</th>
                    <th scope="col" className="text-sm font-medium p-3">Param 3</th>
                    <th scope="col" className="text-sm font-medium p-3">Param 4</th>
                    <th scope="col" className="text-sm font-medium p-3">Param 5</th>
                    <th scope="col" className="text-sm font-medium p-3">Param 6</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="text-sm font-medium td-data p-3">{updatedParam1}</td>
                    <td className="text-sm font-medium td-data p-3">{updatedParam2}</td>
                    <td className="text-sm font-medium td-data p-3">{updatedParam3}</td>
                    <td className="text-sm font-medium td-data p-3">{updatedParam4}</td>
                    <td className="text-sm font-medium td-data p-3">{updatedParam5}</td>
                    <td className="text-sm font-medium td-data p-3">{updatedParam6}</td>
                  </tr>
                </tbody>
              </table>
          </div>
      </div>
    </div>
  );
}

export default App;
