import React from 'react';
import {Former} from "./react-former/former/Former";
import Field from "./react-former/former/Field";
import FieldArray from "./react-former/former/FieldArray";
import Modal from "./Modal";

function App() {

    const friends = [
        {name:"John", age:20},
        {name:"Jane", age:30},
        {name:"Jack", age:40},
    ]

    const initialData = {
        friends
    }

    return (
        <div className="flex flex-col">
            <Former initialData={initialData} className="bg-gray-100 grid grid-cols-2 gap-10 p-10 m-10  shadow" onSubmit={(data) => console.log(data)}>

                <Field name={"firstName"}  type={"text"} label={"First Name"}/>
                <Field name={"lastName"} type={"text"} label={"Last Name"}/>
                <Field name={"age"} type={"text"} label={"Age"} required/>
                <Field name={"gender"} type={"select"} label={"Gender"} options={[
                    {label:"Male", value:"Male"},
                    {label:"Female", value:"Female"}
                ]} customInitialValue={{label:"Valemale", value:"Valemale"}}/>

                <FieldArray name={"friends"}>
                    <div>
                        <FieldArray.Preview name={"name"}/>
                        <Modal open={true}>
                            <Field name={`name`} type={"text"} label={"Friend Name"}/>
                            <Field name={`age`} type={"text"} label={"Friend Age"}/>
                            <Field name={`deneme`} type={"text"} label={"Friend Deneme"}/>
                        </Modal>
                        <FieldArray.Remove>
                            <button type={"button"}>
                                Remove Friend
                            </button>
                        </FieldArray.Remove>
                    </div>

                    <FieldArray.Add renderInLoop={false}>
                        <button type={"button"}>
                            Add Friend
                        </button>
                    </FieldArray.Add>
                </FieldArray>
                <button type={"submit"} className="bg-black text-white px-8 py-1 mx-auto w-fit rounded-3xl">Submit</button>
            </Former>

        </div>
    );
}

export default App;
