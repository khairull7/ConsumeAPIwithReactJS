import React, { useState } from "react";
import axios from "axios";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";
import { Link, useNavigate } from "react-router-dom";

export default function Table({ headers, data, endpoint, inputData, titleModal, identitasColumn, opsiButton,columnForTd }) {
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [endpointToSend, setEndpointToSend] = useState({});
    const [modalTitle, setModalTitle] = useState("");
    const navigate = useNavigate();
    
    function handleModalAdd() {
        const endpointReplaced = {
            "store": endpoint['store'],
        };
        setEndpointToSend(endpointReplaced);
        setModalTitle("Create User");  
        setIsModalAddOpen(true);
    }

    function handleModalEdit(id) {
        const endpointEdit = endpoint['update'];
        const endpointDetail = endpoint['data_detail'];
        const replaceUrlEdit = endpointEdit.replace("{id}", id);
        const replaceUrlDetail = endpointDetail.replace("{id}", id);
        const endpointReplaced = {
            "data_detail": replaceUrlDetail,
            "update": replaceUrlEdit,
        };
    
        setEndpointToSend(endpointReplaced);
        setModalTitle("User"); 
        setIsModalEditOpen(true);
    }
    

    function handleModalDelete(id) {
        const endpointDelete = endpoint['delete'];
        const endpointDetail = endpoint['data_detail'];
        const replaceUrlDelete = endpointDelete.replace("{id}", id);
        const replaceUrlDetail = endpointDetail.replace("{id}", id);
        const endpointReplaced = {
            "data_detail": replaceUrlDetail,
            "delete": replaceUrlDelete,
        };
        setEndpointToSend(endpointReplaced);
        setIsModalDeleteOpen(true);
    }

    function handleRestore(id) {
        const endpointRestore = endpoint['restore'].replace("{id}", id);
        axios.get(endpointRestore, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                window.location.reload();
        })
            .catch(err => {
                console.log(err);
                if (err.response.data == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'));                }
        })
    }
    function handlePermanentDelete(id) {
        const endpointPermanentDelete = endpoint['delete_permanent'].replace("{id}", id);
        axios.delete(endpointPermanentDelete, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err) 
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'))
            }
        })
    }
    

    return (
        <>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10">
            <div className="flex justify-end">
                {
                    opsiButton.includes("create") ? (
                        <button type="button" onClick={handleModalAdd} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5">Create</button>
                    ) : ''
                }
                {
                    opsiButton.includes("trash") && location.pathname.includes('/stuffs') && (
                        <Link to={'/stuffs/trash'} className="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 mb-5" >Trash</Link>
                    )
                } 
                {
                    opsiButton.includes("trash") && location.pathname.includes('/user') && (
                        <Link to={'/user/trash'} className="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 mb-5" >Trash</Link>
                    )
                }
                {
                    opsiButton.includes("trash") && location.pathname.includes('/lending') && (
                        <Link to={'/lending/trash'} className="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 mb-5">Trash</Link>
                    )
                }
                {opsiButton.includes("restoration") && location.pathname.includes('/lending') && (
                    <Link to={'/restoration/data'} className="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 mb-5">Restoration</Link>
                    )
                }
                {opsiButton.includes("addInbound") && location.pathname.includes('/inbound-stuffs') && (
                    <Link to={'/inbound-stuffs/store'} className="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5">Add Inbound</Link>
                    )
                }
                
                </div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {headers.map((header, index) => (
                                <th scope="col" class="px-6 py-3" key={index}>{header}</th>
                            ))}
                            <th scope="col" class="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                Object.entries(data).map(([index, item]) => (
                    <>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{ parseInt(index) + 1}.</td>
                            {
                                Object.entries(columnForTd).map(([key, value]) => (
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                        
                                        {
                                            key == 'proff_file' ? 
                                            <img src={`http://localhost:8000/proof/`+item[key.replace(/[!&*;:]/g, '')]} width={50} height={90} /> : (
                                                !value ? item[key] : item[key.replace(/[!&;:]/g, '')] ? item[key.replace(/[!&;:]/g, '')][value] : '0'
                                            )
                                        }                                    </td>
                                ))

                            }
                             
                            <td class="px-6 py-4 text-right">
                                        {
                                            opsiButton.includes("edit") ? (
                                                <button type="button" onClick={() => handleModalEdit(item.id)} class="py-1 px-4 ms-2 text-sm font-medium text-black focus:outline-none bg-blue-500 rounded-md hover:bg-blue-300 transition delay-200 duration-200 ease-in-out hover:text-black hover:border-black focus:z-10 focus:ring-4 focus: ring-blue-100 dark:focus:ring-blue-700 dark:bg-blue-800 dark:text-blue-400 dark:border-blue-600 dark:hover:text-white
                                                dark:hover:bg-blue-700">Edit</button>
                                            ) : ''
                                        }
                                        {
                                            opsiButton.includes("delete") ? (
                                                <button type="button" onClick={() => handleModalDelete(item.id)} class="py-1 px-2 ms-2 text-sm font-medium text-black focus:outline-none bg-red-500 rounded-md hover:bg-red-300 transition delay-200 duration-200 ease-in-out hover:text-black hover:border-black focus:z-10 focus:ring-4 focus: ring-red-100 dark:focus:ring-red-700 dark:bg-red-800 dark:text-red-400 dark:border-red-600 dark:hover:text-white
                                                dark:hover:bg-red-700">Delete</button>
                                            ) : ''
                                        }
                                        {
                                            opsiButton.includes("restore") ? (
                                                <button type="button" onClick={() => handleRestore(item.id) } class="py-2 px-3 ms-2 text-sm font-medium text-white focus:outline-none bg-blue-600 rounded-md hover:bg-blue-700 transition delay-200 duration-200 ease-in-out hover:text-black hover:border-black focus:z-10 focus:ring-4 focus: ring-red-100 dark:focus:ring-blue-700 dark:bg-blur-800 dark:text-blue-400 dark:border-blue-600 dark:hover:text-white
                                                dark:hover:bg-blue-700">Restore</button>
                                            ) : ''
                                        }
                                        {
                                            opsiButton.includes("permanentDeletes") ? (
                                                <button type="button" onClick={()=> handlePermanentDelete(item.id)} class="py-2 px-3 ms-2 text-sm font-medium text-white focus:outline-none bg-red-600 rounded-md hover:bg-red-700 transition delay-200 duration-200 ease-in-out hover:text-black hover:border-black focus:z-10 focus:ring-4 focus: ring-red-100 dark:focus:ring-red-700 dark:bg-red-800 dark:text-red-400 dark:border-red-600 dark:hover:text-white
                                                dark:hover:bg-red-700">permanentDeletes</button>
                                            ) : ''
                                        }
                            </td>
                            </tr>
                            </>
                        ))
                    }
                    </tbody> 
                </table>
            </div>
            <ModalAdd isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)} endpoint={endpointToSend} inputData={inputData} identitasColumn={identitasColumn} titleModal={titleModal} opsiButton={opsiButton} />
            <ModalEdit isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} endpoint={endpointToSend} inputData={inputData} identitasColumn={identitasColumn} titleModal={titleModal} opsiButton={opsiButton} />
            <ModalDelete isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} endpoint={endpointToSend} inputData={inputData} identitasColumn={identitasColumn} titleModal={titleModal} opsiButton={opsiButton} />
        </>
    );
}
