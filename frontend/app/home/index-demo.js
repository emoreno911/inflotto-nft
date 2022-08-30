import React, { useEffect, useContext } from 'react';
import { useMoralis } from "react-moralis";
import { DataContext } from '../context';
import History from './History';
import ConnectButton from './ConnectButton';
import LotteryEntrance from './Entrance';
import { NotificationProvider } from "web3uikit";

function Home() {
    const { fn, data:{inflationToday} } = useContext(DataContext);
    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

    useEffect(() => {
      if (isAuthenticated) {
        // add your logic here
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const login = async () => {
      if (!isAuthenticated) {

        await authenticate({signingMessage: "Log in using Moralis" })
          .then(function (user) {
            console.log("logged in user:", user);
            console.log(user.get("ethAddress"));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }

    const logOut = async () => {
      await logout();
      console.log("logged out");
    }

    // x inflation index
    // x current pool
    // time remaining
    // x minimum entry
    // x current tikets qty
    // x lotery history
    // x your tickets

  // return (
  //   <div className="wrap">
  //       <ConnectButton />
  //     <h1>Moralis Hello World!</h1>
  //     <button onClick={login}>Moralis Metamask Login</button>
  //     <button onClick={logOut} disabled={isAuthenticating}>Logout</button>

  //     <h3>YOY Inflation Today: {inflationToday.toFixed(3)} %</h3>
  //     <h3>Week #1</h3>
  //     <h3>Current Pool: $200</h3>
  //     <h3>Remainig: 0:00:00:00</h3>
  //     <div>
  //       <button>Buy Ticket</button>
  //     </div>
  //     <div>
  //       <h3>How to play?</h3>
  //       <ol>
  //         <li>Buy tickets with 0.01 MATIC</li>
  //         <li>Wait for Draw on Sunday 12pm</li>
  //         <li>The ticket with the closest number to that day's inflation rate will win the pool</li>
  //       </ol>
  //     </div>
  //     <div>
  //       <h3>Your tickets</h3>
  //       <p>...</p>

  //       <h3>Lottery History</h3>
  //       <History />
  //     </div>
  //   </div>
  // );

  return (
    <div className='wrap'>
      <NotificationProvider>
        <ConnectButton />
        <LotteryEntrance />
      </NotificationProvider>
    </div>
  )
}

export default Home;