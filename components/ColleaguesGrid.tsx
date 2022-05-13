import React from 'react'
import { Colleague } from '@/types/Colleague'
import ColleagueCard from '@/components/ColleagueCard'
import styles from 'styles/ColleaguesGrid.module.scss'

interface ColleaguesGridProps {
    colleagues: Colleague[]
}

const ColleaguesGrid: React.FC<ColleaguesGridProps> = ({ colleagues }) => {
    return (
        <div className={styles.grid}>
            {colleagues.map((colleague) => (
                <ColleagueCard colleague={colleague} key={colleague.email} />
            ))}
        </div>
    )
}

export default ColleaguesGrid
