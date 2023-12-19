'use client'
import { dir } from 'i18next'
import { Roboto } from 'next/font/google'
import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from '@/components/Header';
const roboto = Roboto({
    weight: ['400', '700', '300', '500'],
    subsets: ['latin'],
    display: 'swap',
})
import { Provider } from 'react-redux'
import { store } from '@/redux/store';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './index.scss'


export default function RootLayout({ children, params: {
    lng
} }: {
    children: React.ReactNode, params: {
        lng: string
    }
}) {
    const queryClient = new QueryClient()

    return (
        <html lang={lng} dir={dir(lng)}>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <body className={`${roboto.className} h-screen`}>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <Provider store={store}>
                        <Header lng={lng} />
                        {children}
                    </Provider>
                </QueryClientProvider>
            </body>
        </html>
    )
}