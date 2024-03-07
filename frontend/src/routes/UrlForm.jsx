import { Form, redirect } from "react-router-dom";
import { useState } from "react";

export async function action({ request }) {
    const urlData = await request.formData();
    const title = urlData.get("title");
    const og_url = urlData.get("og_url");
    const short_url = urlData.get("short_url");
    const user_id = urlData.get("user_id");
    const private_toggle = urlData.get("private");
    const data = {
        title,
        og_url,
        short_url,
        user_id: Number(user_id),
        private: Boolean(private_toggle),
    };

    const url = "http://localhost:8000/url/create";
    const addResponse = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());

    console.log("add url response", addResponse);

    return redirect("/url")
    
    
}

const UrlForm = () => {
    const [isChecked, setIsChecked] = useState(false) 

    const handleChange = (e) => {
        setIsChecked(e.target.checked)
    }

    return (
        <Form
            method="POST"
            style={{
                display: "flex",
                flexDirection: "column",
                border: "solid 2px white",
            }}
        >
            New URL
            <label>
                Nickname:
                <input
                    type="text"
                    name="title"
                    placeholder="reference title"
                    required
                />
            </label>
            <label>
                URL:
                <input
                    type="text"
                    name="og_url"
                    placeholder="enter URL"
                    required
                />
            </label>
            <label>
                {/* input will eventually be auto generated */}
                Short Version:
                <input
                    type="text"
                    name="short_url"
                    placeholder="short conversion"
                    required
                />
            </label>
            <label>
                {/* will eventually be assoc with login instead of being hard coded*/}
                <input type="hidden" name="user_id" value="1" required />
            </label>
            <label>
                Private:
                <input type="checkbox" 
                checked = {isChecked}
                onChange={handleChange}
                name="private" 
                />
            </label>
            {isChecked.toString()}
            <button type="submit">SUBMIT</button>
        </Form>
    );
};

export default UrlForm;
