import React, {useEffect, useState} from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function ModalDelete({isOpen, onClose, endpoint, identitasColumn}) {
  if (!isOpen) {
    return null;

  }

    const [dataDetail, setdataDetail] = useState({});

    useEffect(() => {
        axios.get(endpoint['data_detail'], {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setdataDetail(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401) {
                Navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        })
    }, []);

    function handleDelete() {
        axios.delete(endpoint['delete'], {
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
                Navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        })
        
    }

    return (
      <div id="popup-modal" tabindex="-1" class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button onClick={onClose} type="button"
                    class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="p-4 md:p-5 text-center">
                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete
                        <b>{dataDetail[identitasColumn]}</b>?</h3>
                    <button onClick={() => handleDelete()} type="button" class="text-white bg-red-600 hover:bg-red-800
                        focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg
                        text-sm inline-flex items-center px-5 py-2.5 text-center">
                        Yes, I'm sure
                    </button>
                    <button onClick={onClose} type="button"
                        class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No,
                        cancel</button>
                </div>
            </div>
        </div>
    </div>
    )
}