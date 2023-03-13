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

  const [background, setBackground] = useState('')
  const onBackground = (event) => {
    setBackground(event.target.value);
  };

  const [color, setColor] = useState('')
  const onColor = (event) => {
    setColor(event.target.value);
  };

  const [style, setStyle] = useState('')
  const onStyle = (event) => {
    setStyle(event.target.value);
  };

  const [bLoadingFlag, setLoadingFlag] = useState(false)
  const [displayCreateNFTFlag, setCreateNFTDisplayFlag] = useState(false)

  const onDisplayNFTProperty = async () => {
    setCreateNFTDisplayFlag(true);
  }

  const onGenerate = async () => {
    const prompt = about + ' ' + background + ' ' + style
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
          <label for="cars">What should your NFT represent?</label>
        }
        {(displayCreateNFTFlag === true) &&
          <textarea
            className="desc"
            placeholder={'What it\'s about: (for example, "Cat in a desert with a hat").'}
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
          <label for="backgroundStyle">Background Style (optional)</label>
        }

        {(displayCreateNFTFlag === true) &&
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

        {(displayCreateNFTFlag === true) &&
          <br></br>
        }

        {(displayCreateNFTFlag === true) &&
          <label for="style">Style (optional)</label>
        }

        {(displayCreateNFTFlag === true) &&
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

        {(displayCreateNFTFlag === true) &&
          <br></br>
        }

        {(displayCreateNFTFlag === true) &&
          <label for="colorStyle">Colors (optional)</label>
        }

        {(displayCreateNFTFlag === true) &&
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