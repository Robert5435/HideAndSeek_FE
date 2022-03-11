import classes from "./Form.module.css"
import Card from "../ui/Card";
import {useEffect, useRef, useState} from 'react';


function Form(){

    
    const keyInputRef = useRef();
    var enteredAction = null;
    const actionInputRef= useRef();
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [action, setAction] = useState();
    const [dataText, setDataText] = useState();

    const changeHandler= (event) =>{
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true)
    };

    useEffect(()=>{
        fetch('https://localhost:44394/Cryptic').then(res=>{
            return res.text()
        }).then(data =>{
            setDataText(data)
        })
    },[]);

    const handleSubmissionFile = () => {
        debugger
        const enteredKey= keyInputRef.current.value;

		const formData = new FormData();

		formData.append('File', selectedFile);
        formData.append('key', enteredKey);
        formData.append('action', action);



        

		fetch(
			'https://localhost:44394/Cryptic/Upload',
			{
				method: 'POST',
				body: formData,

			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

    return(
        <div className={classes.item}>
        <Card>
        <form className={classes.form}>
            <div className={classes.control}>
            <input type="file"  name="file" onChange={changeHandler}/>
            {isFilePicked ?(
                    <div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
				</div>
                ) :(
                <p>Select a file to show details</p>
                )}
            </div>
            <div className={classes.control}>
                <label htmlFor="Key">Key</label>
                <textarea id='key' rows='4' ref={keyInputRef}></textarea>
            </div>
            <div className={classes.control}>
            <input type="radio"  name="encryption" value="encrypt"  onChange={e=>setAction(e.target.value)} />
            <label htmlFor="html">Encrypt</label><br/>
            <input type="radio"  name="encryption" value="decrypt"  onChange={e=>setAction(e.target.value)}/>
            <label htmlFor="css">Decrypt</label><br></br>
            <input type="checkbox" id="CRC" value="CRC"/>
            <label htmlFor="CRC"> CRC</label><br/>
            </div>
            <div className={classes.actions}>
                <button onClick={handleSubmissionFile}>Start</button>
            </div>

        </form>
        <div className={classes.control}>
        <label htmlFor="Result">Result</label>
        <p>{dataText}</p>
        </div>
    </Card>
    </div>
    )
}


export default Form;