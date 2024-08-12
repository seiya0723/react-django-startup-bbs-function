import React, { useState, useEffect } from "react";

const Modal = ( { handleSubmit, activeTopic, closeModal } ) => {

    const [topic, setTopic] = useState(activeTopic);

    useEffect(() => {
        setTopic(activeTopic);
    }, [activeTopic]);

    const handleChange    = (e) => {
        let { name , value }    = e.target;
        setTopic({ ...topic, [name]: value });
    }

    return ( 
        <>
            <div className="modal_area" >
                <div className="modal_bg_area" onClick={closeModal}></div>
                <div className="modal_content_area">
                    <form>
                        
                        { activeTopic.id ? ( <h2>編集</h2> ) : ( <h2>新規作成</h2> ) }
                        <textarea className="form-control" name="comment" onChange={handleChange} value={topic.comment}></textarea>
                        <input className="btn btn-success" type="button" onClick={ () => handleSubmit(topic) } value="保存" />
                    </form>
                </div>
            </div>
        </>
    );

}
export default Modal;



