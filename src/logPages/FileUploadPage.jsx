import React, { useEffect, useState } from 'react';
import validateJsonSchema from '../assets/jsonvalidator';
import { FileUpload, Box, Icon, Text, Flex } from "@chakra-ui/react"
import { LuUpload } from "react-icons/lu"
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FormLabel } from 'react-bootstrap';
import api from '../assets/axios'

const FileUploadPage = () => {
    const allowedExtensionRegex = /\.(json)$/i;
    const allowedMimeType = "application/json";
    const [uploadedFile, setFile] = useState(null);
    const [previewData, setPreviewData] = useState(null);
    const [validationError, setValidationError] = useState(null);
    
    const generateSafeFilename = () => {
    const guid = crypto.randomUUID();
    return `${guid}.json`;
    };

    const handleOnChange = async (e) => {        
        setPreviewData(null);
        setValidationError(null);
        try 
        {
            //check extension
            if (!allowedExtensionRegex.test(e.name)) {
                throw new Error("The file does not have the correct extension");
            }
            //mime-type validation
            if (e.type !== allowedMimeType) {
                throw new Error("The file MIME type is not allowed");
            }
            //files can be 500mb max
            if (e.size > 500 * 1024 * 1024) {
                throw new Error("The file size is too large");
            }
            //generate new filename
            const safeFilename = generateSafeFilename();
            const sanitizedFile = new File([e], safeFilename, {
                type: e.type
            });
            
            //use the jsonvalidator we import to check the content is what the site wants.
            const fileContent = await sanitizedFile.text();
            try {
                const parsed = JSON.parse(fileContent);
                validateJsonSchema(parsed);
            }
            catch (err)
            {
                setValidationError(err.message);
            }

            setFile(e);
            try
            {
                const fileContent = await sanitizedFile.text();
                const parsed = JSON.parse(fileContent);
                setPreviewData(parsed);
            }
            catch (err)
            {
                setValidationError(err.message);
            }
        }
        catch (err)
        {
            setValidationError(err.message);
        }

    }

    const parseUpload = async (e) => {
        e.preventDefault();
        
        try {
            if (!uploadedFile) throw new Error("No file selected");
            //check extension
            if (!allowedExtensionRegex.test(uploadedFile.name)) {
                throw new Error("The file does not have the correct extension");
            };
            //mime-type validation
            if (uploadedFile.type !== allowedMimeType) {
                throw new Error("The file MIME type is not allowed");
            };
            //files can be 500mb max
            if (uploadedFile.size > 500 * 1024 * 1024) {
                throw new Error("The file size is too large");
            };
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
            };

            const options = {
                method:'POST',
                url: 'https://localhost:7289/RaidLog',
                headers: {'Content-Type': 'application/json'},
                data: fileContent
            };

            try
            {
                const { data , status } = await api.post('/RaidLog', fileContent, {
                headers: { 'Content-Type': 'application/json' }
                });
                console.log(data);
                console.log(status);
            }
            catch (err)
            {
                console.error(err);
            };
        }
        catch (err)
        {
                throw new Error(err.message);
        }

    }


    return (
        <div className='page-wrapper'>
            <h1 className='page-title'>Upload Your Log</h1>
            <Flex gap={6}>
                <Box flex={1}>
                    <form className='' onSubmit={parseUpload}>
                        <FileUpload.Root 
                        accept={["application/json"]}
                        onFileChange={(details) => handleOnChange(details.acceptedFiles[0])}
                        width="100%">
                            <FileUpload.HiddenInput/>
                            <FileUpload.Dropzone className='dropzone'>
                                <Icon size="md" className='dropzone-icon'>
                                    <LuUpload />
                                </Icon>
                                <FileUpload.DropzoneContent>
                                    <Text className='dropzone-text'> Drag and drop log here.</Text>
                                    <Text className='dropzone-subtext'>.json up to 500mb max</Text>
                                </FileUpload.DropzoneContent>
                            </FileUpload.Dropzone>
                            <FileUpload.List className='file-list' />
                        </FileUpload.Root>
                        <button className='submit-btn'>Submit</button>
                    </form>
                </Box>
                <Box flex={1} className='preview-panel'>
                    {!previewData && !validationError && (
                        <Text className='text-muted'>No file selected yet.</Text>
                    )}

                    {validationError && (
                        <Box color="red.400">
                            <Text className='text-accent' fontWeight='bold'>Validation Failed</Text>
                            <Text className='text-error'>{validationError}</Text>
                        </Box>
                    )}

                    {previewData && (
                        <Box>
                            <Text className='text-accent' fontWeight='bold' fontSize='1.1rem'>File Preview</Text>
                            <Text><span className='text-muted'>Uploader: </span>{previewData.uploader}</Text>
                            <Text><span className='text-muted'>Player: </span>{previewData.player}</Text>
                            <Text><span className='text-muted'>Log Date: </span>{previewData.logDate}</Text>
                            <Text><span className='text-muted'>Pulls: </span>{previewData.pulls.length}</Text>
                            <Box mt={4}>
                                {previewData.pulls.map((pull, index) => (
                                    <Box key={index} className='pull-card'>
                                        <Text><span className='text-muted'>Boss: </span>{pull.bossName}</Text>
                                        <Text><span className='text-muted'>Damage: </span>{pull.damageDone}</Text>
                                        <Text><span className='text-muted'>Deaths: </span>{pull.deathCount}</Text>
                                        <Text><span className='text-muted'>Healing: </span>{pull.healingDone}</Text>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Flex>
        </div>
    );
};

export default FileUploadPage;