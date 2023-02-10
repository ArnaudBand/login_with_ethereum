import type { NextPage } from 'next';
import type { FC } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SiweMessage } from 'siwe';
import { useAccount, useNetwork, useSignMessage } from 'wagmi';

const Home: NextPage = () => {

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();


  const signIn = async () => {
    const chainId = chain?.id;
    const nonceRes = await fetch('/api/nonce');
    const nonce = await nonceRes.text();
    const message = new SiweMessage({
      domain: window.location.hostname,
      address,
      statement: 'Sign In with Ethereum',
      version: '1.0',
      chainId,
      nonce,
    });

    console.log({ message: message.prepareMessage() });
  }

  return (
    <div className='py-6 justify-center text-center'>
      <div className='flex justify-center'>
        <ConnectButton />
        <button onClick={signIn} className='rounded bg-slate-200 p-1 ml-2'>
          Sign in with Ethereum
        </button>
      </div>

      <h1 className='text-4xl font-bold mt-6'>🚀 create-web3-frontend</h1>
      <InfoSection />
    </div>
  );
};

const InfoSection: FC = () => {
  return (
    <div className='mt-10'>
      <h2 className='text-xl font-bold'>If you need help</h2>
      <div className='flex flex-col gap-2 mt-2'>
        <a
          href='https://wagmi.sh'
          target='_blank'
          className='underline text-gray-600'
        >
          Link to wagmi docs
        </a>
        <a
          href='https://github.com/dhaiwat10/create-web3-frontend'
          target='_blank'
          className='underline text-gray-600'
        >
          Open an issue on Github
        </a>
        <a
          href='https://twitter.com/dhaiwat10'
          target='_blank'
          className='underline text-gray-600'
        >
          DM me on Twitter
        </a>
      </div>
    </div>
  );
};

export default Home;
