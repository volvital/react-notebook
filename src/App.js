import { AlertState } from './context/alert/AlertState';
import { FirebaseState } from './context/firebase/FirebaseState';
import { AuthState } from './context/auth/AuthState';
import { Main } from './components/Main';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
		<AuthState>
			<FirebaseState>
				<AlertState>
					<Main />
				</AlertState>
			</FirebaseState>
		</AuthState>
  );
}

export default App;
