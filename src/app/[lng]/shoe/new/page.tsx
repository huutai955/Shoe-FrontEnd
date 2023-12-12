"use client"
import ShoeForm from "@/components/shoe/ShoeForm"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

type Props = {
    params: {
        lng: string
    }
}
export default function Page({ params }: Props) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ShoeForm params={params} />
        </LocalizationProvider>
    )
}