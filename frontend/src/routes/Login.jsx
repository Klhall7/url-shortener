import { Form, redirect } from 'react-router-dom';

export async function action({ request }) {
    const userData = await request.formData();
    const email = userData.get('email');
    const password = userData.get('password');
    const data = { email, password};

    const url = "http://localhost:8000/login";
    const loginResponse = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json())

    console.log("login response", loginResponse) //debug check

    if (loginResponse.detail === "Invalid User Credentials") {
        window.alert(loginResponse.detail);
        return null;
    } else {
        window.alert(loginResponse.detail);
        return redirect("/urls");
    }

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