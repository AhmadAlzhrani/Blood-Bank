import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function guest() {

    const [about, setAbout] = useState(false);
    const showHideAbout = () => setAbout(!about);
    const r = useRouter();
    const goLogin = () => r.push('/');

    return (
        <div className="flex columns-2 w-screen h-screen bg-gradient-to-l from-blue-950 from-10%">
        <div className="flex flex-col bg-transparent shadow-lg rounded-lg ml-2 mt-2 mb-2 w-[30vh]">

            <div className="mx-auto hover:text-red-600 border-2 px-4 py-2 rounded-lg mt-20 mb-8">
                <FontAwesomeIcon icon={faTint} size="2x" />
            </div>
            <button className="primary-button" onClick={showHideAbout} >about us</button>
            <button className="primary-button" onClick={goLogin} >login</button>
            <h1 className=" text-center mt-20">User</h1>
        </div>
        <div className="mx-auto my-auto">
            <div>
                {
                about &&
                <div className="boxx">
                    <h1 className=" text-center mb-8 font-bold">About the Website</h1>
                    <p className="text-center mb-8">This is a blood bank website. 
                    It is a project for the course ICS 321: Database Systems.
                    worked on it:
                    </p>
                    <ui className="text-left">
                        <li>Ahmad Alzhrani</li>
                        <li>Ali Alsaihati</li>
                        <li>Abdullah Alfateel</li>
                    </ui>
                </div> 
                }
            </div>
        </div>
    </div>
    )
}