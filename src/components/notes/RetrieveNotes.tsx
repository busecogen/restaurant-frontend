import Dropdown from "react-bootstrap/Dropdown";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import React from "react";
import {useApi} from "@technarts/react-use-api";
import {guard} from "../../utils/AuthUtils";
import {RangerContext} from "../../App";
import retrievenotes from "../../img/retrievenotes.svg";

type NoteProps = {
    title: string,
    explanation: string
}
export default function RetrieveNotes() {
    const apiPoster = useApi<NoteProps[]>({url: `http://127.0.0.1:8000/`, method: 'POST', responseGuard: guard});

    const [notes, setNotes] = React.useState<NoteProps[]>([]);
    const [selectedNotes, setSelectedNotes] = React.useState<string[]>([]);

    const {currentCase, isNotesUpdated, setIsNotesUpdated} = React.useContext(RangerContext);
    const handleDeleteButton = () => {
        if (selectedNotes.length > 0) {
            apiPoster.call(
                {
                    url: `http://127.0.0.1:8000/note/delete/`,
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('access')}`,
                        "Content-Type": "application/json",
                    },
                    payload: {case: currentCase, notes: selectedNotes},
                });
            setIsNotesUpdated(true);
            alert("Notes deleted!");
        }
    }


    React.useEffect(() => {
        if (isNotesUpdated) {
            apiPoster.call(
                {
                    url: `http://127.0.0.1:8000/note/list/`,
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('access')}`,
                        "Content-Type": "application/json",
                    },
                    payload: {case: currentCase},
                });
            setIsNotesUpdated(false);
        }
    }, [isNotesUpdated])


    React.useEffect(() => {
        if (apiPoster.RESP)
            setNotes(apiPoster.RESP)
    }, [apiPoster.RESP])

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedNotes(prevSelectedNotes => {
            if (prevSelectedNotes.includes(value)) {
                return prevSelectedNotes.filter(note => note !== value);
            } else {
                return [...prevSelectedNotes, value];
            }
        });
    };


    return (
        <Dropdown id="notes-dropdown">
            <DropdownToggle variant="" id="notes-dropdown-button">
                <img alt="add" src={retrievenotes} id="note-icon"/>
            </DropdownToggle>
            {notes.length > 0 ?
                <Dropdown.Menu className="p-2" style={{width: "30vw"}}>
                    <div className="p-2">
                        {notes.map(note => (
                            <div className="d-flex" key={note.title}>
                                <div className="border-end border-bottom">
                                    <input
                                        type="checkbox"
                                        value={note.title}
                                        className="m-2"
                                        onChange={handleCheckboxChange}
                                    />
                                </div>
                                <div className="d-flex flex-column border-bottom w-100">
                                    <label className="ps-2" id="note-check-title">{note.title}</label>
                                    <label className="ps-2 ">{note.explanation}</label>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="float-end">
                        <button className="btn btn-danger" onClick={handleDeleteButton}>
                            Delete
                        </button>
                    </div>
                </Dropdown.Menu>
                :
                <Dropdown.Menu className="p-2" style={{width: "15vw"}}>
                    <div className="text-center">
                        <p>No notes created yet!</p>
                    </div>
                </Dropdown.Menu>
            }

        </Dropdown>
    )
}