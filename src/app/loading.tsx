// inspired by codepen.io/42EG4M1/pen/bVMzze/
export default function Loading(fullscreen = true) {
    // You can add any UI inside Loading, including a Skeleton.

    const phrase = 'CHARGEMENT'.split('');
    const rootClassName = 'inline-block my-0 mx-1 blur-0 ';
    const animateClassNames = [
        'animate-loading0',
        'animate-loading1',
        'animate-loading2',
        'animate-loading3',
        'animate-loading4',
        'animate-loading5',
        'animate-loading6',
        'animate-loading7',
        'animate-loading8',
        'animate-loading9',
    ];

    return (
        <div
            className={
                'text-center w-full h-full flex items-center justify-center font-semibold text-2xl ' +
                (fullscreen ? 'absolute top-0 bottom-0 left-0 right-0 m-auto' : '')
            }
            style={{ background: 'inherit' }}
        >
            {phrase.map((item, i) => (
                <span key={i} className={rootClassName + animateClassNames[i]}>
                    {item}
                </span>
            ))}
        </div>
    );
}
