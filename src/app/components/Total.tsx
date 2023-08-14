'use client';

import { FC, MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { Currency } from '../hooks/useConfig';
import { Transaction, useData } from '../hooks/useData';
import { usePay } from '../hooks/usePay';
import { usePopup } from '../hooks/usePopup';
import { useSummary } from '../hooks/useSummary';
import { WAITING_KEYWORD } from '../utils/constants';
import { requestFullscreen } from '../utils/fullscreen';
import { isMobileSize, useIsMobile } from '../utils/mobile';
import { Amount } from './Amount';
import { useAddPopupClass } from './Popup';

const payLabel = 'PAYER';
const totalLabel = 'TOTAL';

interface ItemProps {
    className?: string;
    label: string;
    onClick?: () => void;
    onContextMenu: () => void;
}

function handleContextMenu(
    question: string,
    action: (index: number) => void,
    index: number,
    openPopup: (title: string, options: string[], callback: (index: number, option: string) => void) => void
) {
    openPopup(question + ' ?', ['Oui', 'Non'], (i: number) => {
        if (i === 0) {
            action(index);
        }
    });
}

const Item: FC<ItemProps> = ({ label, onClick = () => {}, onContextMenu, className }) => {
    const handleContextMenu = useCallback<MouseEventHandler>(
        (e) => {
            e.preventDefault();
            onContextMenu();
        },
        [onContextMenu]
    );

    return (
        <div className={className} onClick={onClick} onContextMenu={handleContextMenu}>
            {label}
        </div>
    );
};

export const Total: FC = () => {
    const {
        total,
        getCurrentTotal,
        amount,
        products,
        selectedCategory,
        addProduct,
        deleteProduct,
        displayProduct,
        transactions,
        saveTransactions,
        editTransaction,
        toCurrency,
        toMercurial,
        quantity,
        displayTransaction,
        isWaitingTransaction,
    } = useData();
    const { showTransactionsSummary, showTransactionsSummaryMenu } = useSummary();
    const { openPopup, closePopup } = usePopup();
    const { pay, canAddProduct } = usePay();

    // Hack to avoid differences between the server and the client, generating hydration issues
    const [localTransactions, setLocalTransactions] = useState<Transaction[] | undefined>();
    useEffect(() => {
        setLocalTransactions(transactions);
    }, [transactions]);

    const label = useIsMobile() ? totalLabel : payLabel;

    const displayTransactionsTitle = useMemo(() => {
        if (!localTransactions?.length) return '';

        const totalTransactions = localTransactions.length;
        const currencies: { [key: string]: { amount: number; currency: Currency } } = {};
        localTransactions.forEach((transaction) => {
            if (currencies[transaction.currency.symbol]) {
                currencies[transaction.currency.symbol].amount += transaction.amount;
            } else {
                currencies[transaction.currency.symbol] = {
                    amount: transaction.amount,
                    currency: transaction.currency,
                };
            }
        });

        return `${totalTransactions} vente${totalTransactions > 1 ? 's' : ''} : ${Object.values(currencies)
            .map((currency) => {
                return `${toCurrency(currency.amount, currency.currency)}`;
            })
            .join(' + ')}`;
    }, [toCurrency, localTransactions]);

    const showProducts = useCallback(() => {
        if (!products.current?.length) return;

        openPopup(
            products.current.length + ' produits : ' + toCurrency(getCurrentTotal(), products.current[0].currency),
            products.current.map(displayProduct).concat(['', payLabel]),
            (_, option) => {
                if (option === payLabel) {
                    pay();
                }
            },
            true,
            {
                confirmTitle: 'Effacer ?',
                maxIndex: products.current.length,
                action: (i) => {
                    if (!products.current?.at(i)) {
                        pay();
                    } else {
                        deleteProduct(i);
                        if (products.current?.length) {
                            showProducts();
                        } else {
                            closePopup();
                        }
                    }
                },
            }
        );
    }, [getCurrentTotal, pay, products, openPopup, closePopup, displayProduct, deleteProduct, toCurrency]);

    const deleteBoughtProduct = useCallback(
        (
            productIndex: number,
            transactionIndex: number,
            transaction: Transaction,
            backToProducts: () => void,
            backToTransactions: () => void
        ) => {
            if (!localTransactions?.length) return;

            transaction.products.splice(productIndex, 1);
            transaction.amount = transaction.products.reduce(
                (total, product) => total + product.amount * product.quantity,
                0
            );
            if (!transaction.amount) {
                localTransactions.splice(transactionIndex, 1);
                if (localTransactions.length) {
                    backToTransactions();
                } else {
                    closePopup();
                }
            } else {
                backToProducts();
            }
            saveTransactions(localTransactions);
        },
        [localTransactions, saveTransactions, closePopup]
    );

    const showBoughtProducts = useCallback(
        (index: number, fallback?: () => void) => {
            const transaction = localTransactions?.at(index);
            if (!transaction || !transaction.amount || index < 0) return;

            openPopup(
                toCurrency(transaction.amount, transaction.currency) + ' en ' + transaction.method,
                transaction.products.map(displayProduct),
                fallback ? fallback : undefined,
                true,
                {
                    confirmTitle: 'Effacer ?',
                    action: (i) => {
                        deleteBoughtProduct(
                            i,
                            index,
                            transaction,
                            () => showBoughtProducts(index, fallback),
                            fallback ? fallback : closePopup
                        );
                    },
                }
            );
        },
        [localTransactions, openPopup, closePopup, displayProduct, toCurrency, deleteBoughtProduct]
    );

    const showTransactions = useCallback(() => {
        if (!localTransactions?.length) return;

        const waitingTransactions = localTransactions.filter(isWaitingTransaction);
        const confirmedTransactions = localTransactions.filter((t) => !isWaitingTransaction(t));
        const hasSeparation = waitingTransactions.length && confirmedTransactions.length;
        const getIndex = (i: number) => (i > waitingTransactions.length && waitingTransactions.length ? i - 1 : i);
        const summary = waitingTransactions
            .map(displayTransaction)
            .concat(hasSeparation ? [''] : [])
            .concat(confirmedTransactions.map(displayTransaction));
        openPopup(
            displayTransactionsTitle,
            summary,
            (i) => showBoughtProducts(getIndex(i), showTransactions),
            true,
            {
                confirmTitle: 'Modifier ?|Reprendre ?',
                action: (i) => {
                    editTransaction(getIndex(i));
                    closePopup();
                },
            },
            (option: string) => option.includes(WAITING_KEYWORD)
        );
    }, [
        openPopup,
        closePopup,
        localTransactions,
        editTransaction,
        displayTransaction,
        showBoughtProducts,
        displayTransactionsTitle,
        isWaitingTransaction,
    ]);

    const canDisplayTotal = useMemo(() => {
        return (total || amount || selectedCategory || !localTransactions?.length) as boolean;
    }, [total, amount, selectedCategory, localTransactions]);

    const handleClick = useCallback<MouseEventHandler>(
        (e) => {
            e.preventDefault();
            requestFullscreen();
            if (canDisplayTotal) {
                if (canAddProduct) {
                    addProduct(selectedCategory);
                }
                if (isMobileSize()) {
                    showProducts();
                } else {
                    pay();
                }
            } else if (localTransactions?.length) {
                if (isMobileSize()) {
                    showTransactions();
                } else {
                    if (e.type === 'click') {
                        showTransactionsSummary();
                    } else {
                        showTransactionsSummaryMenu(e);
                    }
                }
            }
        },
        [
            showProducts,
            showTransactions,
            canDisplayTotal,
            localTransactions,
            pay,
            addProduct,
            selectedCategory,
            showTransactionsSummary,
            showTransactionsSummaryMenu,
            canAddProduct,
        ]
    );

    const modifyProduct = useCallback(
        (index: number) => {
            handleContextMenu('Effacer', deleteProduct, index, openPopup);
        },
        [deleteProduct, openPopup]
    );

    const modifyTransaction = useCallback(
        (index: number) => {
            handleContextMenu(
                localTransactions?.at(index) && isWaitingTransaction(localTransactions[index])
                    ? 'Reprendre'
                    : 'Modifier',
                editTransaction,
                index,
                openPopup
            );
        },
        [editTransaction, openPopup, localTransactions, isWaitingTransaction]
    );

    const totalDisplayClassName =
        'text-5xl truncate text-center font-bold py-3 ' +
        (useIsMobile()
            ? 'md:hidden border-b-[3px] border-active-light dark:border-active-dark ' +
              ((canDisplayTotal && total) || (!canDisplayTotal && localTransactions?.length)
                  ? 'active:bg-active-light dark:active:bg-active-dark '
                  : '')
            : 'hidden border-b-[3px] border-active-light dark:border-active-dark md:block');

    return (
        <div
            className={useAddPopupClass(
                'inset-x-0 h-[75px] md:absolute md:left-1/2 md:h-full md:border-l-4 ' +
                    'md:border-secondary-active-light md:dark:border-secondary-active-dark'
            )}
        >
            <div className={totalDisplayClassName} onClick={handleClick} onContextMenu={handleClick}>
                {canDisplayTotal ? (
                    <div>
                        {label} <Amount value={total + amount * Math.max(toMercurial(quantity), 1)} showZero />
                    </div>
                ) : (
                    <span>
                        {'Ticket : ' + localTransactions?.length}
                        <span className="text-xl">{`vente${(localTransactions?.length ?? 0) > 1 ? 's' : ''}`}</span>
                    </span>
                )}
            </div>

            <div className="text-center text-2xl font-bold py-3 hidden md:block md:max-h-[90%] md:overflow-y-auto">
                {canDisplayTotal
                    ? products.current
                          ?.map(displayProduct)
                          .map((product, index) => (
                              <Item
                                  className="active:bg-active-light dark:active:bg-active-dark"
                                  key={index}
                                  label={product}
                                  onContextMenu={() => modifyProduct(index)}
                              />
                          ))
                    : localTransactions
                          ?.map(displayTransaction)
                          .map((transaction, index) => (
                              <Item
                                  className={
                                      'active:bg-active-light dark:active:bg-active-dark ' +
                                      (isWaitingTransaction(localTransactions[index])
                                          ? (localTransactions[index + 1] &&
                                            !isWaitingTransaction(localTransactions[index + 1])
                                                ? 'mb-3 pb-3 border-b-4 border-active-light dark:border-active-dark '
                                                : '') + 'animate-pulse'
                                          : '')
                                  }
                                  key={index}
                                  label={transaction}
                                  onClick={() => showBoughtProducts(index, () => modifyTransaction(index))}
                                  onContextMenu={() => modifyTransaction(index)}
                              />
                          ))
                          .concat(
                              <div
                                  key="total"
                                  className={
                                      'mt-3 pt-1 border-t-4 border-secondary-active-light dark:border-secondary-active-dark'
                                  }
                              >
                                  {displayTransactionsTitle}
                              </div>
                          )}
            </div>
        </div>
    );
};
