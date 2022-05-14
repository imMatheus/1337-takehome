import React, { Fragment, useEffect, useState } from 'react'
import styles from 'styles/Toolbar.module.scss'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Image from 'next/image'
import List from '@/components/List'

interface ToolbarProps {}

const sortOptions = [
    { id: 1, name: 'Ascending', value: 'asc' },
    { id: 2, name: 'Descending', value: 'desc' },
]

const officesOptions = [
    { id: 1, name: 'All', value: 'all' },
    { id: 2, name: 'Lund', value: 'lund' },
    { id: 3, name: 'Stockholm', value: 'stockholm' },
    { id: 4, name: 'Helsingborg', value: 'helsingborg' },
    { id: 5, name: 'Borlänge', value: 'borlänge' },
    { id: 6, name: 'Ljubljana', value: 'ljubljana' },
    { id: 7, name: 'Öresund', value: 'öresund' },
]

const Toolbar: React.FC<ToolbarProps> = ({}) => {
    const router = useRouter()
    const [sort, setSort] = useState(
        router.query.sort === 'desc' ? sortOptions[1] : sortOptions[0]
    )
    const [office, setOffice] = useState(
        officesOptions.find((o) => o.value === router.query.office) ||
            officesOptions[0]
    )

    useEffect(() => {
        // could not pass query params as options to .push as it would not refetch the colleagues
        router.push(`/?sort=${sort.value}&office=${office.value}`)
    }, [sort, office])

    return (
        <div className='mb-4 p-3 flex md:items-center flex-wrap flex-col md:flex-row'>
            <div className='mr-auto'>
                <Image
                    src='/logo.svg'
                    alt='tretton37 logo'
                    height={50}
                    width={200}
                />
            </div>

            <div className='relative w-72 max-w-full z-30 mr-2'>
                <List
                    value={sort}
                    setValue={setSort}
                    options={sortOptions}
                    label='Sort name by:'
                />
            </div>
            <div className='relative w-72 max-w-full z-30'>
                <List
                    value={office}
                    setValue={setOffice}
                    options={officesOptions}
                    label='Filter by office:'
                />
            </div>
        </div>
    )
}

export default Toolbar
