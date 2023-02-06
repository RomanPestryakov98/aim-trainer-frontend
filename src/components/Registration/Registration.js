import Form from '../Form/Form';

function Registration({ onRegister, blockOnSubmit, setBlockOnSubmit }) {
	return (
		<Form name='register' onRegister={onRegister} blockOnSubmit={blockOnSubmit} setBlockOnSubmit={setBlockOnSubmit} />
	)
}
export default Registration;

