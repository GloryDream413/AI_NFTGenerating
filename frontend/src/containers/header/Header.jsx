import React from 'react';
import { useState } from "react";
import './header.css';
import axios from 'axios'
import ai from '../../assets/ai.png'
import ClipLoader from "react-spinners/ClipLoader";

export const Header = () => {
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

  const [pictureRoute, setPictureRoute] = useState('')
  const [bLoadingFlag, setLoadingFlag] = useState(false)
  const [displayCreateNFTFlag, setCreateNFTDisplayFlag] = useState(false)

  const onDisplayNFTProperty = async () => {
    setCreateNFTDisplayFlag(true);
  }

  const onGenerate = async () => {
    const prompt = about + ' ' + background + ' ' + style + ' ' +
      setLoadingFlag(true);
    console.log(ai);
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
    console.log(response.data.response.output[0]);
    setPictureRoute(response.data.response.output[0]);
    setLoadingFlag(false);
  };

  return (
    <div className="gpt3__header section__padding" id="home">
      <div className="gpt3__header-content">
        <h1 className="gradient__text">NFT GENERATOR</h1>
        {(displayCreateNFTFlag === true) &&
          <textarea
            className="desc"
            placeholder={'1. What it\'s about: (for example, "Cat in a desert with a hat"). The user can enter their own text after the example text disappears.'}
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
          <textarea
            className="desc"
            placeholder={'2. Background (optional): (for example, "Neon, Futuristic, Clean, White, Black, Colourful, Modern, maybe other one if you have an idea"). The user can choose from a set of multiple-choice options for backgrounds, or enter their own text after the example text disappears.'}
            name="background"
            value={background}
            onChange={onBackground}
          >
          </textarea>
        }

        {(displayCreateNFTFlag === true) &&
          <br></br>
        }

        {(displayCreateNFTFlag === true) &&
          <textarea
            className="desc"
            placeholder={'3. Style (optional): (for example, "Anime, Vintage, 3d, Cinematic, Futuristic, Ultra Realistic, Comic, maybe other one if you have an idea "). The user can choose from a set of multiple-choice options for styles, or enter their own text after the example text disappears.'}
            name="style"
            value={style}
            onChange={onStyle}
          >
          </textarea>
        }

        {(displayCreateNFTFlag === true) &&
          <br></br>
        }

        {(displayCreateNFTFlag === true) &&
          <textarea
            className="desc"
            placeholder={'4. Colors (optional): (for example, "White, Grey, Black, Red, Yellow, Blue, Green, Pink, Mix Colors, maybe other one if you have an idea ").The user can choose from a set of multiple-choice options for Colors. The user can enter their own text after the example text disappears.'}
            name="color"
            value={color}
            onChange={onColor}
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
        </div>k
      </div>

      <div className="gpt3__header-image">
        <img src={ai} alt="ai" />

        {(pictureRoute !== '') &&
          <div className='nft'>
            <img src={pictureRoute} alt="ai" />
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