import { useState } from 'react';
import './App.css';
import Increment from './Increment';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [inputValue, setInputValue] = useState('')

  const handleClick = () =>{
console.log(inputValue)
setInputValue('')
  }

  const handleChange = (e) =>{
    setInputValue(e.target.value)
  }
  return (
    <>
    
    <input type="text" onChange={handleChange} value={inputValue} />
    <button className='btn btn-warning' onClick={handleClick}>Click Me</button>
    <br />
    <Increment/>
    </>
  )
}
export default App;
