import { useState } from "react";
import { useMutation } from "react-query"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';

export default function admin() {

    const [update, setUpdate] = useState(false);
    const [search, setSearch] = useState(false);
    const [information, setInformation] = useState(false);


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

    const [info, setInfo] = useState({});
    // mutation for searching user
    const searchMutation = useMutation({
        mutationFn: (event) => {
          return fetch('/api/searches', {
            method: 'POST',
            body: JSON.stringify({
                id: event.target.elements[0].value,
            }),
          })
        },
        onSuccess: async (res) => {
          res.json().then(data => setInfo(data));
          setInformation(true)
        },
      });
    
    function handleSearch(event) {
        event.preventDefault();
        
        console.log(event.target.elements);
        const id = event.target.elements[0].value;
        if(!id ) return;
        searchMutation.mutate(event);
    }

return (
    <div className="flex columns-2 w-screen h-screen bg-gradient-to-l from-blue-950 from-10%">
        <div className="flex flex-col bg-transparent shadow-lg rounded-lg ml-2 mt-2 mb-2 w-[30vh]">

            <div className="mx-auto hover:text-red-600 border-2 px-4 py-2 rounded-lg mt-20 mb-8">
                <FontAwesomeIcon icon={faTint} size="2x" />
            </div>
            <button className="primary-button" onClick={showHideUpdate}>update</button>
            <button className="primary-button" onClick={showHideSearch}>search history</button>
            <h1 className=" text-center mt-20">User</h1>
        </div>
        <div className="mx-auto my-auto">
            <div>
                {
                update &&
                <div className="boxx">
                    <h1 className=" text-center mb-8 font-bold">update</h1> 
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
                <div className="boxx">
                    <h1 className=" text-center mb-8 font-bold">search</h1>
                    {searchMutation.isLoading && <p>loading...</p>}
                    {! searchMutation.isLoading && <div>
                        <form onSubmit={handleSearch}>
                        <div className=" px-4 py-2 space-x-8 ">
                            <label htmlFor="id">ID</label>
                            <input type="text" placeholder="1234567890" required/>
                        </div>
                        <div>
                            <button className="primary-button" type="submit" >Search User</button>
                        </div>
                        <div>
                            {information && <div>
                                <p>ID - {info.person_id}</p>
                                <p>First name - {info.first_name}</p>
                                <p>Last name - {info.last_name}</p>
                                <p>Blood type - {info.blood_type}</p>
                                <p>Email - {info.email}</p>
                                <p>Birthday - {info.b_date}</p>
                                <p>Address - {info.address}</p>
                                <p>Username - {info.username}</p>
                                <p>Weight - {info.weight}</p>
                                <p>Major disease - {info.major_disease= false? "yes":"none"}</p>
                                <p>Donor - {info.donor_id}</p>
                            </div>}
                        </div>
                        </form>
                    </div> }                 
                </div>
                }
            </div>
        </div>
    </div>
);
}
