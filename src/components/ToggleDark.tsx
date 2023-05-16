import { useState } from "react";
import useDarkSide from "../hooks/useDarkSide";



const ToggleDark = () => {

  
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);
  
  const toggleDarkMode = (checked: boolean | ((prevState: boolean) => boolean)) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div className="dark:bg-gray-900 mt-10 flex items-center justify-center transition duration-500">
      <label className="relative w-14 h-8">
        <input type="checkbox" id="toggle" className="opacity-0 w-0 h-0 peer " 
          checked={darkSide} onChange={e => toggleDarkMode(e.target.checked)}
        />
        <span
          className="
            slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 transition duration-500 rounded-full background 
            before:absolute before:content-[''] before:h-6 before:w-6 before:left-1 before:top-1/2 before:transform before:-translate-y-1/2 
            before:bg-gradient-to-r before:from-pink-500 before:to-orange-500 before:transition before:duration-500 before:rounded-full
            peer-checked:before:left-[calc(100%-1.7rem)] peer-checked:before:bg-[#37393f] 
            peer-checked:before:shadow-[inset_-3px_-2px_5px_-2px_#8983f7,inset_-10px_-4px_0_0_#a3dafb]
          peer-checked:bg-[#37393f] peer-checked:before:rounded-full 
          "
        ></span>
      </label>
    </div>
  );
};

export default ToggleDark;
