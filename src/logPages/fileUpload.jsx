import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FormLabel } from 'react-bootstrap';

const FileUpload = () => {
    const allowedExtensionRegex = /\.(json)$/i;
    const [uploadedFile, setFile] = useState(null);  

    const handleOnChange = async (e) => {
        setFile(e.target.files[0]);
    }

    const parseUpload = async (e) => {
        e.preventDefault();

        try {
            if (!allowedExtensionRegex.test(uploadedFile.name)) {
                throw new Error("The file does not have the correct extension")
            }
            
        }
        catch
        {

        }

    }

    return (
        <div className=''>
            <h1 className=''>Upload Your Log</h1>
            <form className='' onSubmit={parseUpload}>
                    <label>
                        File Input:
                    </label> <br/>
                    <input type="file"
                        accept=".json"
                        name="file"
                        onChange={handleOnChange}>
                    </input> <br/>
                <button>Submit</button>
            </form>
        </div>
    );
};

export default FileUpload;