import { FC, useCallback } from 'react';
import { useData } from '../hooks/useData';
import { usePopup } from '../hooks/usePopup';
import { otherKeyword } from '../page';
import { isFullscreen, requestFullscreen } from '../utils/fullscreen';
import { isMobileDevice } from '../utils/mobile';
import { addPopupClass } from './Popup';
import { Separator } from './Separator';

interface Categories {
    categories: string[];
}

interface CategoryInputButton {
    input: string;
    onInput: (input: string) => void;
}

const CategoryButton: FC<CategoryInputButton> = ({ input, onInput }) => {
    const { currentAmount } = useData();

    const onClick = useCallback(() => {
        if (!isFullscreen() && isMobileDevice()) {
            requestFullscreen();
        }
        if (currentAmount.current) {
            onInput(input);
        }
    }, [input]);

    let s = 'w-1/3 relative flex justify-center py-3 items-center font-semibold text-2xl ';
    s += currentAmount.current ? 'active:bg-orange-300' : 'text-gray-300';

    return (
        <div className={s} onClick={onClick}>
            {input}
        </div>
    );
};

export const Category: FC<Categories> = ({ categories: categories }) => {
    const { addProduct } = useData();
    const { openPopup } = usePopup();

    const onInput = useCallback((input: string) => {
        if (input !== otherKeyword) {
            addProduct(input);
        } else {
            openPopup('Catégorie', categories.slice(5), addProduct);
        }
    }, []);

    return (
        <div className={addPopupClass('absolute inset-x-0 bottom-0 divide-y divide-orange-300')}>
            <Separator />
            {categories.length > 0 && (
                <div className="flex justify-evenly divide-x divide-orange-300">
                    {categories.slice(0, 3).map((category) => (
                        <CategoryButton key={category} input={category} onInput={onInput} />
                    ))}
                </div>
            )}
            {categories.length > 3 && (
                <div className="flex justify-evenly divide-x divide-orange-300">
                    {categories.slice(3, 6).map((category) => (
                        <CategoryButton
                            key={category}
                            input={category === categories[5] && categories.length > 6 ? otherKeyword : category}
                            onInput={onInput}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
