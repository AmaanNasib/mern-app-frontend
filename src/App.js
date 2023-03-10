  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Task from './components/Task';
  import './index.css'


  export const URL = process.env.REQUEST_URL;
 
function App() {
  return (
    <div className="app">
      <div className="task_main">
        <Task />
      </div>
        <ToastContainer />
    </div>
  );
}

export default App;
