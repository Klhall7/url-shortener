import { Form } from 'react-router-dom';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const loginData = { email, password};

    try {
        const url = `${import.meta.env.VITE_SOURCE_URL}`;
        const loginResponse = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData)
            });

            console.log("login response", loginResponse) //debug check

            const statusCode = loginResponse.status;
            const data = await loginResponse.json();

            const { access_token } = data;

            localStorage.clear();
            localStorage.setItem('access_token', access_token);
            return statusCode === 200 ? true : false;

    } catch (error) {
        console.error('ERROR:', error)
        return false;
    }

    

    // if (loginResponse.detail === "Invalid User Credentials") {
    //     window.alert(loginResponse.detail);
    //     return null;
    // } else {
    //     window.alert(loginResponse.detail);
    //     return redirect("/urls");
    // }

}


const Login =() => {

    return (
        <>
        <Form method="POST" 
        style={{ display:"flex", 
        flexDirection: 'column', border: 'solid 2px white'}}>Login
            <label>email:
                <input type="text" 
                    name="email" 
                    placeholder='enter your email' 
                    required/>
            </label>
            <label>Password:
                <input type="password" 
                    name="password" 
                    placeholder='enter your password' 
                    required/>
            </label>
            <button type="submit">submit</button>
        </Form>
        </>
    )
}
export default Login 