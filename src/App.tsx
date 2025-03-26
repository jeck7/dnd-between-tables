import {StrictMode} from 'react';
import './App.css';
import Example from "./Components/Example";

function App() {
    return (
        <div className="App">
            <StrictMode>
                <Example/>
            </StrictMode>,
        </div>
    );
}

export default App;
