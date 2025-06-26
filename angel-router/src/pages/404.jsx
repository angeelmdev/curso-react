import { Link } from "../Link";

export default function Page404() {
    return (
        <>
            <div>
                <h1>This is NOT fine</h1>
                <img src='https://media.tenor.com/dCoR0BvpO-IAAAAM/aaaaaa-aaaaaay.gif' alt="404 Not Found" />
            </div>
            <Link to="/">Volver a la Home</Link>
        </>
    );
}