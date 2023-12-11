import { useState } from "react";
import { useMutation } from "react-query"
import BloodRequests from "./requests.js";

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

    const [buttonText, setButtonText] = useState('Initiate'); 
  
    const handleClick = () => { 
        setButtonText(buttonText === 'Initiate' ? 'Stop' : 'Initiate'); 
    }; 

    // mutation for adding user
    const addMutation = useMutation({
        mutationFn: (id, fname, lname, bloodType, email, bd, t) => {
          return fetch('/api/pages', {
            method: 'POST',
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
    
    function handleAdd(event) {
        event.preventDefault();
        
        console.log(event.target.elements);
        const handle = event.target.elements[0].value;
        if(!handle) return;
        addMutation.mutate(handle);
    }

    // mutation for removing user
    const removeMutation = useMutation({
        mutationFn: (id, t) => {
          return fetch('/api/pages', {
            method: 'DELETE',
            body: JSON.stringify({
                donor: t,
                ID: id,
            }),
          })
        },
        onSuccess: async (res) => {
          const handle = res;
        },
      });
    
    function handleRemove(event) {
        event.preventDefault();
        
        console.log(event.target.elements);
        const handle = event.target.elements[0].value;
        if(!handle) return;
        removeMutation.mutate(handle);
    }

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
            method: 'GET',
            body: JSON.stringify({
                ID: id,
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
        const handle = event.target.elements[0].value;
        if(!handle) return;
        searchMutation.mutate(handle);
    }

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
                {addMutation.isLoading && <p>loading...</p>}
                {! addMutation.isLoading && <div>
                    <form onSubmit={handleAdd}>
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
                        <button type="submit">Add User</button>
                    </div>
                    </form>
                </div> }
            </div>
            }
        </div>
        <div>
            {
            remove &&
            <div>
                <h1>remove</h1>
                {removeMutation.isLoading && <p>loading...</p>}
                {! removeMutation.isLoading && <div>
                    <form onSubmit={handleRemove}>
                    <div>
                        <label htmlFor="id">ID</label>
                        <input type="text" placeholder="1234567890" required/>
                        <div className="radio">
                            <label><input type="radio" name="donor" value="true" />Donor</label>
                            <label><input type="radio" name="recipient" value="false"  />Recipient</label>
                        </div>
                    </div>
                    <div>
                        <button type="submit">Remove User</button>
                    </div>
                    </form>
                </div> }
            </div>
            }
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
                        <div className="radio">
                            <label><input type="radio" name="donor" value="true" />Donor</label>
                            <label><input type="radio" name="recipient" value="false"  />Recipient</label>
                        </div>
                    </div>
                    <div>
                        <button type="submit">Search User</button>
                    </div>
                    </form>
                </div> }
            </div>
            }
        </div>
        <div>
            {
            bloodReq &&
            <div>
                <h1>blood req</h1>
                <BloodRequests />

            </div>
            }
        </div>
        <div>
            {
            bloodCollection &&
            <div>
                <h1>blood collection</h1>                   
                <button onClick={handleClick}> 
                    {buttonText} 
                </button>
            </div>
            }
        </div>
    </>
);
}