import React from 'react';
import { useState } from "react";
import people from '../../assets/people.png';
import './header.css';
import axios from 'axios'
import ai from '../../assets/ai.png'
import ClipLoader from "react-spinners/ClipLoader";

export const Header = () => {
  const [prompt, setPrompt] = useState('')
  const onPromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const [pictureRoute, setPictureRoute] = useState('')
  const [bLoadingFlag, setLoadingFlag] = useState(false)

  const onGenerate = async () => {
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
        <h1 className="gradient__text">IMAGE GENERATOR</h1>
        <textarea
          className="desc"
          placeholder="Enter your imagine"
          name="prompt"
          value={prompt}
          onChange={onPromptChange}
        >

        </textarea>

        <div className="gpt3__header-content__input">
          <button type="button" onClick={onGenerate}>Generate</button>
          &nbsp;&nbsp;&nbsp;
          <a href='https://t.me/GloryDream413_Group'><button type="button" >Join Group</button></a>
        </div>

        <div className="gpt3__header-content__people">
          <img src={people} alt="people" />
          <p>2,400 people requested access a visit in last 24 hours</p>
        </div>
      </div>

      <div className="gpt3__header-image">
        {(pictureRoute === '') &&
          <img src={ai} alt="ai" />
        }
        {(pictureRoute !== '') &&
          <img src={pictureRoute} alt="ai" />
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
    </div>
  );
};

export default Header;