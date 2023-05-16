import { useState } from "react";
import axios from "axios";
import { Dropdown } from "flowbite-react";
import { language_codes } from "./assets/loadOptions";
import ToggleDark from "./components/ToggleDark";

console.log(import.meta.env.VITE_X_RAPIDAPI_KEY)
interface LanguageCodes {
  [language: string]: string;
}

function App() {

  const [text, setText] = useState("");
  const [lang, setLang] = useState("");

  let fileReader: FileReader;

  const getKeyByValue = (object: LanguageCodes, value: string) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const translateText = async (text: string) => {
    console.log("text", text);
    console.log("lang", lang);
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", "en");
    encodedParams.set("target_language", lang);
    encodedParams.set("text", text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": import.meta.env.VITE_X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_X_RAPIDAPI_HOST
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.data.translatedText);
      return response.data.data.translatedText;
    } catch (error) {
      console.error(error);
      return "error";
    }
  };

  const handleFileRead = async () => {
    const content = fileReader.result;
    const translatedText = await translateText(content as string);
    setText(translatedText);
    const fileInput = document.getElementById("file_input") as HTMLInputElement;
    fileInput.value = "";
  };

  const handleChange = () => {
    const fileInput = document.getElementById("file_input") as HTMLInputElement;
    const file = fileInput.files?.[0] as File;
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
    console.log(file);
  };

  return (
    <>
      <div
        className={`flex justify-center items-center flex-col  w-full h-screen`}
      >
        <h1 className=" text-5xl font-bold blue_gradient dark:orange_gradient">
          Text Translator{" "}
        </h1>
        <div className="w-1/3 flex-start">
          <div className="mt-10 w-72">
            <p className=" mb-2 text-sm font-medium text-black dark:text-white">
              Choose the language
            </p>
            <Dropdown
              arrowIcon={true}
              label={
                lang != ""
                  ? getKeyByValue(language_codes, lang)
                  : "Select the language"
              }
              dismissOnClick={true}
              defaultValue={lang}
              className="mt-4"
            >
              {Object.keys(language_codes as LanguageCodes).map(
                (item: string) => (
                  <Dropdown.Item
                    key={language_codes[item]}
                    value={language_codes[item]}
                    onClick={() => setLang(language_codes[item])}
                  >
                    {item}
                  </Dropdown.Item>
                )
              )}
            </Dropdown>
          </div>

          <div>
            <label
              className="mt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              className="
                  disabled:opacity-50 disabled:bg-red-50 disabled:border disabled:border-red-500 
                  disabled:text-red-900 disabled:placeholder-red-700 disabled:text-sm disabled:rounded-lg 
                  disabled:focus:ring-red-500 disabled:dark:bg-gray-700 disabled:focus:border-red-500 
                  disabled:block disabled:w-full  disabled:dark:text-red-500 disabled:dark:placeholder-red-500
                  disabled:dark:border-red-500
                  block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                  bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 
                  dark:border-gray-600 dark:placeholder-gray-400
                "
              id="file_input"
              type="file"
              name="file"
              disabled={lang == ""}
            />
            <p
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              Only TXT Files Allowed.
            </p>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
            onClick={handleChange}
          >
            Translate
          </button>
          {text != "" && (
            <div>
              <h1 className="dark:text-white pt-4 mt-4 pl-4 font-bold text-2xl ">
                Translated text to {getKeyByValue(language_codes, lang)}
              </h1>
              <p className="dark:text-white font-medium text-xl p-4  ">
                {text}
              </p>
            </div>
          )}
        </div>
        <ToggleDark />
      </div>
    </>
  );
}

export default App;
