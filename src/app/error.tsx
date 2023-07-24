'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Open_Sans } from 'next/font/google';
import Link from 'next/link';

const openSans = Open_Sans({ subsets: ['latin'], weight: ['400', '700'] });

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    const retry = () => setTimeout(reset, 1000); // Attempt to recover by trying to re-render the segment

    const zeroClassName =
        'relative before:rotate-45 before:scale-x-0 before:scale-y-75 before:animate-cross1$ ' +
        'after:-rotate-45 after:scale-x-0 after:scale-y-75 after:animate-cross2$ ' +
        'group-hover:before:animate-cross1Reverse group-hover:after:animate-cross2Reverse';
    const barClassName =
        " absolute block content-[''] w-[140%] h-[10vmin] " +
        'bg-secondary-active-light bg-gradient-to-t from-secondary-active-light to-secondary-light ' +
        'dark:bg-secondary-active-dark dark:bg-gradient-to-t dark:from-secondary-active-dark dark:to-secondary-dark ' +
        'left-[-20%] top-[45%] shadow-[0_1vmin_5vmin_rgba(0,0,0,0.5)]';
    const crossClassName =
        barClassName.replaceAll(' ', ' before:').trim() + ' ' + barClassName.replaceAll(' ', ' after:').trim();
    const zeroAClassName = zeroClassName.replaceAll('$', 'a') + ' ' + crossClassName;
    const zeroBClassName = zeroClassName.replaceAll('$', 'b') + ' ' + crossClassName;

    return (
        <div className={openSans.className}>
            <div
                className={
                    'w-screen h-screen overflow-hidden flex flex-col items-center justify-center font-bold ' +
                    'bg-gradient-to-tr from-low-light to-high-light dark:from-low-dark dark:to-high-dark ' +
                    'uppercase text-[3vmin] text-center text-secondary-light dark:text-secondary-dark'
                }
            >
                <p className="px-6 z-10">
                    Oups ! L'appli s'est emmelée les pinceaux ... <br />
                    Merci de me le signaler à{' '}
                    <Link target="_blank" href={`mailto:flo@fims.fi?subject=Erreur innatendue sur ${window.location}`}>
                        flo@fims.fi
                    </Link>
                </p>
                <div className="group z-0">
                    <h1
                        className={
                            'text-white text-[50vmin] text-center relative mb-[5vmin] mt-[-10vmin] cursor-pointer group-hover:scale-110 ' +
                            "group-hover:before:animate-flipReverse before:content-['('] before:absolute before:-rotate-90 " +
                            'before:right-[25vmin] before:bottom-[-30vmin] before:block before:text-[115%] before:animate-flip '
                        }
                        style={{ textShadow: '0 1vmin 5vmin rgba(0, 0, 0, 0.5)', transition: 'transform 300ms' }}
                        onClick={retry}
                    >
                        <span className="five">5</span>
                        <span className={zeroAClassName}>0</span>
                        <span className={zeroBClassName}>0</span>
                    </h1>
                    <p className="px-6 cursor-pointer" onClick={retry}>
                        Recharger la page
                    </p>
                </div>
            </div>
        </div>
    );
}
