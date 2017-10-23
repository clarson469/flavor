import React from 'react';
import about_text from './../../../data/about_text';
import './style.css';

function About ( props ) {
  const date = new Date(),
        year = date.getFullYear().toString();
  return (
    <article id='about' className='p child scroll-text '>
      <hgroup>
        <h2 id='about-header'>{about_text.header}</h2>
        <h5>{about_text.subheader}</h5>
      </hgroup>
      <hr />
      {about_text.content.map( (text, i) => <p key={i}>{text}</p> )}
      <footer id='about-footer'>
        <p>{about_text.copyright.replace('##COPYRIGHT##', '\u00A9').replace('##DATE##', year)}</p>
        <p>{about_text.contact}</p>
      </footer>
    </article>
  );
}

export default About;
