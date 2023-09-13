import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockDetails,setBlockDetails]=useState("")

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  return <div className="App">Block Number: {blockNumber}
    <input
      type="text"
      placeholder="Enter a block number"
     onChange={
        (e)=>{
          setBlockDetails(e.target.value)
        }
      
     }
      />
      <button
      onClick={
        async ()=>{
          const block=await alchemy.core.getBlockByNumber(blockDetails)
          setBlockDetails(JSON.stringify(block))
        }
      }
      >Get Block Details</button>
      {blockDetails}
    
  </div>;
}

export default App;
