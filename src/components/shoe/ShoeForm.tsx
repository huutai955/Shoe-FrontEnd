import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import './index.scss'
import { v4 as uuidv4 } from 'uuid';
import { Image, SizeWithPrice, sizeSelectedValue } from './helper';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

type Props = {}


export default function ShoeForm({ }: Props) {
    const [imageList, setImageList] = useState<Image[]>([])
    const [sizes, setSizes] = React.useState<string[]>([]);
    const [sizeWithPriceList, setSizeWithPriceList] = useState<SizeWithPrice[]>([])

    const handleURLImage = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const { value } = event.target;
        const response = imageList.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    url: value
                }
            }
            return item
        })
        setImageList(response)
    }
    const handleChange = (event: SelectChangeEvent<typeof sizes>) => {
        const {
            target: { value },
        } = event;
        setSizes(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        if (Array.isArray(value)) {
            const sizeWithPrice = value.map((item: string) => {
                return {
                    size: Number(item),
                    price: 0
                }
            })
            setSizeWithPriceList(sizeWithPrice)
        }
    };


    useEffect(() => {
        console.log(sizes)
    }, [sizes])
    return (
        <div className='max-w-[80rem] mx-auto flex flex-col h-screen custom-scroll gap-5 pr-10'>

            <h2 className='text-red-400 text-center'>Create New Shoe</h2>
            <TextField required id="outlined-basic" label="Name Product" variant="outlined" fullWidth />
            <div className='flex gap-2'>
                <DatePicker
                    label="Controlled picker"
                    className='w-full'
                // value={value}
                // onChange={(newValue) => setValue(newValue)}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={10}
                        label="Brand"
                    // onChange={handleChange}
                    >
                        <MenuItem value={`10`}>Nike</MenuItem>
                        <MenuItem value={`20`}>Air Jordan</MenuItem>
                        <MenuItem value={`30`}>Yeezy</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <BaseTextareaAutosize className='border border-solid border-gray-200 text-[1.188rem] py-3 px-2 min-h-[200px] ' required aria-label="minimum height" placeholder="Enter Description" />
            <FormControl fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">Sizes</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    className='customize'
                    value={sizes}
                    onChange={handleChange}
                    input={<OutlinedInput label="Sizes" />}
                    renderValue={(selected: string[]) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {sizeSelectedValue.map((name: string) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={sizes.indexOf(name) > -1} />
                            <ListItemText primary={`size: ${name}`} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div className='flex flex-wrap w-full'>
                {sizes.map((item: string) => {
                    return <TextField key={item} className='w-[25%] pr-2 pb-2' required id="outlined-basic" label={`Price (Size ${item})`} variant="outlined" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleURLImage(e, item)
                    }} />
                })}
            </div>
            <Button variant="contained" className='w-fit flex items-center justify-center gap-1 normal-case' onClick={() => {
                const currentImageList = [...imageList];
                currentImageList.push({
                    id: uuidv4(),
                    url: ''
                })
                setImageList(currentImageList)
            }}>Create Image <AddAPhotoOutlinedIcon /></Button>
            {imageList.map((item: Image, index: number) => {
                return <div className='flex items-center gap-4' key={item.id}>
                    <TextField required id="outlined-basic" label="Image URL" variant="outlined" fullWidth onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleURLImage(e, item.id)
                    }} />
                    <DeleteOutlineOutlinedIcon className='cursor-pointer' onClick={() => {
                        const currentImageList = imageList.filter((imageItem: Image) => {
                            return imageItem.id !== item.id
                        })
                        setImageList(currentImageList)
                    }} />
                </div>
            })}
        </div>)
}