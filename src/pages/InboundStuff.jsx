import React, { useState, useEffect } from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function InboundStuff() {
  const [inbound, setInbounds] = useState([]);
  const navigate = useNavigate();

  

  useEffect(() => {
    getInbounds();
  }, []);

  
    function getInbounds() {
        axios.get("http://localhost:8000/inbound-stuffs/data", {
            headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token"),
            },
        })
        .then((res) => {
            setInbounds(res.data.data);
        })
        .catch((err) => {
            console.log(err);
            if (err.response.status == 401) {
                navigate("/login?message=" + encodeURIComponent("Anda Belum Login!"));
            }
      });
  }

  const headers = [
    "No",
    "Stuff_id",
    "Total",
    "Date",
    "Proff_file",
  ]


  const endpointModal = {
    "restore": "http://localhost:8000/inbound-stuffs/restore/{id}",
    "delete_permanent": "http://localhost:8000/inbound-stuffs/permanent/{id}",
  };


  const title = "Inbound";


  const columnIdentitasDelete = "stuff_id";


  const buttons = [
    "permanentDeletes",
    "addInbound",
];


  const tdColumn = {
    "stuff": "name",
    "total": null,
    "date": null,
    "proff_file": null,
  };


return (
    <Case>
    <Table
        headers={headers}
        data={inbound}
        endpoint={endpointModal}
        titleModal={title}
        identitasColumn={columnIdentitasDelete}
        opsiButton={buttons}
        columnForTd={tdColumn}
    ></Table>
    </Case>
);
}