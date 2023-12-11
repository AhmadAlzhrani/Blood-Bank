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
        mutationFn: (id, fname, lname, bloodType, email, bd, t) => {
          return fetch('/api/pages', {
            method: 'PUT',
            body: JSON.stringify({
                donor: t,
                ID: id,
                Fname: fname,
                Lname: lname,
                BloodType: bloodType,
                Email: email,
                BD: bd, 
            }),
          })
        },
        onSuccess: async (res) => {
          const handle = res;
        },
      });
    function handleUpdate(event) {
        event.preventDefault();
        
        console.log(event.target.elements);
        const handle = event.target.elements[0].value;
        if(!handle) return;
        updateMutation.mutate(handle);
    }

    // mutation for searching user
    const searchMutation = useMutation({
        mutationFn: (id) => {
          return fetch('/api/pages', {
            method: 'POST',
            body: JSON.stringify({
                ID: id,
            }),
          })
        },
        onSuccess: async (res) => {
          const handle = res;
          setHistory(handle);
        },
      });
    function handleSearch(event) {
        event.preventDefault();
        
        console.log(event.target.elements);
        const handle = event.target.elements[0].value;
        if(!handle) return;
        searchMutation.mutate(handle);
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
                        <div className="radio px-4 py-2 space-x-8">
                            <label><input type="radio" name=" donor" value="true" />Donor</label>
                            <label><input type="radio" name=" recipient" value="false"  />Recipient</label>
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
                    <div className="radio px-4 py-2 space-x-8">
                        <label><input type="radio" name=" donor" value="true" />Donor</label>
                        <label><input type="radio" name=" recipient" value="false"  />Recipient</label>
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
