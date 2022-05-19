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
            {/* flitering out the template name and id for the memes. */}
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
        {/* reset button */}
        <button className="button" onClick="resetForm()">
          Reset
        </button>{' '}
      </form>

      {/* generate button */}

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
