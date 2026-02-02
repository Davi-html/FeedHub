import "../App.css";

export default function Login() {
  return (
    <div className="container">
        <div className="content first-content">
            <div className="first-column">
                <h2 className="title title-primary">welcome back!</h2>
                <p className="description description-primary">To keep connected with us</p>
                <p className="description description-primary">please login with your personal info</p>
                <button id="signin" className="btn btn-primary">sign in</button>
            </div>
            <div className="second-column">
                <h2 className="title title-second">create account</h2>
                <p className="description description-second">or use your email for registration:</p>
                <form className="form" id="signupForm">
                    <label className="label-input" htmlFor="signupName">
                        <i className="far fa-user icon-modify"></i>
                        <input type="text" id="signupName" placeholder="Name" required/>
                    </label>

                    <label className="label-input" htmlFor="signupEmail">
                        <i className="far fa-envelope icon-modify"></i>
                        <input type="email" id="signupEmail" placeholder="Email" required/>
                    </label>

                    <label className="label-input" htmlFor="signupPassword">
                        <i className="fas fa-lock icon-modify"></i>
                        <input type="password" id="signupPassword" placeholder="Password" required/>
                    </label>


                    <button type="submit" className="btn btn-second">sign up</button>
                </form>
            </div>
        </div>
        <div className="content second-content">
            <div className="first-column">
                <h2 className="title title-primary">hello, friend!</h2>
                <p className="description description-primary">Enter your personal details</p>
                <p className="description description-primary">and start journey with us</p>
                <button id="signup" className="btn btn-primary">sign up</button>
            </div>
            <div className="second-column">
                <h2 className="title title-second">sign in to developer</h2>
                <div className="social-media">
                    <ul className="list-social-media">
                        <a className="link-social-media" href="#">
                            <li className="item-social-media">
                                <i className="fab fa-facebook-f"></i>
                            </li>
                        </a>
                        <a className="link-social-media" href="#">
                            <li className="item-social-media">
                                <i className="fab fa-google-plus-g"></i>
                            </li>
                        </a>
                        <a className="link-social-media" href="#">
                            <li className="item-social-media">
                                <i className="fab fa-linkedin-in"></i>
                            </li>
                        </a>
                    </ul>
                </div>
                <p className="description description-second">or use your email account:</p>
                <form className="form" id="loginForm">

                    <label className="label-input" >
                        <i className="far fa-envelope icon-modify"></i>
                        <input type="email" id="loginEmail" placeholder="Email" required/>
                    </label>

                    <label className="label-input">
                        <i className="fas fa-lock icon-modify"></i>
                        <input type="password" id="loginPassword" placeholder="Password" required/>
                    </label>

                    <a className="password" href="#">forgot your password?</a>
                    <button type="submit" className="btn btn-second">sign in</button>
                </form>
            </div>
        </div>
    </div>
  );
}