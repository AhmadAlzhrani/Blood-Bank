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
        mutationFn: (event) => {
          return fetch('/api/manage', {
            method: 'POST',
            body: JSON.stringify({
                id: event.target.elements[0].value,
                fname: event.target.elements[1].value,
                lname: event.target.elements[2].value,
                blood: event.target.elements[3].value,
                birth: event.target.elements[4].value,
                email: event.target.elements[5].value,
                user: event.target.elements[6].value,
                donor: event.target.elements[7].value,
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
        const id = event.target.elements[0].value;
        if(!id ) return;
        addMutation.mutate(event);
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
        <div className="">
            <h1 className=" text-center">Admin</h1>
            <button className="primary-button" onClick={showHideAdd}>add</button>
            <button className="primary-button" onClick={showHideRemove}>remove</button>
            <button className="primary-button" onClick={showHideUpdate}>update</button>
            <button className="primary-button" onClick={showHideSearch}>search history</button>
            <button className="primary-button" onClick={showHideBloodReq}>blood req</button>
            <button className="primary-button" onClick={showHideBloodCollection}>blood collection in given time</button>
        </div>
        <div className="">
            {
            add &&
            <div className="">
                <h1>add</h1>                  
                {addMutation.isLoading && <p>loading...</p>}
                {! addMutation.isLoading && <div>
                    <form onSubmit={handleAdd}>
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
            remove &&
            <div>
                <h1>remove</h1>
                {removeMutation.isLoading && <p>loading...</p>}
                {! removeMutation.isLoading && <div>
                    <form onSubmit={handleRemove}>
                    <div className=" px-4 py-2 space-x-8 ">
                        <label htmlFor="id">ID</label>
                        <input type="text" placeholder="1234567890" required/>
                    </div>
                    <div className="radio px-4 py-2 space-x-8">
                        <label><input type="radio" name=" donor" value="true" />Donor</label>
                        <label><input type="radio" name=" recipient" value="false"  />Recipient</label>
                    </div>
                    <div>
                        <button className="primary-button" type="submit">Remove User</button>
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
                <button className="primary-button" onClick={handleClick}> 
                    {buttonText} 
                </button>
            </div>
            }
        </div>
    </>
);
}