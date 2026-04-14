import React, { useEffect, useState } from 'react';
import validateJsonSchema from '../assets/jsonvalidator';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FormLabel } from 'react-bootstrap';

const FileUpload = () => {
    const allowedExtensionRegex = /\.(json)$/i;
    const allowedMimeType = "application/json";
    const [uploadedFile, setFile] = useState(null); 
    
    const generateSafeFilename = () => {
    const guid = crypto.randomUUID();
    return `${guid}.json`;
    };

    const handleOnChange = async (e) => {
        setFile(e.target.files[0]);
    }

    const parseUpload = async (e) => {
        e.preventDefault();
        
        try {
            //check extension
            if (!allowedExtensionRegex.test(uploadedFile.name)) {
                throw new Error("The file does not have the correct extension");
            }
            //mime-type validation
            if (uploadedFile.type !== allowedMimeType) {
                throw new Error("The file MIME type is not allowed");
            }
            //files can be 500mb max
            if (uploadedFile.size > 500 * 1024 * 1024) {
                throw new Error("The file size is too large");
            }
            //generate new filename
            const safeFilename = generateSafeFilename();
            const sanitizedFile = new File([uploadedFile], safeFilename, {
                type: uploadedFile.type
            });
            
            //use the jsonvalidator we import to check the content is what the site wants.
            const fileContent = await sanitizedFile.text();
            try {
                const parsed = JSON.parse(fileContent);
                validateJsonSchema(parsed);
            }
            catch (err)
            {
                throw new Error('File content validation failed: $(err.message)');
            }

            console.log(sanitizedFile);
            console.log(fileContent);
        }
        catch (err)
        {
                throw new Error(err.message);
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