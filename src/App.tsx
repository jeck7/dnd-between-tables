import {StrictMode} from 'react';
import './App.css';
import DragAndDropTables from "./Components/DragAndDropTables";

function App() {
    return (
        <div className="App">
            <StrictMode>
                <DragAndDropTables/>
            </StrictMode>,
        </div>
    );
}

export default App;
