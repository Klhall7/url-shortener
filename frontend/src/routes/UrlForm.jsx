import { Form, redirect } from 'react-router-dom';

export async function action({ request }) {
    const urlData = await request.formData();
    const title = urlData.get('title');
    const og_url = urlData.get('og_url');
    const short_url = urlData.get('short_url');
    const user_id = urlData.get('user_id');
    const private_toggle = urlData.get('private')
    const data = { title, og_url, short_url, user_id: Number(user_id), private:String(private_toggle)};

    const url = "http://localhost:8000/create/url";
    const addResponse = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json())

    console.log("add url response", addResponse)

    return redirect('/urls')
}

const UrlForm = () => {
    return (
        <Form method="POST">
            <label>Title: 
                <input type="text" 
                name="title" 
                placeholder='give the url a title' 
                required/>
            </label>
            <label>URL: 
                <input type="text" 
                name="og_url" 
                placeholder='enter URL' 
                required/>
            </label>
            <label>Short Version: 
                <input type="text" 
                name="short_url" 
                placeholder='short conversion' 
                required/>
            </label>
            <label>User_id: 
                <input type="number" 
                name="user_id" 
                placeholder='existing user_id number' 
                required/>
            </label>
            <label>Private Setting
                <input type="text" 
                name="private" 
                placeholder='true or false' 
                />
            </label>
            <button type="submit">ADD URL</button>
        </Form>
    )
}

export default UrlForm