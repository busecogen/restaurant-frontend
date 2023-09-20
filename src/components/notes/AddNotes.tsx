import DropdownToggle from "react-bootstrap/DropdownToggle";
import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import {CallParams, useApi} from "@technarts/react-use-api";
import {RangerContext} from "../../App";
import addnotes from "../../img/addnotes.svg"

export default function AddNotes() {
    const {currentCase, setIsNotesUpdated} = React.useContext(RangerContext);

    function noteCreateGuard(r: Response, params: CallParams): Promise<Response> {
        const noteTitle = document.getElementById('note-title') as HTMLInputElement;
        if (noteTitle) noteTitle.value = '';
        const noteExplanation = document.getElementById('note-explanation') as HTMLInputElement;
        if (noteExplanation) noteExplanation.value = '';
        if (r.status === 201) {
            setIsNotesUpdated(true);
            alert('Note created successfully!')
        } else if (r.status === 400) {
            alert('Cannot create a note with the same title!')
        } else if (r.status === 401) {
            window.location.href = "/refresh";
        }
        return Promise.resolve(r);
    }

    const [title, setTitle] = React.useState("");
    const [explanation, setExplanation] = React.useState("");
    const apiPoster = useApi({url: "http://localhost:8000/", method: "POST", responseGuard: noteCreateGuard});


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const submitTitle = title;
        const submitExplanation = explanation;

        apiPoster.call({
            url: "http://localhost:8000/note/create/",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access')}`,
                "Content-Type": "application/json",
            },
            payload: {title: submitTitle, explanation: submitExplanation, case: currentCase},
        });

    }

    return (
        <Dropdown>
            <DropdownToggle variant="">
                <img alt="add" src={addnotes} id="note-icon"/>
            </DropdownToggle>
            <Dropdown.Menu>
                <div className="p-4">
                    <div className="Auth-form-container" style={{width: "30vw"}}>
                        <form className="Auth-form" onSubmit={handleSubmit}>
                            <div className="Auth-form-content mx-auto ">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        id="note-title"
                                        name="title"
                                        type="text"
                                        className="form-control mt-1"
                                        placeholder="Enter Title"
                                        required
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-3 ">
                                    <label>Explanation</label>
                                    <input
                                        id="note-explanation"
                                        name="explanation"
                                        type="text"
                                        className="form-control mt-1 pt-4 pe-4 pb-4"
                                        placeholder="Enter Explanation"
                                        required
                                        onChange={(e) => setExplanation(e.target.value)}
                                    />
                                </div>
                                <div className="d-grid gap-2 mt-3" id="add-note-button">
                                    <button type="submit" className="btn " id="classic-button">
                                        Add
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )
}