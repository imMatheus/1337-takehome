import type { NextPage, GetStaticProps, GetServerSideProps } from 'next'
import axios from 'axios'
import { Colleague } from '@/types/Colleague'
import ColleaguesGrid from '@/components/ColleaguesGrid'
import Toolbar from '@/components/Toolbar'

interface Props {
    colleagues: Colleague[]
}

const Home: NextPage<Props> = ({ colleagues }) => {
    return (
        <div className='p-4'>
            <div className='container'>
                <Toolbar />
                <ColleaguesGrid colleagues={colleagues} />
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async (
    context
) => {
    // if env variables are unset we should just return an empty array
    if (!process.env.url || !process.env.token) {
        console.error('Please set the url and token in .env')
        return {
            props: {
                colleagues: [],
            },
        }
    }

    const { sort, office } = context.query

    const { data } = await axios.get<Colleague[]>(process.env.url, {
        headers: { Authorization: `${process.env.token}` },
    })

    // filter by colleagues in the selected office
    const colleagues =
        office === 'all' || !office
            ? data
            : data.filter((colleague) => {
                  // filters all colleagues who work at the given office
                  if (office) {
                      return (
                          colleague.office ===
                          //@ts-ignore capitalize first letter
                          office.charAt(0).toUpperCase() + office.slice(1)
                      )
                  }
              })

    return {
        props: {
            // limit to only 7 colleagues and reverse sort if necessary
            colleagues:
                sort === 'desc'
                    ? // as the list of colleagues is already sorted by name we just need to reverse it
                      colleagues.reverse().slice(0, 8)
                    : colleagues.slice(0, 8),
        },
    }
}

export default Home
