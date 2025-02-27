import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [hasNumber, setHasNumber] = useState(false);
  const [hascharacter, setHasCharacter] = useState(false);
  const [Password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const num = "1234567890";
    const speacialChar = "!@#$%^&*?><;:\|";
    
    if(hasNumber) str += num;
    if(hascharacter) str += speacialChar;

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
    
  },[length, hasNumber, hascharacter, setPassword])
 
  useEffect(() => {
    passwordgenerator();
  },[length, hasNumber, hascharacter, passwordgenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 51);
    window.navigator.clipboard.writeText(Password);
    window.alert("Password copied to clipdoard");
  }, [Password])

  return (
      <div className='w-full h-screen bg-slate-900 p-8'>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-slate-50 text-slate-900'>
          <h2 className='text-xl font-bold mx-auto my-4 text-center'>
            Password Generator
          </h2>
          <div className='flex items-center w-full my-6 overflow-hidden rounded-xl border focus-within:ring-1 ring-sky-300'>
            <input type="text" readOnly
              placeholder='Password'
              value={Password}
              ref={passwordRef}
              className='outline-none w-full px-2 py-1'/>
            <button className='bg-sky-300 outline-none px-3 py-2 shrink-0'
             onClick={copyPasswordToClipboard}
            >
              copy
            </button>    
          </div>
          <div className='flex w-full max-w-md text-sm gap-x-6 my-4'>
            <div className='flex items-center gap-x-1'>
              <input 
              type="range"
              id='forlength'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
                />
              <label htmlFor='forlength'>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
            <input
                type="checkbox"
                defaultChecked={hasNumber}
                id="numberInput"
                onChange={() => {
                    setHasNumber((prev) => !prev);
                }}
            />
            <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
                <input
                    type="checkbox"
                    defaultChecked={hascharacter}
                    id="characterInput"
                    onChange={() => {
                        setHasCharacter((prev) => !prev )
                    }}
                />
                <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
  )
}

export default App;




