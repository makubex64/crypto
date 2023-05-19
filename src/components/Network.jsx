import {useState, useEffect} from 'react'
import { useNavigatorStatus } from 'react-navigator-status';


const Alert = ({isOnline})=>{

const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (isOnline && showAlert && isMounted) {
      setShowAlert(true);

      setTimeout(() => {
        if (isMounted) {
          setShowAlert(false);
        }
      }, 4000);
    }

    if (!isOnline && isMounted) {
      setShowAlert(true);
    }

    return () => {
      isMounted = false;
    };
  }, [isOnline]);

  return (
    <>
      {showAlert && (
        <div 
        style={{backgroundColor: isOnline ? "#41D4C0" : "#F39C9C" }} 
        className="network alert alert-info  col-md-3 col-lg-2 col-xl-2 col-xxl-2" 
        >
          {isOnline
            ? <> <span className="me-2">You are online</span> <i class="bi bi-wifi"></i> </>
            : <> <span className= "me-2">You are offline </span> <i class="bi bi-wifi-off"></i> </>
          }
        </div>
      )}
      
    </>
  );

}


const App = () => {
  const isOnline = useNavigatorStatus();
  return <Alert isOnline={isOnline} />;
};

export default App