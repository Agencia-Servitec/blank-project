import {useState} from "react";

export const Home = () => {

    const [count, setCount] = useState(0);

    return <div>
        <h1>Home page</h1>
        <br/>

        <h2>{count}</h2>

        <br/>
        <button onClick={() => setCount(prevState => prevState + 1)}>Sumar</button>
    </div>
}