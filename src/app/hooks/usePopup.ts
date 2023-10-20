import { ReactNode, createContext, useContext } from 'react';

export interface PopupContextState {
    isPopupOpen: boolean;
    openPopup: (
        title: string,
        options: string[] | ReactNode[],
        action?: (index: number, option: string) => void,
        stayOpen?: boolean,
        specialAction?: { confirmTitle: string; action: (index: number) => void; maxIndex?: number },
        isSpecial?: (option: string) => boolean
    ) => void;
    openFullscreenPopup: (
        title: string,
        options: string[] | ReactNode[],
        action?: (index: number, option: string) => void,
        stayOpen?: boolean
    ) => void;
    closePopup: (callback?: () => void) => void;
    popupTitle: string;
    popupOptions: string[] | ReactNode[];
    popupAction?: (index: number, option: string) => void;
    popupStayOpen: boolean;
    popupSpecialAction?: { confirmTitle: string; action: (index: number) => void; maxIndex?: number };
    popupIsSpecial?: (option: string) => boolean;
    popupIsFullscreen: boolean;
}

export const PopupContext = createContext<PopupContextState>({} as PopupContextState);

export function usePopup(): PopupContextState {
    return useContext(PopupContext);
}
