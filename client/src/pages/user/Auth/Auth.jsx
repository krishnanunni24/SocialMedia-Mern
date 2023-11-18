import React from 'react'
import AuthForm from '../../../components/users/login/AuthForm';
import AuthWrap from "../../../components/users/login/AuthWrap"
import FormHeader from '../../../components/users/login/FormHeader';
import SubmitButton from '../../../components/users/login/SubmitButton';
import LoginWithGoogle from '../../../components/users/googleLogin/LoginWithGoogle';

function Signup() {
    
    
	
	return (
		// <AuthWrapper>
		// 	<AuthForm/>
		// </AuthWrapper>
		<AuthWrap>
			<AuthForm>
				<FormHeader/>
				<LoginWithGoogle/>
				<SubmitButton/>
			</AuthForm>
		</AuthWrap>
	)
}

export default Signup
