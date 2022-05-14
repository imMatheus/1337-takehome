import React from 'react'
import { Colleague } from '@/types/Colleague'
import styles from 'styles/Socials.module.scss'
import ColleagueCardIcon from '@/components/ColleagueCardIcon'
import { GitHub, Linkedin, Twitter, Layers } from 'react-feather'

interface SocialsProps {
    colleague: Colleague
}

const Socials: React.FC<SocialsProps> = ({ colleague }) => {
    return (
        <div className={styles.socials}>
            {colleague.gitHub && (
                <ColleagueCardIcon
                    Icon={GitHub}
                    // href={`/hej`}
                    href={`https://github.com/${colleague.gitHub}`}
                />
            )}
            {colleague.linkedIn && (
                <ColleagueCardIcon
                    Icon={Linkedin}
                    href={`https://www.linkedin.com${colleague.linkedIn}`}
                />
            )}
            {colleague.twitter && (
                <ColleagueCardIcon
                    Icon={Twitter}
                    href={`https://twitter.com/${colleague.twitter}`}
                />
            )}
            {colleague.stackOverflow && (
                <ColleagueCardIcon
                    Icon={Layers}
                    href={`https://stackoverflow.com/users/${colleague.twitter}`}
                />
            )}
        </div>
    )
}

export default Socials
