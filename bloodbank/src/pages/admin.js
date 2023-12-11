import { useState } from "react";

export default function admin() {

    const [add, setAdd] = useState(false);
    const [remove, setRemove] = useState(false);
    const [update, setUpdate] = useState(false);
    const [search, setSearch] = useState(false);
    const [bloodReq, setBloodReq] = useState(false);
    const [bloodCollection, setBloodCollection] = useState(false);

    const showHideAdd = () => setAdd(!add);
    const showHideRemove = () => setRemove(!remove);
    const showHideUpdate = () => setUpdate(!update);
    const showHideSearch = () => setSearch(!search);
    const showHideBloodReq = () => setBloodReq(!bloodReq);
    const showHideBloodCollection = () => setBloodCollection(!bloodCollection);


return (
    <>
        <div className="grid">
            <h1>Admin</h1>
            <button onClick={showHideAdd}>add</button>
            <button onClick={showHideRemove}>remove</button>
            <button onClick={showHideUpdate}>update</button>
            <button onClick={showHideSearch}>search history</button>
            <button onClick={showHideBloodReq}>blood req</button>
            <button onClick={showHideBloodCollection}>blood collection in given time</button>
        </div>
        <div>
            {
            add &&
            <div>
                <h1>add</h1>                   
                <button>submit</button>
            </div>
            }
        </div>
        <div>
            {
            remove &&
            <div>
                <h1>remove</h1>                   
                <button>submit</button>
            </div>
            }
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
        <div>
            {
            bloodReq &&
            <div>
                <h1>blood req</h1>                   
                <button>submit</button>
            </div>
            }
        </div>
        <div>
            {
            bloodCollection &&
            <div>
                <h1>blood collection</h1>                   
                <button>submit</button>
            </div>
            }
        </div>
    </>
);
}
