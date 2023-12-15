import { useState } from "react";
import { useMutation } from "react-query"

export default function admin() {

    const [update, setUpdate] = useState(false);
    const [search, setSearch] = useState(false);
    const [history, setHistory] = useState([]);


    const showHideUpdate = () => setUpdate(!update);
    const showHideSearch = () => setSearch(!search);

    // mutation for updating user
    const updateMutation = useMutation({
        mutationFn: (event) => {
          return fetch('/api/manage', {
            method: 'PUT',
            body: JSON.stringify({
                id: event.target.elements[0].value,
                fname: event.target.elements[1].value,
                lname: event.target.elements[2].value,
                blood: event.target.elements[3].value,
                birth: event.target.elements[4].value,
                email: event.target.elements[5].value,
                user: event.target.elements[6].value,
            }),
          })
        },
        onSuccess: async (res) => {
          const handle = res;
        },
      });
    function handleUpdate(event) {
        event.preventDefault();
        
        const fname = event.target.elements[1].value;
        if(!fname) return;
        updateMutation.mutate(event);
    }

    // mutation for searching user
    const addMutation = useMutation({
        mutationFn: (event) => {
          return fetch('/api/searches', {
            method: 'POST',
            body: JSON.stringify({
                id: event.target.elements[0].value,
            }),
          })
        },
        onSuccess: async (res) => {
          const handle = res;
        },
      });
    
    function handleSearch(event) {
        event.preventDefault();
        
        console.log(event.target.elements);
        const id = event.target.elements[0].value;
        if(!id ) return;
        addMutation.mutate(event);
    }

return (
    <>
        <div className="">
            <h1 className=" text-center">User</h1>
            <button className="primary-button" onClick={showHideUpdate}>update</button>
            <button className="primary-button" onClick={showHideSearch}>search history</button>
        </div>
        <div>
            {
            update &&
            <div>
                <h1>update</h1> 
                {updateMutation.isLoading && <p>loading...</p>}
                {! updateMutation.isLoading && <div>
                    <form onSubmit={handleUpdate}>
                    <div className=" px-4 py-2 space-x-8 ">
                        <label htmlFor="id">ID</label>
                        <input type="text" placeholder="1234567890" required/>
                    </div>
                    <div className=" px-4 py-2 space-x-8 ">
                        <label htmlFor="fname">First Name</label>
                        <input type="text" placeholder="ali" required/>
                    </div>
                    <div className=" px-4 py-2 space-x-8 ">
                        <label htmlFor="lname">Last Name</label>
                        <input type="text" placeholder="alzhrani" required/>
                    </div>
                    <div className=" px-4 py-2 space-x-8 ">
                        <label htmlFor="bloodType">Blood Type</label>
                        <input type="text" placeholder="O+" required/>
                    </div>
                    <div className=" px-4 py-2 space-x-8 ">
                        <label htmlFor="bd">Birth Day</label>
                        <input type="text" placeholder="10/11/1999" required/>
                    </div>
                    <div className=" px-4 py-2 space-x-8 ">
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder="alo@alo.alo" required/>
                    </div>
                    <div className=" px-4 py-2 space-x-8 ">
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder="alialzhrani" required/>
                    </div>
                    <div className=" px-4 py-2 space-x-8 ">
                        <button className="primary-button" type="submit">Add User</button>
                    </div>
                    </form>
                </div> }
            </div>
            }
        </div>
        <div>
            {
            search &&
            <div>
                <h1>search</h1>
                {searchMutation.isLoading && <p>loading...</p>}
                {! searchMutation.isLoading && <div>
                    <form onSubmit={handleSearch}>
                    <div className=" px-4 py-2 space-x-8 ">
                        <label htmlFor="id">ID</label>
                        <input type="text" placeholder="1234567890" required/>
                    </div>
                    <div>
                        <button className="primary-button" type="submit">Search User</button>
                    </div>
                    </form>
                </div> }                 
            </div>
            }
        </div>
    </>
);
}
