import { useState } from "react"
import Input from "./Input";
import Button from "../Button/Button";

const MultipleInput = () => {
    const [inputFields, setInputFields] = useState<string[]>([""]);

    const removeInputFields = (index: number)=>{
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
    }

    const handleChange = (index:number, event: React.ChangeEvent<HTMLInputElement>)=>{
        
        console.log(event.target.value)
        const value  = event.target.value;
        const list = [...inputFields];
        list[index] = value;
        setInputFields(list);
    }

    return (
        <div className="w-full py-4 px-4">
            {inputFields.map((data, index)=> (
                <div>
                    <Input 
                        type="text" 
                        label="" 
                        placeholder = "Add a tag"
                        // value = {data}
                        onChange={(e) => handleChange(index, e)}
                    />
                    {inputFields.length!==1 && (
                    <Button styles= "w-fit" onClick={() => removeInputFields(index)}>
                        Remove
                    </Button>
                    )}
                    <Button styles= "w-fit" onClick={() => setInputFields([...inputFields, ""])}>
                        Add
                    </Button>
                </div>
                
            ))}
            
        </div>
    )
}

export default MultipleInput;