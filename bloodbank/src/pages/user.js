import { useState } from "react";

export default function admin() {

    const [update, setUpdate] = useState(false);
    const [search, setSearch] = useState(false);


    const showHideUpdate = () => setUpdate(!update);
    const showHideSearch = () => setSearch(!search);

return (
    <>
        <div className="grid">
            <h1>User</h1>
            <button onClick={showHideUpdate}>update</button>
            <button onClick={showHideSearch}>search history</button>
        </div>
        <div>
            {
            update &&
            <div>
                <h1>update</h1>                   
                <button>submit</button>
            </div>
            }
        </div>
        <div>
            {
            search &&
            <div>
                <h1>search</h1>                   
                <button>submit</button>
            </div>
            }
        </div>
    </>
);
}
