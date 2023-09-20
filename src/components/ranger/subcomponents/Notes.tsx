import React from "react";
import {Simulate} from "react-dom/test-utils";
import AddNotes from "../../notes/AddNotes";
import RetrieveNotes from "../../notes/RetrieveNotes";

export default function Notes() {
    return (
        <div className="d-flex flex-row gap-1 position-absolute m-2 end-0">
            <AddNotes/>
            <RetrieveNotes/>
        </div>
    )
}