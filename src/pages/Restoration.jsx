import React, { useEffect, useState} from 'react';
import Case from '../components/Case';
import Table  from '../components/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Restoration() {
    const [restorations, setRestorations] = useState([]);

    const navigate = useNavigate();

    // useEffect(() => {
    //     getRestorations();
    // }, []);

    // function getRestorations(){
    //     axios.get('http://localhost:8000/restoration/data', {
    //         headers: {
    //             'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    //         }
    //     })
    //     .then(res => {
    //         setRestorations(res.data.data);
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         if (err.response.status === 401) {
    //             navigate('/login?message=' + encodeURIComponent('Anda belum login'));
    //         }
    //     })
    // }

    const endpointModal = {
        "storesto": "http://localhost:8000/restoration/store",
    };

    // const inputRestoration = {
    //     "user_id" : {
    //         "tag": "input",
    //         "type": "text",
    //         "option": null
    //     },
    //     "lending_id" : {
    //         "tag": "input",
    //         "type": "text",
    //         "option": null
    //     },
    //     "total_good_stuff" : {
    //         "tag": "input",
    //         "type": "text",
    //         "option": null
    //     },
    //     "total_defec_stuff" : {
    //         "tag": "input",
    //         "type": "text",
    //         "option": null
    //     },
    //     "date_time" : {
    //         "tag": "input",
    //         "type": "datetime-local",
    //         "option": null
    //     },
    // };

    const titleModal = 'Restoration';

    const tdColumn = {
        "user_id": null,
        "lending_id": null,
        "total_good_stuff": null,
        "total_defec_stuff": null,
        "date_time":null

    }

    return (
        <Case>
        <Table
            // headers={headers}
            // data={restorations}
            endpoint={endpointModal}
            // identitasColumn={columnIdentitasDelete}
            // inputData={inputData}
            titleModal={titleModal}
            // opsiButton={buttons}
            columnForTd={tdColumn}
        />
    </Case>
    )
}