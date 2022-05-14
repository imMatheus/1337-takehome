import React from 'react'
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import axios from 'axios'
import { Colleague } from '@/types/Colleague'
import styles from '../styles/Colleague.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Socials from '@/components/Socials'
import { ArrowLeft } from 'react-feather'
import Link from 'next/link'

interface Props {
    colleague: Colleague | null
    colleagues: Colleague[]
}

const ColleaguePage: React.FC<Props> = ({ colleague, colleagues }) => {
    console.log(colleague)
    console.log(colleagues)
    const router = useRouter()

    if (!colleague) {
        router.push('/')
        return <></>
    }

    return (
        <div className='container'>
            <div className={styles.banner}>
                <Link href={'/'} passHref>
                    <a className={styles['go-back']}>
                        <ArrowLeft />
                    </a>
                </Link>
                <Image
                    // some of the colleagues did not have images, so we add a fallback taken from a colleague with an image
                    src={
                        colleague.imageWallOfLeetUrl ||
                        'https://i.1337co.de/wallofleet/karl-ecstrom'
                    }
                    alt={`${colleague.name} banner image`}
                    layout='fill'
                    objectFit='cover'
                    objectPosition='top'
                    priority
                />
            </div>
            <div className={styles.wrapper}>
                <div className={styles['profileImg-wrapper']}>
                    <div className={styles.profileImg}>
                        <Image
                            src={colleague.imagePortraitUrl}
                            alt={`${colleague.name} profile image`}
                            layout='fill'
                            objectFit='cover'
                            priority
                        />
                    </div>
                </div>
                <div className={styles.details}>
                    <h2>{colleague.name}</h2>
                    <p>{colleague.email}</p>
                    <Socials colleague={colleague} />
                </div>

                <div className={styles.testimony}>
                    <h2>
                        My thoughts on <span>1337</span>
                    </h2>
                    <span
                        className={styles['testimony-text']}
                        dangerouslySetInnerHTML={{ __html: colleague.mainText }}
                    ></span>
                </div>

                <h2>My colleagues</h2>
                <div className={styles.colleagues}>
                    {colleagues.map((colleague) => (
                        <Link
                            href={`/${colleague.email}`}
                            passHref
                            key={colleague.email}
                        >
                            <a className={styles.colleague}>{colleague.name}</a>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ColleaguePage

export async function getStaticPaths() {
    // if env variables are unset we should just return an empty array
    if (!process.env.url || !process.env.token) {
        console.error('Please set the url and token in .env')
        return {
            paths: [],
            fallback: false,
        }
    }

    const { data } = await axios.get<Colleague[]>(process.env.url, {
        headers: { Authorization: `${process.env.token}` },
    })

    const paths = data.map((post) => ({
        params: { email: post.email },
    }))

    return {
        paths,
        fallback: true, // false or 'blocking'
    }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    // if env variables are unset we should just return an empty array
    if (!process.env.url || !process.env.token) {
        console.error('Please set the url and token in .env')
        return {
            props: {
                colleague: null,
                colleagues: [],
            },
        }
    }

    const { data } = await axios.get<Colleague[]>(process.env.url, {
        headers: { Authorization: `${process.env.token}` },
    })

    const colleague = data.find(
        (colleague) => colleague.email === params?.email
    )

    return {
        props: {
            colleague: colleague || null,
            colleagues: data
                .filter((c) => c.email !== colleague?.email) // dont want to show the current colleague
                .slice(0, 7),
        },
    }
}
