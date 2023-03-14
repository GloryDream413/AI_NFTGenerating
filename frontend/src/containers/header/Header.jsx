import React from 'react';
import { useState, useContext } from "react";
import './header.css';
import axios from 'axios'
import ai from '../../assets/ai.png'
import ClipLoader from "react-spinners/ClipLoader";
import { UserContext } from "../../App";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MultiSelect } from "react-multi-select-component";

const backgroundOptions = [
  { label: "Neon", value: "neon" },
  { label: "Futuristic", value: "futuristic" },
  { label: "Clean", value: "clean" },
  { label: "White", value: "white" },
  { label: "Black", value: "black" },
  { label: "Colourful", value: "colourful" },
  { label: "Modern", value: "modern" }
];

const styleOptions = [
  { label: "Anime", value: "anime" },
  { label: "Vintage", value: "vintage" },
  { label: "3d", value: "3d" },
  { label: "Cinematic", value: "cinematic" },
  { label: "Futuristic", value: "futuristic" },
  { label: "Ultra Realistic", value: "ultra realistic" },
  { label: "Comic", value: "comic" }
];

const colorOptions = [
  { label: "White", value: "white" },
  { label: "Grey", value: "grey" },
  { label: "Black", value: "black" },
  { label: "Red", value: "red" },
  { label: "Yellow", value: "yellow" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Pink", value: "pink" },
  { label: "Mix Colors", value: "mix color" }
];

export const Header = () => {
  const { nftRoute, setNftRoute } = useContext(UserContext);
  const [about, setAbout] = useState('')
  const onAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const [backgroundTextChecked, setBackgroundTextChecked] = useState(false);
  const backgroundTextChange = (event) => {
    setBackgroundTextChecked(event.target.checked);
  }

  const [backgroundText, setBackgroundText] = useState('')
  const onBackgroundText = (event) => {
    setBackgroundText(event.target.value);
  };

  const [backgroundSelectedValue, setBackgroundSelectedValue] = useState([]);

  const [styleTextChecked, setStyleTextChecked] = useState(false);
  const styleTextChange = (event) => {
    setStyleTextChecked(event.target.checked);
  }

  const [styleText, setStyleText] = useState('')
  const onStyleText = (event) => {
    setStyleText(event.target.value);
  };

  const [styleSelectedValue, setStyleSelectedValue] = useState([]);

  const [colorTextChecked, setColorTextChecked] = useState(false);
  const colorTextChange = (event) => {
    setColorTextChecked(event.target.checked);
  }

  const [colorText, setColorText] = useState('')
  const onColorText = (event) => {
    setColorText(event.target.value);
  };

  const [colorSelectedValue, setColorSelectedValue] = useState([]);

  const [bLoadingFlag, setLoadingFlag] = useState(false)
  const [displayCreateNFTFlag, setCreateNFTDisplayFlag] = useState(false)

  const onDisplayNFTProperty = async () => {
    setCreateNFTDisplayFlag(true);
  }

  const onGenerate = async () => {
    if (about === '') {
      toast.error("Main Prompt is Empty.");
      return;
    }
    let prompt = about;
    let backSelectedValue = '';
    for (let i = 0, l = backgroundSelectedValue.length; i < l; i++) {
      backSelectedValue += ' ';
      backSelectedValue += backgroundSelectedValue[i].value;
    }

    if (backSelectedValue !== '' || backgroundText !== '') {
      prompt += ', Background';
      if (backSelectedValue !== '') {
        prompt += ' ';
        prompt += backSelectedValue;
      }
      if (backgroundText !== '') {
        prompt += ' ';
        prompt += backgroundText;
      }
    }

    let stySelectedValue = '';
    for (let i = 0, l = styleSelectedValue.length; i < l; i++) {
      stySelectedValue += ' ';
      stySelectedValue += styleSelectedValue[i].value;
    }
    if (stySelectedValue !== '' || styleText !== '') {
      prompt += ', Style';
      if (stySelectedValue !== '') {
        prompt += ' ';
        prompt += stySelectedValue;
      }
      if (styleText !== '') {
        prompt += ' ';
        prompt += styleText;
      }
    }

    let colSelectedValue = '';
    for (let i = 0, l = colorSelectedValue.length; i < l; i++) {
      colSelectedValue += ' ';
      colSelectedValue += colorSelectedValue[i].value;
    }
    if (colSelectedValue !== '' || colorText !== '') {
      prompt += ', Color';
      if (colSelectedValue !== '') {
        prompt += ' ';
        prompt += colSelectedValue;
      }
      if (colorText !== '') {
        prompt += ' ';
        prompt += colorText;
      }
    }
    prompt = prompt.replace('  ', ' ');
    console.log(prompt);
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
            <label>Background Additional Text (optional)</label>
            &nbsp;&nbsp;
            <input type="checkbox" checked={backgroundTextChecked} onChange={backgroundTextChange} />
          </div>
        }

        {(displayCreateNFTFlag === true) &&
          <MultiSelect
            options={backgroundOptions}
            value={backgroundSelectedValue}
            onChange={setBackgroundSelectedValue}
            labelledBy="Background Style"
          />
        }

        {(displayCreateNFTFlag === true && backgroundTextChecked === true) &&
          <textarea
            className="desc"
            placeholder={'Background Style Additional Text'}
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
            <label>Style Additional Text (optional)</label>
            &nbsp;&nbsp;
            <input type="checkbox" checked={styleTextChecked} onChange={styleTextChange} />
          </div>
        }

        {(displayCreateNFTFlag === true) &&
          <MultiSelect
            options={styleOptions}
            value={styleSelectedValue}
            onChange={setStyleSelectedValue}
            labelledBy="Style"
          />
        }

        {(displayCreateNFTFlag === true && styleTextChecked === true) &&
          <textarea
            className="desc"
            placeholder={'Style Additional Text'}
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
            <label>Color Additional Text (optional)</label>
            &nbsp;&nbsp;
            <input type="checkbox" checked={colorTextChecked} onChange={colorTextChange} />
          </div>
        }

        {(displayCreateNFTFlag === true) &&
          <MultiSelect
            options={colorOptions}
            value={colorSelectedValue}
            onChange={setColorSelectedValue}
            labelledBy="Color"
          />
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
      <ToastContainer autoClose={3000} draggableDirection='x' />
    </div >
  );
};
export default Header;