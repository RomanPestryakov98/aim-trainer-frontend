import Form from '../Form/Form';

function Login({ onLogin, blockOnSubmit, setBlockOnSubmit }) {
	return (
		<Form name='login' onLogin={onLogin} blockOnSubmit={blockOnSubmit} setBlockOnSubmit={setBlockOnSubmit} />
	)
}
export default Login;

