import React, { useState, useEffect } from "react";

import Modal from "./components/Modal";
import axios from "axios";

const App = () => {
    const [topicList, setTopicList] = useState([]);
    const [modal, setModal] = useState(false);
    const [activeTopic, setActiveTopic] = useState({ comment: "" });

    // コンポーネントがレンダリングされるときに実行する
    useEffect(() => {
        refreshList();
    }, []);
    
    // ページロード
    const refreshList = () => {
        axios
            .get("/api/topics/")
            .then((res) => setTopicList(res.data))
            .catch((err) => console.log(err));
    };

    const handleSubmit = (topic) => {
        if (topic.id) {
            axios
                .put(`/api/topics/${topic.id}/`, topic)
                .then(() => refreshList())
                .catch((err) => console.log(err));
        } else {
            axios
                .post("/api/topics/", topic)
                .then(() => refreshList())
                .catch((err) => console.log(err));
        }
        closeModal();
    };

    const handleDelete = (topic) => {
        axios
            .delete(`/api/topics/${topic.id}/`)
            .then(() => refreshList());
    };

    const openModal = (topic) => {
        if (topic.id) {
            setActiveTopic(topic);
        } else {
            setActiveTopic({ comment: "" });
        }
        setModal(true);
    };

    const closeModal = () => {
        setActiveTopic({ comment: "" });
        setModal(false);
    };


    // \n を <br> にする 
    const linebreaksbr = (string) => {
        return string.split('\n').map((topic, index) => (
            <React.Fragment key={index}>
                {topic}
                {index !== string.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    const renderItems = () => {
        return topicList.map((topic) => (
            <div className="border" key={topic.id}>
                <div>{topic.id}</div>
                <div>{linebreaksbr(topic.comment)}</div>
                <div className="text-end">
                    <input type="button" className="mx-1 btn btn-success" value="編集" onClick={() => openModal(topic)} />
                    <input type="button" className="mx-1 btn btn-danger" value="削除" onClick={() => handleDelete(topic)} />
                </div>
            </div>
        ));
    };

    return (
        <>
            <h1 className="bg-primary text-white text-center">簡易掲示板</h1>
            <main className="container">
                <input className="btn btn-primary" type="button" onClick={() => openModal(activeTopic)} value="新規作成" />
                {modal ? (
                    <Modal 
                        activeTopic={activeTopic}
                        handleSubmit={handleSubmit}
                        closeModal={closeModal} 
                    />
                ) : null}
                {renderItems()}
            </main>
        </>
    );
};

export default App;



