import React from 'react';
import possibility from '../../assets/possibility.jpg';
import './possibility.css';

const Possibility = () => (
  <div className="gpt3__possibility section__padding" id="possibility">
    <div className="gpt3__possibility-image">
      <img src={possibility} alt="possibility" />
    </div>
    <div className="gpt3__possibility-content">
      <h1 className="gradient__text">The possibilities are <br /> beyond your imagination</h1>
      <p>The machine creates images from text by the power of artificial intelligence.</p>
    </div>
  </div>
);

export default Possibility;