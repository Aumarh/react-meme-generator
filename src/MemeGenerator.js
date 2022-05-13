// importing the library
import { saveAs } from 'file-saver';
import { useState } from 'react';

export default function Memes() {
  const [meme, setMeme] = useState('https://api.memegen.link/images/aag.png');
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');

  return (
    <>
      {meme ? (
        <img
          src={`https://api.memegen.link/images/aag/${meme}/${top}/${bottom}.png`}
          alt="meme"
          data-test-id="meme-image"
        />
      ) : (
        'Select meme'
      )}
      <br />
      <button
        onClick={() => {
          setMeme('what would you like');
          setTop('');
          setBottom('');
        }}
      >
        Generate
      </button>
      <br />
      <label>
        Meme template:
        <input
          value={meme}
          onChange={(event) => {
            setMeme(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <select>
        <option>Meme template: </option>
      </select>
      {/* <label>
        <select
          className="input"
          value={setMeme}
          onChange={(event) => {
            setDrop(event.target.value);
          }}
        >
          <option>Meme Templates</option>
          {meme.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </label> */}
      <br />
      <label>
        Enter top text here:
        <input
          placeholder="top text"
          value={top}
          onChange={(event) => {
            setTop(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <label>
        Enter bottom text here:
        <input
          placeholder="bottom text"
          value={bottom}
          onChange={(event) => {
            setBottom(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <button
        onClick={() => {
          setMeme('');
          setTop('');
          setBottom('');
        }}
      >
        Reset
      </button>
      <button
        onClick={() => {
          saveAs(
            `https://api.memegen.link/images/${meme}/${top}/${bottom}.png`,
            'meme.png',
          );
        }}
      >
        Download
      </button>
    </>
  );
}

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
