import React from 'react';
import possibility from '../../assets/possibility.png';
import './possibility.css';
import { useContext } from "react";
import { UserContext } from "../../App";

const Possibility = () => {
  const { nftRoute } = useContext(UserContext);
  console.log(nftRoute);
  return (
    <div className="gpt3__possibility section__padding" id="possibility">
      <div className="gpt3__possibility-image">
        <img src={possibility} alt="possibility" />
        {(nftRoute !== '') &&
          <div className='nft'>
            <img src={nftRoute} alt="ai" />
          </div>
        }
      </div>
      <div className="gpt3__possibility-content">
        <h1 className="gradient__text">NFT Options</h1>
        <div className="gpt3__header-content__input">
          <button type="button">Download your NFT</button>
        </div>
        <div className="gpt3__header-content__input">
          <button type="button">Create NFT collection of 100 - $39</button>
        </div>
        <div className="gpt3__header-content__input">
          <button type="button">Create NFT collection of 500 - $99</button>
        </div>
        <div className="gpt3__header-content__input">
          <button type="button">Create NFT collection of 1000 - $179</button>
        </div>
      </div>
    </div>
  );
};

export default Possibility;