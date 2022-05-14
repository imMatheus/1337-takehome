import React, { Fragment, useEffect, useState } from 'react'
import styles from 'styles/Toolbar.module.scss'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Image from 'next/image'

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

    const refreshData = () => {
        // router.reload()
    }

    useEffect(() => {
        router.push(`/?sort=${sort.value}&office=${office.value}`)
    }, [sort, office])

    return (
        <div className='mb-4 p-3 flex items-center flex-wrap flex-col md:flex-row'>
            <div className='mr-auto'>
                <Image
                    src='/logo.svg'
                    alt='tretton37 logo'
                    height={50}
                    width={200}
                />
            </div>

            <div className='relativ w-72 max-w-full z-30 mr-2'>
                <Listbox value={sort} onChange={setSort}>
                    <div className='relative mt-1'>
                        <span className='sr-only'>Sort by name</span>
                        <Listbox.Label className='text-sm'>
                            Sort name by:
                        </Listbox.Label>
                        <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                            <span className='block truncate'>{sort.name}</span>
                            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                <SelectorIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                {sortOptions.map((option, optionIndex) => (
                                    <Listbox.Option
                                        key={optionIndex}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                    ? 'bg-teal-100 text-teal-900'
                                                    : 'text-gray-900'
                                            }`
                                        }
                                        value={option}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected
                                                            ? 'font-medium'
                                                            : 'font-normal'
                                                    }`}
                                                >
                                                    {option.name}
                                                </span>
                                                {selected ? (
                                                    <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600'>
                                                        <CheckIcon
                                                            className='h-5 w-5'
                                                            aria-hidden='true'
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
            <div className='relative w-72 max-w-full z-10'>
                <Listbox value={office} onChange={setOffice}>
                    <div className='relative mt-1'>
                        <span className='sr-only'>Filter by office</span>
                        <Listbox.Label className='text-sm'>
                            Filter by office:
                        </Listbox.Label>
                        <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                            <span className='block truncate'>
                                {office.name}
                            </span>
                            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                <SelectorIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                {officesOptions.map((option, optionIndex) => (
                                    <Listbox.Option
                                        key={optionIndex}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                    ? 'bg-teal-100 text-teal-900'
                                                    : 'text-gray-900'
                                            }`
                                        }
                                        value={option}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected
                                                            ? 'font-medium'
                                                            : 'font-normal'
                                                    }`}
                                                >
                                                    {option.name}
                                                </span>
                                                {selected ? (
                                                    <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600'>
                                                        <CheckIcon
                                                            className='h-5 w-5'
                                                            aria-hidden='true'
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
        </div>
    )
}

export default Toolbar
