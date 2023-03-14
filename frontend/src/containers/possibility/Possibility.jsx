import React from 'react';
import possibility from '../../assets/possibility.png';
import './possibility.css';
import { useContext } from "react";
import { UserContext } from "../../App";
import axios from 'axios';

const Possibility = () => {
  const { nftRoute } = useContext(UserContext);
  const downloadFile = () => {
    axios({
      url: nftRoute,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'myNFT.png'); // Name of the file to download
      document.body.appendChild(link);
      link.click();
    });
  };

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
          <button onClick={downloadFile}>Download your NFT</button>
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
    </div >
  );
};

export default Possibility;