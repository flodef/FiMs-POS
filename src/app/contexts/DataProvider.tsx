'use client';

import { FC, ReactNode, useCallback, useRef, useState } from 'react';
import { DataContext, DataElement, Transaction } from '../hooks/useData';
import { CATEGORY_SEPARATOR, DEFAULT_DATE } from '../utils/env';
import { useLocalStorage } from '../utils/localStorage';

export interface DataProviderProps {
    children: ReactNode;
}

export function addElement<T>(array: [T] | undefined, element: T): [T] {
    if (!array?.length) {
        return [element];
    } else {
        array.unshift(element);
        return array;
    }
}

export const DataProvider: FC<DataProviderProps> = ({ children }) => {
    const [total, setTotal] = useState(0);
    const [amount, setAmount] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');
    const products = useRef<[DataElement]>();
    const [transactions, setTransactions] = useLocalStorage<[Transaction] | undefined>(
        'Transactions ' + DEFAULT_DATE,
        undefined
    );

    const updateTotal = useCallback(() => {
        setTotal(getCurrentTotal());
    }, []);

    const clearAmount = useCallback(() => {
        setAmount(0);
        setQuantity(0);
        setSelectedCategory('');
        updateTotal();
    }, [updateTotal]);

    const clearTotal = useCallback(() => {
        products.current = undefined;
        clearAmount();
    }, [clearAmount]);

    const addProduct = useCallback(
        (product: string | DataElement) => {
            let element: DataElement = { category: '', label: '', quantity: 0, amount: 0 };
            if (typeof product === 'object') {
                element = product;
            } else {
                const p = (product ?? selectedCategory).split(CATEGORY_SEPARATOR);
                element.category = p.at(0) ?? '';
                element.label = p.at(1) ?? '';
                element.quantity = Math.max(1, quantity);
                element.amount = amount;
            }

            if (!element.category || !element.amount || !element.quantity) return;

            const p = products.current?.find(
                ({ label, amount }) => label === element.label && amount === element.amount
            );
            if (p) {
                p.quantity += element.quantity;
            } else {
                products.current = addElement(products.current, element);
            }

            clearAmount();
        },
        [amount, quantity, clearAmount, products, selectedCategory]
    );

    const deleteProduct = useCallback(
        (index: number) => {
            if (!products.current?.length) return;

            products.current.splice(index, 1).at(0);

            clearAmount();
        },
        [products, clearAmount]
    );

    const saveTransactions = useCallback(
        (transactions: [Transaction]) => {
            setTransactions(undefined);
            if (transactions.length) {
                setTimeout(() => setTransactions(transactions)); // Set a time out to avoid a bug with the localStorage when the transactions are not updated
            }
        },
        [setTransactions]
    );

    const editTransaction = useCallback(
        (index: number) => {
            if (!transactions?.length) return;

            transactions.splice(index, 1).at(0)?.products.forEach(addProduct);
            saveTransactions(transactions);
        },
        [transactions, saveTransactions, addProduct]
    );

    const addPayment = useCallback(
        (method: string) => {
            if (!method || !products.current) return;

            const currentHour = new Date().getHours() + 'h' + ('0' + new Date().getMinutes()).slice(-2);
            let newTransactions = addElement(transactions, {
                method: method,
                amount: getCurrentTotal(),
                date: currentHour,
                products: products.current,
            });

            saveTransactions(newTransactions);

            clearTotal();
        },
        [clearTotal, products, saveTransactions, transactions]
    );

    function getCurrentTotal() {
        return products.current
            ? products.current.reduce((total, product) => total + product.amount * product.quantity, 0)
            : 0;
    }

    return (
        <DataContext.Provider
            value={{
                total,
                getCurrentTotal,
                amount,
                setAmount,
                quantity,
                setQuantity,
                selectedCategory,
                setSelectedCategory,
                addProduct,
                deleteProduct,
                clearAmount,
                clearTotal,
                products,
                addPayment,
                transactions,
                saveTransactions,
                editTransaction,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
