import React from 'react'
import type { Icon as IconType } from 'react-feather'
import Link from 'next/link'
import styles from 'styles/Socials.module.scss'

interface ColleagueCardIconProps {
    Icon: IconType
    href: string
}

const ColleagueCardIcon: React.FC<ColleagueCardIconProps> = ({
    Icon,
    href,
}) => {
    return (
        <Link href={href} passHref>
            <a
                // creates new tap
                target='_blank'
                rel='noreferrer'
                className={styles['icon-wrapper']}
            >
                <Icon />
            </a>
        </Link>
    )
}

export default ColleagueCardIcon
