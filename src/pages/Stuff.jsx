import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Stuff() {
    const [stuffs, setStuffs] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getStuffs()
    }, []);

    function getStuffs() {
        axios.get('http://localhost:8000/stuffs/data', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setStuffs(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        })
    }

    const headers = [
        "No",
        "Name",
        "Category",
        "Total Available",
        "Total Defec"
    ]

    const endpointModal = {
        "data_detail": "http://localhost:8000/stuffs/{id}",
        "delete": "http://localhost:8000/stuffs/delete/{id}",
        "update": "http://localhost:8000/stuffs/update/{id}",
        "store": "http://localhost:8000/stuffs/store",
    }
    

    const inputData = {
        "name" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "category" : {
            "tag": "select",
            "type": "select",
            "option": ["KLN", "HTL", "Teknisi/Sarpras"]
        },
    }

    const title = 'stuff';

    const columnIdentitasDelete = "name";

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete"
    ]

    const tdColumn = {
        "name": null,
        "category": null,
        "stuff_stock": "total_available",
        "stuff_stock*": "total_defec"
    }

    return (

        

        <Case>
            <div className="mt-20">
                <h1 className="mr-2 text-sm font-semibold uppercase text-center text-white">Data Stuff</h1>
            </div>
            <Table
                headers={headers}
                data={stuffs}
                endpoint={endpointModal}
                inputData={inputData}
                titleModal={title}
                identitasColumn={columnIdentitasDelete}
                opsiButton={buttons}
                columnForTd={tdColumn}
            ></Table>
        </Case>
    );

    
   
}