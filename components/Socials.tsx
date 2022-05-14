import React from 'react'
import { Colleague } from '@/types/Colleague'
import styles from 'styles/Socials.module.scss'
import ColleagueSocialIcon from '@/components/ColleagueSocialIcon'
import { GitHub, Linkedin, Twitter, Layers } from 'react-feather'

interface SocialsProps {
    colleague: Colleague
}

const Socials: React.FC<SocialsProps> = ({ colleague }) => {
    return (
        <div className={styles.socials}>
            {colleague.gitHub && (
                <ColleagueSocialIcon
                    Icon={GitHub}
                    href={`https://github.com/${colleague.gitHub}`}
                />
            )}
            {colleague.linkedIn && (
                <ColleagueSocialIcon
                    Icon={Linkedin}
                    href={`https://www.linkedin.com${colleague.linkedIn}`}
                />
            )}
            {colleague.twitter && (
                <ColleagueSocialIcon
                    Icon={Twitter}
                    href={`https://twitter.com/${colleague.twitter}`}
                />
            )}
            {colleague.stackOverflow && (
                <ColleagueSocialIcon
                    Icon={Layers}
                    href={`https://stackoverflow.com/users/${colleague.twitter}`}
                />
            )}
        </div>
    )
}

export default Socials
