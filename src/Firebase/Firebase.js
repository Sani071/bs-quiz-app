import app from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCXTAnV28xfBFqn3DNb1CaCyLOz3F2Inc4",
  authDomain: "bs-react-quizz.firebaseapp.com",
  databaseURL: "https://bs-react-quizz.firebaseio.com",
  projectId: "bs-react-quizz",
  storageBucket: "bs-react-quizz.appspot.com",
  messagingSenderId: "558775322414",
  appId: "1:558775322414:web:469400fc5c16c04eed5cbf",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.db = app.database();
  }

  scores = () => this.db.ref("scores");
  quiz = () => this.db.ref("quiz");
}

export default Firebase;
