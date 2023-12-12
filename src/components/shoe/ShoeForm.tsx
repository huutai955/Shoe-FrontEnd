'use client'
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
import { FormValue, Image, SizeWithPrice, sizeSelectedValue } from './helper';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useTranslation } from '@/app/i18n/client';


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

type Props = {
    params: {
        lng: string
    }
}


export default function ShoeForm({ params }: Props) {
    const { t } = useTranslation(params.lng)
    const [imageList, setImageList] = useState<Image[]>([])
    const [sizes, setSizes] = React.useState<string[]>([]);
    const [sizeWithPriceList, setSizeWithPriceList] = useState<SizeWithPrice[]>([])
    const [formValue, setFormValue] = useState<FormValue>({
        productName: '',
        brand: 'Nike',
        description: '',
        imageList: [],
        releaseDate: null,
        sizeWithPrice: []
    })

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
    const handleChangeSelectMultiple = (event: SelectChangeEvent<typeof sizes>) => {
        const {
            target: { value, name },
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
            setFormValue({
                ...formValue,
                [name]: sizeWithPrice
            })
        }
    };

    const handleChangeSelect = (event: SelectChangeEvent) => {
        const { value, name } = event.target
        setFormValue({
            ...formValue,
            [name]: value as string
        });

    }
    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = event.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(formValue)
    }
    console.log(formValue)
    return (
        <div className='bg-image w-full'>
            <form className='max-w-[80rem] mx-auto flex flex-col h-screen custom-scroll gap-5 pr-10 bg-white py-10' onSubmit={handleSubmit}>
                <h2 className='text-red-400 text-center'>{t("shoe.new.createNewShoe")}</h2>
                <TextField required id="outlined-basic" name='productName' value={formValue.productName} label={t("shoe.new.form.productName")} variant="outlined" fullWidth onChange={handleChangeInput} />
                <div className='flex gap-2'>
                    <DatePicker
                        slotProps={{
                            textField: {
                                required: true,
                            },
                        }}
                        label={t("shoe.new.form.releaseDate")}
                        className='w-full'
                        value={formValue.releaseDate}
                        onChange={(newValue) => setFormValue({
                            ...formValue,
                            releaseDate: newValue
                        })}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{t("shoe.new.form.brand")}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formValue.brand}
                            label={t("shoe.new.form.brand")}
                            name="brand"
                            onChange={handleChangeSelect}
                        >
                            <MenuItem value={`Nike`}>Nike</MenuItem>
                            <MenuItem value={`Air Jordan`}>Air Jordan</MenuItem>
                            <MenuItem value={`Yeezy`}>Yeezy</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <BaseTextareaAutosize name='description' className='border border-solid border-gray-200 text-[1.188rem] py-3 px-2 min-h-[200px] ' required aria-label="minimum height" placeholder={t("shoe.new.form.descriptopn")} onChange={handleChangeInput} />
                <FormControl fullWidth>
                    <InputLabel id="demo-multiple-checkbox-label">{t("shoe.new.form.sizes")}</InputLabel>
                    <Select
                        name="sizeWithPrice"
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        className='customize'
                        value={sizes}
                        onChange={handleChangeSelectMultiple}
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
                    {formValue.sizeWithPrice.map((item: SizeWithPrice, index: number) => {
                        return <TextField type="number" key={item.size} className='w-[25%] pr-2 pb-2' name={item.size.toString()} value={formValue.sizeWithPrice[index].price} required id="outlined-basic" label={`${t("shoe.new.form.price")} (Size ${item.size})`} variant="outlined" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const { value, name } = e.target;
                            const response = formValue.sizeWithPrice.map((sizeItem: SizeWithPrice) => {
                                if (sizeItem.size.toString() === name) {
                                    return {
                                        ...sizeItem,
                                        price: Number(value)
                                    }
                                }
                                return sizeItem
                            })
                            setFormValue({
                                ...formValue,
                                sizeWithPrice: response
                            })
                        }} />
                    })}
                </div>
                <Button variant="contained" className='w-fit flex items-center justify-center gap-1 normal-case' onClick={() => {
                    const currentImageList = [...formValue.imageList];
                    currentImageList.push({
                        id: uuidv4(),
                        url: ''
                    })
                    setFormValue({
                        ...formValue,
                        imageList: currentImageList
                    })
                }}>{t("shoe.new.form.createImage")}<AddAPhotoOutlinedIcon /></Button>
                {formValue.imageList.map((item: Image, index: number) => {
                    return <div className='flex items-center gap-4' key={item.id}>
                        <TextField required id="outlined-basic" label={t("shoe.new.form.imageURL")} value={formValue.imageList[index].url} variant="outlined" fullWidth onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const { value } = e.target
                            setFormValue({
                                ...formValue,
                                imageList: formValue.imageList.map((imageItem: Image) => {
                                    if (imageItem.id === item.id) {
                                        return {
                                            ...imageItem,
                                            url: value
                                        }
                                    }
                                    return imageItem
                                })
                            })
                        }} />
                        <DeleteOutlineOutlinedIcon className='cursor-pointer' onClick={() => {
                            const currentImageList = formValue.imageList.filter((imageItem: Image) => {
                                return imageItem.id !== item.id
                            })
                            setFormValue({
                                ...formValue,
                                imageList: currentImageList
                            })
                        }} />
                    </div>
                })}

                <Button variant="contained" className='w-fit flex items-center justify-center gap-1 normal-case' type='submit'>{t("shoe.new.form.createProduct")}</Button>
            </form>
        </div>
    )
}