// delete this when no longer needed for testing

import { useLoaderData } from "react-router-dom";

export async function loader() {
    const usersUrl = 'http://localhost:8000/users';
    const data = await fetch(usersUrl).then((response) => response.json());

    return { data };
}

const DisplayUsers =() => {
    const { data } = useLoaderData()
    return (
        <>
        <h3>existing users- FOR TEST ONLY</h3>
        <ul>
                {data.map((users, index) => {
                    return (
                        <li key={index}>
                            {users.id} - {users.email}
                        </li>
                    );
                })}
            </ul>
        </>
    )
}

export default DisplayUsers