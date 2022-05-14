import type { NextPage, GetStaticProps } from 'next'
import axios from 'axios'
import { Colleague } from '@/types/Colleague'
import ColleaguesGrid from '@/components/ColleaguesGrid'

interface Props {
    colleagues: Colleague[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    // if env variables are unset we should just return an empty array
    if (!process.env.url || !process.env.token) {
        console.error('Please set the url and token in .env')
        return {
            props: {
                colleagues: [],
            },
        }
    }

    const { data } = await axios.get<Colleague[]>(process.env.url, {
        headers: { Authorization: `${process.env.token}` },
    })

    console.log(!!data)

    console.table(data.slice(0, 5))

    console.log(data?.length)
    if (data) {
        console.log(data[219])

        const al = data.find(
            (colleague) => colleague.email === 'amin.yosoh@1337.tech'
        )
        console.log(al)
    }

    return {
        props: {
            // limit to only 7 colleagues
            colleagues: data.slice(0, 9),
            // .slice(0, 25),
        },
    }
}

const Home: NextPage<Props> = ({ colleagues }) => {
    return (
        <div className='container'>
            <ColleaguesGrid colleagues={colleagues} />
        </div>
    )
}

export default Home
