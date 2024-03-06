import { Form, redirect } from "react-router-dom";

export async function action({ request }) {
  const userData = await request.formData();
  const email = userData.get("email");
  const password = userData.get("password");
  const data = { email, password };

  const url = "http://localhost:8000/register";
  const addResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());

  console.log("register response", addResponse); //debug check

    if (addResponse.status === 200) {
    window.alert('Successfully registered... directing to login');
    return redirect ("/login");
    } else {
    window.alert('Error processing your request');
    return null;
    }
    
}

const Register = () => {
  return (
    <>
      <Form
        method="POST"
        style={{
          display: "flex",
          flexDirection: "column",
          border: "solid 2px white",
        }}
      >
        Create An Account
        <label>
          email:
          <input type="text" name="email" placeholder="enter email" required />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="create a password"
            required
          />
        </label>
        <button type="submit">Register</button>
      </Form>
    </>
  );
};
export default Register;
