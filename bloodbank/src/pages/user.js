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
                {updateMutation.isLoading && <p>loading...</p>}
                {! updateMutation.isLoading && <div>
                    <form onSubmit={handleUpdate}>
                    <div>
                        <label htmlFor="id">ID</label>
                        <input type="text" placeholder="1234567890" required/>

                        <label htmlFor="fname">First Name</label>
                        <input type="text" placeholder="ali" required/>

                        <label htmlFor="lname">Last Name</label>
                        <input type="text" placeholder="alzhrani" required/>

                        <label htmlFor="bloodType">Blood Type</label>
                        <input type="text" placeholder="O+" required/>

                        <label htmlFor="bd">Birth Day</label>
                        <input type="text" placeholder="10/11/1999" required/>

                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder="alo@alo.alo" required/>

                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder="alialzhrani" required/>

                        <div className="radio">
                            <label><input type="radio" name="donor" value="true" />Donor</label>
                            <label><input type="radio" name="recipient" value="false"  />Recipient</label>
                        </div>
                    </div>
                    <div>
                        <button type="submit">Update User</button>
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
                    <div>
                        <label htmlFor="id">ID</label>
                        <input type="text" placeholder="1234567890" required/>
                        <li>{history}</li>
                    </div>
                    <div>
                        <button type="submit">Search User</button>
                    </div>
                    </form>
                </div> }                 
            </div>
            }
        </div>
    </>
);
}
