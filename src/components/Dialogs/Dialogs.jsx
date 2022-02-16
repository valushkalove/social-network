import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from 'react'
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utilits/validators/validators";
import {Textarea} from "../common/FormControls/FormControls";


const Dialogs = (props) => {
    let dialogsElements = props.dialogs.map(dialog => <DialogItem link={dialog.link}
                                                                  name={dialog.name}
                                                                  key={dialog.id} id={dialog.id}/>)
    let messagesElements = props.messages.map(message => <Message message={message.message}
                                                                  key={message.id}/>)

    let addMessage = (values) => {
        props.addMessage(values.newMessageText)
    }
    return (

        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                Dialogs
                {dialogsElements}
            </div>
            <div className={style.messagesItems}>
                Messages
                {messagesElements}
                <AddMessageReduxForm onSubmit={addMessage} />
            </div>
        </div>
    )
}
const maxLength50 = maxLengthCreator(50)
const AddMessageForm = (props) => {

    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field validate={[required, maxLength50]}
                component={Textarea} name={'newMessageText'} placeholder='enter yor message'/>
            <button>send</button>
        </div>
    </form>
}

const AddMessageReduxForm = reduxForm({
    form: 'addMessage'
})(AddMessageForm)
export default Dialogs