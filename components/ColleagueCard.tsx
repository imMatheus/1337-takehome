import React from 'react'
import { Colleague } from '@/types/Colleague'
import styles from 'styles/ColleagueCard.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import Socials from '@/components/Socials'
import { MapPin } from 'react-feather'

interface ColleagueCardProps {
    colleague: Colleague
}

const ColleagueCard: React.FC<ColleagueCardProps> = ({ colleague }) => {
    return (
        <article className={styles.card}>
            <Link href={`/${colleague.email}`} passHref>
                <a>
                    <div className={styles.img}>
                        <Image
                            src={
                                colleague.imagePortraitUrl ||
                                'https://i.1337co.de/profile/alexander-danson'
                            }
                            layout='fill'
                            objectFit='cover'
                            alt={`${colleague.name} profile image`}
                        />
                    </div>
                </a>
            </Link>
            <div className={styles.details}>
                <div className={styles.text}>
                    <Link href={`/${colleague.email}`} passHref>
                        <a>
                            <h3 className={styles.name}>{colleague.name}</h3>
                        </a>
                    </Link>
                    <p className={styles.office}>
                        <MapPin /> {colleague.office}
                    </p>
                </div>
                <Socials colleague={colleague} />
            </div>
        </article>
    )
}

export default ColleagueCard
