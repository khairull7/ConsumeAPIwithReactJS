import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Table from '../components/Table';
import Case from '../components/Case';

export default function Lending() {

    const [lending, setLending] = useState([]);


    const navigate = useNavigate();
  
    useEffect(() => {
      getLending();
    }, []);

    function getLending() {
        axios.get("http://localhost:8000/lending/data", {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
            },
          })
          .then((res) => {
            setLending(res.data.data);
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status == 401) {
              navigate("/login?message=" + encodeURIComponent("Anda Belum Login!"));
            }
          });
      }  
    
    const headers = [
    "no" , 
    "name", 
    "user_id", 
    "stuff_id" , 
    "date_time" , 
    "total_stuff",
    "notes"
  ]


    const endpointModal = {
      "data_detail": "http://localhost:8000/lending/{id}",
      "delete": "http://localhost:8000/lending/delete/{id}",
      "update": "http://localhost:8000/lending/update/{id}",
      "store": "http://localhost:8000/lending/store",
    }
    
      const inputData = {
        "name": {
          tage: "input",
          type: "text",
          option: "null",
        },
       
        "stuff_id": {
          tage: "input",
          type: "number",
          option: "null",
        },

        "user_id": {
          tage: "input",
          type: "number",
          option: "null",
        },

        "date_time": {
          tage: "input",
          type: "datetime-local",
          option: "null",
        },

        "total_stuff": {
          tage: "input",
          type: "number",
          option: "null",
        },

        "notes": {
          tage: "input",
          type: "text",
          option: "null",
        },
      };
    
      const title = "Lending";
    
      const columnIdentitasDelete = "name";
    

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete",
        "restoration",
      ]
    
      const tdColumn = {
        "name": null,
        "user": "username",
        "stuff": "name",
        "date_time" : null,
        "total_stuff" : null,
        "notes" : null,
      }

      
    

  return (
   
    <Case>
         <div className="mt-20">
                <h1 className="mr-2 text-sm font-semibold uppercase text-center text-white">Data Lending</h1>
            </div>
        <Table headers={headers} data={lending} endpoint={endpointModal} titleModal={title} opsiButton={buttons} columnForTd={tdColumn} identitasColumn={columnIdentitasDelete} inputData={inputData} >
        </Table>
    </Case>

  )
}