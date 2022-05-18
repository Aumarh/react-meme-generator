// importing libraries
import './App.css';
import axios from 'axios';
import FileSaver from 'file-saver';
import { useEffect, useState } from 'react';

function App() {
  const [templates, setTemplates] = useState([]);
  const [dropdown, setDropdown] = useState('');
  const [toptext, setToptext] = useState('');
  const [bottomtext, setBottomtext] = useState('');
  const [image, setImage] = useState(
    `https://api.memegen.link/images/${dropdown}/${toptext}/${bottomtext}.png`,
  );

  // declaring filesaver package
  const saveFile = () => {
    FileSaver.saveAs(image, 'meme.png');
  };

  // fetching the image from the meme link

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('https://api.memegen.link/templates');
        setTemplates(result.data);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    })().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div>
      <form name="meme">
        <h1>Wanna try creating a meme 🤔 </h1>
        <label>
          Meme templates: <br />
          <select
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                setImage(
                  `https://api.memegen.link/images/${dropdown}/${toptext}/${bottomtext}.png`,
                );
              }
            }}
            onChange={(event) => {
              setDropdown(event.currentTarget.value);
            }}
          >
            {/* flitering out the template name and id for the memes.id to put the available image-ids into the options of the select input */}
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <br />
        {/* input top text */}
        <label>
          Top text:
          <br />
          <input
            placeholder="type top text here"
            value={toptext}
            onChange={(event) => {
              setToptext(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <br />
        {/* input bottom text */}
        <label>
          Bottom text:
          <br />
          <input
            placeholder="type bottom text here"
            value={bottomtext}
            onChange={(event) => {
              setBottomtext(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <br />
        {/* clear button */}
        <button className="button" onClick="resetForm()">
          Reset
        </button>{' '}
      </form>

      {/* button generates meme onclick
      either with a typed in imagename if there is one
      or with a dropbdown imagename */}

      <button
        className="button"
        onClick={() => {
          setImage(
            `https://api.memegen.link/images/${dropdown}/${toptext}/${bottomtext}.png`,
          );
        }}
      >
        Generate Meme
      </button>

      {/* download button */}

      <button
        className="button"
        onClick={() => {
          console.log(image);
          setImage(image);
          saveFile();
        }}
      >
        {' '}
        Download
      </button>

      <br />
      <br />

      {/* image preview */}

      <img
        data-test-id="meme-image"
        src={`https://api.memegen.link/images/${dropdown ? dropdown : 'aag'}/${
          toptext ? toptext : '_'
        }/${bottomtext ? bottomtext : ''}.png`}
        alt="memeimage"
      />
    </div>
  );
}

export default App;

// import { saveAs } from 'file-saver';
// import { useState } from 'react';

// export default function Memes() {
//   const [meme, setMeme] = useState('https://api.memegen.link/images/aag.png');
//   const [top, setTop] = useState('');
//   const [bottom, setBottom] = useState('');

//   return (
//     <>
//       {meme ? (
//         <img
//           src={`https://api.memegen.link/images/aag/${meme}/${top}/${bottom}.png`}
//           alt="meme"
//           data-test-id="meme-image"
//         />
//       ) : (
//         'Select meme'
//       )}
//       <br />
//       <button
//         onClick={() => {
//           setMeme('what would you like');
//           setTop('');
//           setBottom('');
//         }}
//       >
//         Generate
//       </button>
//       <br />
//       <label>
//         Meme template:
//         <input
//           value={meme}
//           onChange={(event) => {
//             setMeme(event.currentTarget.value);
//           }}
//         />
//       </label>
//       <br />
//       <select>
//         <option>Meme template: </option>
//       </select>
//       {/* <label>
//         <select
//           className="input"
//           value={setMeme}
//           onChange={(event) => {
//             setDrop(event.target.value);
//           }}
//         >
//           <option>Meme Templates</option>
//           {meme.map((template) => (
//             <option key={template.id} value={template.id}>
//               {template.name}
//             </option>
//           ))}
//         </select>
//       </label> */}
//       <br />
//       <label>
//         Enter top text here:
//         <input
//           placeholder="top text"
//           value={top}
//           onChange={(event) => {
//             setTop(event.currentTarget.value);
//           }}
//         />
//       </label>
//       <br />
//       <label>
//         Enter bottom text here:
//         <input
//           placeholder="bottom text"
//           value={bottom}
//           onChange={(event) => {
//             setBottom(event.currentTarget.value);
//           }}
//         />
//       </label>
//       <br />
//       <button
//         onClick={() => {
//           setMeme('');
//           setTop('');
//           setBottom('');
//         }}
//       >
//         Reset
//       </button>
//       <button
//         onClick={() => {
//           saveAs(
//             `https://api.memegen.link/images/${meme}/${top}/${bottom}.png`,
//             'meme.png',
//           );
//         }}
//       >
//         Download
//       </button>
//     </>
//   );
// }

// const MemeGenerator = () => {
//   const [inputText, setInputText] = useState({
//     topText: '',
//     bottomText: '',
//   });
//   const [randomImage, setRandomImage] = useState(
//     'https://api.memegen.link/images/aag.png',
//   );
//   const [allMemeImgs, setAllMemeImgs] = useState([]);

//   const handleChange = (e) => {
//     setInputText({
//       ...inputText,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const randNum = Math.floor(Math.random() * allMemeImgs.length);
//     const randMemeImgUrl = allMemeImgs[randNum].url;
//     setRandomImage(randMemeImgUrl);
//   };

//   useEffect(() => {
//     // console.log('test run');
//     fetch('https://api.memegen.link/templates')
//       .then((response) => response.json())
//       .then((response) => setAllMemeImgs(response.data.memes));
//   }, []);

//   return (
//     <div className="meme-container">
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="topText"
//           placeholder="Top Text"
//           value={inputText.topText}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="bottomText"
//           placeholder="Bottom Text"
//           value={inputText.bottomText}
//           onChange={handleChange}
//         />
//         <button>Download</button>
//       </form>
//       <div className="meme">
//         <img src={randomImage} alt="" />
//         <h2 className="top">{inputText.topText}</h2>
//         <h2 className="bottom">{inputText.bottomText}</h2>
//       </div>
//     </div>
//   );
// };

// export default MemeGenerator;
