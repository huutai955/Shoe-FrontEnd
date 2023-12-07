"use client"
import ShoeForm from "@/components/shoe/ShoeForm"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

type Props = {}
export default function Page({ }: Props) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ShoeForm />
        </LocalizationProvider>
    )
}