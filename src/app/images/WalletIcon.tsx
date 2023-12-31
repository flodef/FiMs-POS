import React, { FC, SVGProps } from 'react';

export const WalletIcon: FC<SVGProps<SVGSVGElement>> = ({ width = 56, height = 56 }) => {
    return (
        <svg width={width} height={width} fill="none" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M688 512a112 112 0 1 0 0 224h208v160H128V352h768v160H688zm32 160h-32a48 48 0 0 1 0-96h32a48 48 0 0 1 0 96zm-80-544 128 160H384l256-160z"
                fill="currentColor"
            />
        </svg>
    );
};
