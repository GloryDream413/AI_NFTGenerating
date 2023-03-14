import React from 'react';
import { useState, useContext } from "react";
import './header.css';
import axios from 'axios'
import ai from '../../assets/ai.png'
import ClipLoader from "react-spinners/ClipLoader";
import { UserContext } from "../../App";

export const Header = () => {
  const { nftRoute, setNftRoute } = useContext(UserContext);
  const [about, setAbout] = useState('')
  const onAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const [backgroundChecked, setBackgroundStyleChecked] = useState(false);
  const backgroundStyleChange = (event) => {
    setBackgroundStyleChecked(event.target.checked);
  }

  const [backgroundTextChecked, setBackgroundTextChecked] = useState(false);
  const backgroundTextChange = (event) => {
    setBackgroundTextChecked(event.target.checked);
  }

  const [backgroundText, setBackgroundText] = useState('')
  const onBackgroundText = (event) => {
    setBackgroundText(event.target.value);
  };

  const [styleChecked, setStyleChecked] = useState(false);
  const styleChange = (event) => {
    setStyleChecked(event.target.checked);
  }

  const [styleTextChecked, setStyleTextChecked] = useState(false);
  const styleTextChange = (event) => {
    setStyleTextChecked(event.target.checked);
  }

  const [styleText, setStyleText] = useState('')
  const onStyleText = (event) => {
    setStyleText(event.target.value);
  };

  const [colorChecked, setColorChecked] = useState(false);
  const colorChange = (event) => {
    setColorChecked(event.target.checked);
  }

  const [colorTextChecked, setColorTextChecked] = useState(false);
  const colorTextChange = (event) => {
    setColorTextChecked(event.target.checked);
  }

  const [colorText, setColorText] = useState('')
  const onColorText = (event) => {
    setColorText(event.target.value);
  };

  const [bLoadingFlag, setLoadingFlag] = useState(false)
  const [displayCreateNFTFlag, setCreateNFTDisplayFlag] = useState(false)

  const onDisplayNFTProperty = async () => {
    setCreateNFTDisplayFlag(true);
  }

  const onGenerate = async () => {
    const prompt = about + ' ' + backgroundText + ' ' + styleText
    setLoadingFlag(true);
    const response = await axios.post(
      'http://65.21.236.218:8081/getImage',
      {
        input: prompt
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    setNftRoute(response.data.response.output[0]);
    setLoadingFlag(false);
  };

  return (
    <div className="gpt3__header section__padding" id="home">
      <div className="gpt3__header-content">
        <h1 className="gradient__text">MOSAIC NFT GENERATOR</h1>
        {(displayCreateNFTFlag === true) &&
          <label>What should your NFT represent?</label>
        }
        {(displayCreateNFTFlag === true) &&
          <textarea
            className="desc"
            placeholder={'What it\'s about: (for example, "Cat with a hat in a dessert").'}
            name="about"
            value={about}
            onChange={onAboutChange}
          >
          </textarea>
        }

        {(displayCreateNFTFlag === true) &&
          <br></br>
        }

        {(displayCreateNFTFlag === true) &&
          <div className='extraStyle'>
            <label>Background Style (optional)</label>
            &nbsp;&nbsp;
            <input type="checkbox" checked={backgroundChecked} onChange={backgroundStyleChange} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>Additional Text (optional)</label>
            &nbsp;&nbsp;
            <input type="checkbox" checked={backgroundTextChecked} onChange={backgroundTextChange} />
          </div>
        }

        {(displayCreateNFTFlag === true && backgroundChecked === true) &&
          <select name="backgroundStyle" id="backgroundStyle" multiple>
            <option value="neon">Neon</option>
            <option value="futuristic">Futuristic</option>
            <option value="clean">Clean</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="colourful">Colourful</option>
            <option value="modern">Modern</option>
          </select>
        }

        {(displayCreateNFTFlag === true && backgroundTextChecked === true) &&
          <textarea
            className="desc"
            placeholder={'Additional Text'}
            name="backgroundText"
            value={backgroundText}
            onChange={onBackgroundText}
          >
          </textarea>
        }

        {(displayCreateNFTFlag === true) &&
          <br></br>
        }

        {(displayCreateNFTFlag === true) &&
          <div className='extraStyle'>
            <label>Style (optional)</label>
            &nbsp;&nbsp;
            <input type="checkbox" checked={styleChecked} onChange={styleChange} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>Additional Text (optional)</label>
            &nbsp;&nbsp;
            <input type="checkbox" checked={styleTextChecked} onChange={styleTextChange} />
          </div>
        }

        {(displayCreateNFTFlag === true && styleChecked === true) &&
          <select name="style" id="style" multiple>
            <option value="anime">Anime</option>
            <option value="vintage">Vintage</option>
            <option value="3d">3d</option>
            <option value="cinematic">Cinematic</option>
            <option value="futuristic">Futuristic</option>
            <option value="ultra realistic">Ultra Realistic</option>
            <option value="comic">Comic</option>
          </select>
        }

        {(displayCreateNFTFlag === true && styleTextChecked === true) &&
          <textarea
            className="desc"
            placeholder={'Additional Text'}
            name="styleText"
            value={styleText}
            onChange={onStyleText}
          >
          </textarea>
        }

        {(displayCreateNFTFlag === true) &&
          <br></br>
        }

        {(displayCreateNFTFlag === true) &&
          <div className='extraStyle'>
            <label>Colors (optional)</label>
            &nbsp;&nbsp;
            <input type="checkbox" checked={colorChecked} onChange={colorChange} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>Additional Text (optional)</label>
            &nbsp;&nbsp;
            <input type="checkbox" checked={colorTextChecked} onChange={colorTextChange} />
          </div>
        }

        {(displayCreateNFTFlag === true && colorChecked) &&
          <select name="colorStyle" id="colorStyle" multiple>
            <option value="white">White</option>
            <option value="grey">Grey</option>
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="pink">Pink</option>
            <option value="mix color">Mix Colors</option>
          </select>
        }

        {(displayCreateNFTFlag === true && colorTextChecked === true) &&
          <textarea
            className="desc"
            placeholder={'Additional Text'}
            name="colorText"
            value={colorText}
            onChange={onColorText}
          >
          </textarea>
        }

        <div className="gpt3__header-content__input">
          {(displayCreateNFTFlag === false) &&
            <button type="button" onClick={onDisplayNFTProperty}>Create NFT</button>
          }

          {(displayCreateNFTFlag === true) &&
            <button type="button" onClick={onGenerate}>Create your NFT</button>
          }
        </div>
      </div>

      <div className="gpt3__header-image">
        <img src={ai} alt="ai" />

        {(nftRoute !== '') &&
          <div className='nft'>
            <img src={nftRoute} alt="ai" />
          </div>
        }

        <div className="spinner-wrapper">
          {(bLoadingFlag === true) &&
            < ClipLoader
              color='#ffffff'
              loading={true}
              cssOverride={true}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          }
        </div>
      </div>
    </div >
  );
};

export default Header;