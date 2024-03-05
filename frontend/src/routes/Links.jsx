import { useLoaderData } from "react-router-dom";

export async function loader() {
    const url = 'http://localhost:8000/url';
    const data = await fetch(url).then((response) => response.json());

    return { data };
}

const Links = () => {
    const { data } = useLoaderData();

    return (
        <>
        <h2>URL List</h2>
        <ul>
                {data.map((url, index) => {
                    return (
                        <li key={index}>
                            {url.title} - {url.short_url}
                        </li>
                    );
                })}
            </ul>
        </>
    )
};


export default Links