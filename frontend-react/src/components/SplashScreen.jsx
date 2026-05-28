import "../styles/SplashScreen.css";
import logo from "../assets/logo.png";

function SplashScreen() {

  return (

    <div className="splash-screen">

      <div className="splash-card">

        <div className="splash-logo-wrap">

          <img
            src={logo}
            alt="GreenSpace logo"
            className="splash-logo"
          />

        </div>

        <h1>GreenSpace</h1>

        <p>
          Plant Management System
        </p>

      </div>

      <div className="splash-glow"></div>

    </div>

  );
}

export default SplashScreen;